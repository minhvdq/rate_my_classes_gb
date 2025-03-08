
import "./Home.css"

const Logo = () => {
    return(
        <div onClick={() => window.location.href = '/'} className="btn logo">
            <div className="logoText">
                <h1 className="gc">Gettysburg College</h1>
            </div>
            <div className="logoText">
                <h2 className="rmc">Rate My Classes</h2>
            </div>
        </div>
    )
}

export default Logo
