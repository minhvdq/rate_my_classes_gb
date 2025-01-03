import Logo from "./Logo"
import "./Home.css"

const Header = () => {
    return (
        <div className='header'>
            <Logo />
            <div className='authBtn'>
                <button className='btn btn-light'><b>Sign in</b></button>
                <button className= 'btn btn-dark'><b>Sign up</b></button>
            </div>
        </div>
    )
}

export default Header