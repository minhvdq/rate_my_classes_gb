import {useState} from 'react'
import userService from '../services/user'


const SignupPage = ({togglePage}) => {
    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repPassword, setRepPassword] = useState('')

    const cusThrowError = async (eMsg) => {
        setError(eMsg)
        setTimeout(() => {setError('')}, 2000)
    }
    const handleSignup = async () => {
        if( password !== repPassword ){
            cusThrowError("Confirming password unmatches!")
            return
        }  
        const submitUser = {
            name, email, password
        }
        try{
            const message = await userService.signup(submitUser).message

            // window.prompt(message)
            console.log(message)

            setName('')
            setEmail('')
            setPassword('')
            setRepPassword('')
            togglePage()
        }catch(e) {
            console.log(e)
            cusThrowError("something wrong")
        }
    }

    return (
        <div className='col-md-6 right-box'>
          <div className='row align-items-center'>
            <div className='header-text mb-4 mt-4'>
              <p className='h3 mb-0'style={{fontFamily: "Courier New, Courier, monospace", fontWeight: "600", textAlign: "center"}}>Welcome new user!</p></div>
              <div className="d-flex flex-row-reverse">
              <button type="button" onClick={togglePage} className="btn btn-link" style={{padding: "0"}}>Signin</button><div className="p-1" >Already had an account?</div>
              </div>
            <form onSubmit={handleSignup}>
              <div className="row justify-content-center">
                <label htmlFor="nameInput" className="form-label">Full Name</label>
                <div className='input-group mb-1'>
                  <input type="text" className="form-control form-control-lg bg-light fs-6" id="nameInput" placeholder="First-Name Last-Name" value={name} onChange={(e) => {e.preventDefault(); setName(e.target.value)}} required />
                </div>
              </div>
              <div className="row justify-content-center">
                <label htmlFor="emailInput" className="form-label">Email address</label>
                <div className='input-group mb-1'>
                  <input type="email" className="form-control form-control-lg bg-light fs-6" id="emailInput" placeholder="name@example.com" value={email} onChange={(e) => {e.preventDefault(); setEmail(e.target.value)}} required />
                </div>
              </div>
              <div className="row justify-content-center">
                <label htmlFor="inputPassword" className="col-form-label">Password</label>
                <div className='input-group mb-1'>
                  <input type="password" id="inputPassword" className="form-control form-control-lg bg-light fs-6" aria-describedby="passwordHelpInline" placeholder='Your Password' value={password} onChange={(e) => {e.preventDefault(); setPassword(e.target.value)}} required />
                </div>
              </div>
              <div className="row justify-content-center">
                <label htmlFor="inputPassword" className="col-form-label">Confirm Password</label>
                <div className='input-group mb-1'>
                  <input type="password" id="inputConfirmPassword" className="form-control form-control-lg bg-light fs-6" aria-describedby="passwordHelpInline" placeholder='Confirm Your Password' value={repPassword} onChange={(e) => {e.preventDefault(); setRepPassword(e.target.value)}} required />
                </div>
              </div>
              <div className='input-group mb-0 mt-2'>
                <button type='submit' className="btn btn-primary w-100 fs-6"> Signup </button>
                <div className="d-flex flex-row-reverse mb-3">
                  <div className='p-1 mb-3'>
                      {error}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
    )
}

export default SignupPage