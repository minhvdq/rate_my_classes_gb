import Logo from "../Logo";
import SearchBar from "../SearchBar";
import "./ReviewHeader.css";

export default function ReviewHeader({ classes, curUser, setCurUser }) {
  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.clear();
    setCurUser(null);
  };

  const LoginCombo = () => (
    <div className="authBtn">
      <button
        onClick={(e) => {
          e.preventDefault();
          window.localStorage.setItem("loginDirect", window.location.href);
          window.location.href = "/authen";
        }}
        className="btn btn-light"
      >
        <b>Sign in</b>
      </button>
    </div>
  );

  const LogoutCombo = () => (
    <div className="authBtn">
      <button onClick={handleLogout} className="btn btn-danger">
        <b>Sign out</b>
      </button>
    </div>
  );

  return (
    <header className="review-header">
      <div className="review-header-inner">
        <div className="header-left">
          <Logo />
        </div>

        {/* Centered search for review pages */}
        <div className="header-center">
          <SearchBar classes={classes} width="min(800px, 70vw)" />
        </div>

        <div className="header-right">
          {curUser ? <LogoutCombo /> : <LoginCombo />}
        </div>
      </div>
    </header>
  );
}
