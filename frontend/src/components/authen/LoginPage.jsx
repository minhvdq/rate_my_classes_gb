import { useState } from 'react'
import loginService from '../../services/login'
import customStorage from '../../services/customStorage'

export default function LoginPage({ togglePage, setCurUser }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      const logUser = await loginService.login({ email: email, password })
      setCurUser(logUser);
      customStorage.setItem('localUser', JSON.stringify(logUser));
      console.log(logUser)
      setEmail('');
      setPassword('');
      window.location.href = "..";
    } catch (e) {
      setError('Wrong username or password')
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
            Welcome Back
          </h2>
          <p className='text-center text-muted'>Sign in to continue your journey</p>
        </div>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
            <button type="button" className="btn-close" onClick={() => setError(null)}></button>
          </div>
        )}

        <form onSubmit={handleLogin} className="login-form">
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
            <div className="d-flex justify-content-between align-items-center">
              <label htmlFor="passwordInput" className="form-label fw-bold">Password</label>
              <button 
                type="button" 
                onClick={(e) => {
                  e.preventDefault(); 
                  window.location.href = "http://localhost:3000/PasswordResetRequest/ui_assets/request.html"
                }} 
                className="btn btn-link p-0 text-decoration-none" 
                style={{fontSize: "0.9rem", color: "#6c63ff"}}
              >
                Forgot password?
              </button>
            </div>
            <div className='input-group'>
              <span className="input-group-text bg-light">
                <i className="bi bi-lock"></i>
              </span>
              <input 
                type="password" 
                id="passwordInput" 
                className="form-control form-control-lg bg-light border-start-0" 
                placeholder="Enter your password" 
                value={password} 
                onChange={handlePassword} 
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
                  Signing In...
                </span>
              ) : "Sign In"}
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="mb-0">
              Don't have an account? 
              <button 
                type="button" 
                onClick={togglePage} 
                className="btn btn-link text-decoration-none fw-bold" 
                style={{color: "#6c63ff"}}
              >
                Sign Up
              </button>
            </p>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-muted small">
            By signing in, you agree to our <a href="#" className="text-decoration-none">Terms of Service</a> and <a href="#" className="text-decoration-none">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}