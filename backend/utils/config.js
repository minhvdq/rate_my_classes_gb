require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT
const SECRET = process.env.SECRET
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY

module.exports = { MONGODB_URI, PORT, SECRET, EMAIL_PASSWORD, ADMIN_SECRET_KEY }