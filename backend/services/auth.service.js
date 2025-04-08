const User = require("../models/User");
const Token = require("../models/Token");
const NewUserToken= require("../models/NewUserToken")
const mailService = require("../utils/email/sendEmail")
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const {backendBase} = require('../utils/homeUrl')

const JWTSecret = process.env.JWT_SECRET;
const bcryptSalt = process. env.BCRYPT_SALT;
const clientURL = `${backendBase}/PasswordReset/ui_assets/index.html`;
const newUserURL = `${backendBase}/api/newUser/`

const requestNewUser = async ({name, email, hashPassword}) => {
    let token = await NewUserToken.findOne({ email })
    if( token ) await token.deleteOne()
    
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hashToken = await bcrypt.hash(resetToken, Number(bcryptSalt));

    const savedToken = await new NewUserToken({
        name: name,
        email: email,
        hashPassword: hashPassword,
        token: hashToken,
        createdAt: Date.now(),
    }).save();

    const link = `${newUserURL}${savedToken._id}`;

    mailService.sendEmail(
        email,
        "Verify New User",
        {
          name: name,
          link: link,
        },
        "./templates/requestNewUser.handlebars"
      );
      return { link };

}

const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Email does not exist");

  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();

  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `${clientURL}?token=${resetToken}&id=${user._id}`;

  mailService.sendEmail(
    user.email,
    "Password Reset Request",
    {
      name: user.name,
      link: link,
    },
    "./templates/requestResetPassword.handlebars"
  );
  return { link };
};

const resetPassword = async (userId, token, password) => {
  let passwordResetToken = await Token.findOne({ userId });

  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }

  console.log(passwordResetToken.token, token);

  const isValid = await bcrypt.compare(token, passwordResetToken.token);

  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }

  const hash = await bcrypt.hash(password, Number(bcryptSalt));

  await User.updateOne(
    { _id: userId },
    { $set: { passwordHash: hash } },
    { new: true }
  );

  const user = await User.findById({ _id: userId });

  mailService.sendEmail(
    user.email,
    "Password Reset Successfully",
    {
      name: user.name,
    },
    "./templates/resetPassword.handlebars"
  );

  await passwordResetToken.deleteOne();

  return { message: "Password reset was successful" };
};

module.exports = {
  requestPasswordReset,
  resetPassword,
  requestNewUser
};