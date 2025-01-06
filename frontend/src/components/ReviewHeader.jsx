import Logo from './Logo'
import SearchBar from './SearchBar'
import './Home.css'

export default function ReviewHeader({classes, curUser, setCurUser}) {
    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.clear()
        setCurUser(null)
    }

    const LoginCombo = () => {
        return (
            <div className='authBtn'>
                <button onClick={(e) =>{ e.preventDefault(); window.location.href='/authen'} } className='btn btn-light'><b>Sign in</b></button>
                {/* <button className= 'btn btn-dark'><b>Sign up</b></button> */}
            </div>
        )
    }

    const LogoutCombo = () => {
        return( 
            <div className="authBtn">
                <button onClick={handleLogout} className='btn btn-danger'><b>Sign out</b></button>
            </div>
        )
    }
    return (
        <div className='header'>
            <Logo />
            <SearchBar classes={classes} top="6vh" marginLeft="28vw" width="50vw" />
            {curUser ? <LogoutCombo /> : <LoginCombo /> }
        </div>
    )
}