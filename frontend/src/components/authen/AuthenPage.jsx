import {useState} from 'react'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import {frontendBase} from '../../utils/homeUrl'

export default function AuthenPage({curUser, setCurUser}) {
    const [inLogin, setInLogin] = useState(true)

    if(curUser) {
        console.log("Logged! Redirecting...")
        window.location.href = frontendBase;
        return
    }

    const togglePage = (e) => {
        e.preventDefault()
        setInLogin(!inLogin)
    }


    return(
        <div className='container d-flex justify-content-center align-items-center min-vh-100 min-vw-100' >

            <div className='row border rounded-5 p-3 bg-white shadow box-area'>
                <div className='col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box' style={{background: "#1167b1"}}>
                <div className='featured-image mb-3'>
                    <img src='../../assets/project-management.png' className='img-fluid' style={{width: "250px"}} />
                </div>
                <p className='text-white fs-2' style={{fontFamily: "Courier New, Courier, monospace", fontWeight: "600"}}> Be verified! </p>
                <small className='text-white text-wrap text-center mb-3' style={{width: '17rem', fontFamily: "Courier New, Courier, monospace" }}>Join our better version of Google Calendar</small>
                </div>
                { inLogin ? <LoginPage togglePage={togglePage} setCurUser={setCurUser}/> : <SignupPage togglePage={togglePage} />}
            </div>
        </div>
    )
}