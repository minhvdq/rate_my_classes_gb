import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import Header from "./Header";
import SearchBar from "./SearchBar";

export default function Home({ classes, curUser, setCurUser }) {
  return (
    <div className="mainPage">
      {/* Background overlay for readability */}
      <div className="bg-overlay" />

      <Header curUser={curUser} setCurUser={setCurUser} />
      <main className="hero d-flex flex-column align-items-center justify-content-center text-center">
        <div className="brand-badge mb-3">
          <span className="gc">Gettysburg</span>{" "}
          <span className="rmc">Rate My Classes</span>
        </div>

        <h1 className="hero-title mb-2">Find your next class at Gettysburg</h1>
        <p className="hero-subtitle mb-4">
          Search by course code or name (e.g., <em>CS 216</em>, <em>Econometrics</em>)
        </p>

        <form className="w-100 d-flex justify-content-center" role="search" aria-label="Class search">
          <SearchBar classes={classes} width="min(900px, 90vw)" />
        </form>

        {/* Quick tags (optional, easily removable) */}
        <div className="quick-tags mt-3">
          <button className="btn btn-sm btn-outline-light rounded-pill me-2">CS 216</button>
          <button className="btn btn-sm btn-outline-light rounded-pill me-2">MATH 212</button>
          <button className="btn btn-sm btn-outline-light rounded-pill">ECON 352</button>
        </div>
      </main>
    </div>
  );
}
