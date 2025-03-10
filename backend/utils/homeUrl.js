
const backendBase = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''
const frontendBase = process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : ''

module.exports = {backendBase, frontendBase}