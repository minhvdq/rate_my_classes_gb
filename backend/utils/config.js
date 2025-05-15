require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT
const SECRET = process.env.SECRET
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY
const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_HOST = process.env.EMAIL_HOST

module.exports = { MONGODB_URI, PORT, SECRET, EMAIL_PASSWORD, ADMIN_SECRET_KEY, EMAIL_USER, EMAIL_HOST }