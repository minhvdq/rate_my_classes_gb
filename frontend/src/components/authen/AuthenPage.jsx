import {useState} from 'react'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import {frontendBase} from '../../utils/homeUrl'
import { Navigate } from 'react-router-dom'


export default function AuthenPage({curUser, setCurUser}) {
    const [inLogin, setInLogin] = useState(true)

    const togglePage = (e) => {
        e.preventDefault()
        setInLogin(!inLogin)
    }

    if (curUser) {
        return <Navigate to={frontendBase} replace />;
    }

    console.log("inside authen page")
    return(
        <div className='container d-flex justify-content-center align-items-center min-vh-100 min-vw-100' >

            <div className='row border rounded-5 p-3 bg-white shadow box-area'>
                <div className='col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box' style={{background: "#1167b1"}}>
                <div className='featured-image mb-3'>
                    <img src='/rmcillustration.svg' className='img-fluid' style={{width: "100%"}} />
                </div>
                <p className='text-white fs-2' style={{fontFamily: "Courier New, Courier, monospace", fontWeight: "600"}}> Be verified! </p>
                <small className='text-white text-wrap text-center mb-3' style={{width: '17rem', fontFamily: "Courier New, Courier, monospace" }}> Find, rate, and discover the best courses for your academic journey</small>
                </div>
                { inLogin ? <LoginPage togglePage={togglePage} setCurUser={setCurUser}/> : <SignupPage togglePage={togglePage} />}
            </div>
        </div>
    )
}