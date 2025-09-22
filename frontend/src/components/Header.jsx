import Logo from "./Logo";
import "./Home.css";

const Header = ({ curUser, setCurUser }) => {
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
    <header className="site-header">
      <div className="header-inner">
        <div className="header-left">
          <Logo />
        </div>
        <div className="header-right">
          {curUser ? <LogoutCombo /> : <LoginCombo />}
        </div>
      </div>
    </header>
  );
};

export default Header;
