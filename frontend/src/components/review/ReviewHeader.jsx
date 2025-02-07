import Logo from '../Logo'
import SearchBar from '../SearchBar'
// import '../Home.css'

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
        <div className="container">
            <div className="row d-flex justify-content-between align-items-center">
                <div className="col-auto">
                    <Logo />
                </div>
                <div className="col-auto">
                    {curUser ? <LogoutCombo /> : <LoginCombo />}
                </div>
            </div>
            <div className="row text-center" style={{justifyContent: "center"}}>
                    <SearchBar classes={classes} top="17vh" width="clamp(4rem, 45vw, 100rem)" />                
            </div>
        </div>
    )
}