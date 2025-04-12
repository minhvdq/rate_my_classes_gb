import { useState } from 'react'
import userService from '../../services/user'
import { frontendBase } from '../../utils/homeUrl'

export default function SignupPage({ togglePage }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repPassword, setRepPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleName = (event) => {
    setName(event.target.value)
  }

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleRepPassword = (event) => {
    setRepPassword(event.target.value)
  }

  const handleSignup = async (event) => {
    event.preventDefault()
    setLoading(true)

    if (password !== repPassword) {
      setError("Passwords don't match!")
      setTimeout(() => {
        setError(null)
      }, 5000)
      setLoading(false)
      return
    }

    const submitUser = {
      name,
      email,
      password
    }

    try {
      await userService.signup(submitUser)
      
      window.alert("Verification email sent")
      
      setName('')
      setEmail('')
      setPassword('')
      setRepPassword('')
      togglePage()
      window.location.href = `${frontendBase}/authen`
    } catch (e) {
      setError('Email already exists!')
      setTimeout(() => {
        setError(null)
      }, 5000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='col-md-6 right-box shadow'>
      <div className='row align-items-center px-4 py-5'>
        <div className='header-text mb-4'>
          <h2 className='text-center mb-1' style={{ fontFamily: "Poppins, sans-serif", fontWeight: "700", color: "#333" }}>
            Create Account
          </h2>
          <p className='text-center text-muted'>Join us and start your journey</p>
        </div>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
            <button type="button" className="btn-close" onClick={() => setError(null)}></button>
          </div>
        )}

        <form onSubmit={handleSignup} className="signup-form">
          <div className="form-group mb-4">
            <label htmlFor="nameInput" className="form-label fw-bold">Full Name</label>
            <div className='input-group'>
              <span className="input-group-text bg-light">
                <i className="bi bi-person"></i>
              </span>
              <input 
                type="text" 
                className="form-control form-control-lg bg-light border-start-0" 
                id="nameInput" 
                placeholder="First-Name Last-Name" 
                value={name} 
                onChange={handleName} 
                required 
              />
            </div>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="emailInput" className="form-label fw-bold">Email Address</label>
            <div className='input-group'>
              <span className="input-group-text bg-light">
                <i className="bi bi-envelope"></i>
              </span>
              <input 
                type="email" 
                className="form-control form-control-lg bg-light border-start-0" 
                id="emailInput" 
                placeholder="name@example.com" 
                value={email} 
                onChange={handleEmail} 
                required 
              />
            </div>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="passwordInput" className="form-label fw-bold">Password</label>
            <div className='input-group'>
              <span className="input-group-text bg-light">
                <i className="bi bi-lock"></i>
              </span>
              <input 
                type="password" 
                id="passwordInput" 
                className="form-control form-control-lg bg-light border-start-0" 
                placeholder="Create a password" 
                value={password} 
                onChange={handlePassword} 
                required 
              />
            </div>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="confirmPasswordInput" className="form-label fw-bold">Confirm Password</label>
            <div className='input-group'>
              <span className="input-group-text bg-light">
                <i className="bi bi-lock-fill"></i>
              </span>
              <input 
                type="password" 
                id="confirmPasswordInput" 
                className="form-control form-control-lg bg-light border-start-0" 
                placeholder="Confirm your password" 
                value={repPassword} 
                onChange={handleRepPassword} 
                required 
              />
            </div>
          </div>

          <div className="form-group mt-5">
            <button 
              type='submit' 
              className="btn btn-primary w-100 py-3 fw-bold" 
              style={{backgroundColor: "#6c63ff", borderColor: "#6c63ff", borderRadius: "8px"}}
              disabled={loading}
            >
              {loading ? (
                <span>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Creating Account...
                </span>
              ) : "Sign Up"}
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="mb-0">
              Already have an account? 
              <button 
                type="button" 
                onClick={togglePage} 
                className="btn btn-link text-decoration-none fw-bold" 
                style={{color: "#6c63ff"}}
              >
                Sign In
              </button>
            </p>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-muted small">
            By signing up, you agree to our <a href="#" className="text-decoration-none">Terms of Service</a> and <a href="#" className="text-decoration-none">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}