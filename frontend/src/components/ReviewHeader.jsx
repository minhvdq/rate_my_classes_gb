import Logo from './Logo'
import SearchBar from './SearchBar'
import './Home.css'

export default function ReviewHeader({classes}) {
    return(
        <div style={{display:'grid',placeItems: "center"}}>
            <Logo />
            <SearchBar classes={classes} top="6vh" marginLeft="" width="50vw" />
            <div className='authBtn'>
                <button className='btn btn-light'><b>Sign in</b></button>
                <button className= 'btn btn-dark'><b>Sign up</b></button>
            </div>
        </div>
    )
}