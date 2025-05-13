
const backendBase = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://rate-my-classes-gb.fly.dev'
const frontendBase = process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : 'https://rate-my-classes-gb.fly.dev'

module.exports = {backendBase, frontendBase}