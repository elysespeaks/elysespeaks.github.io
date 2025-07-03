import { NavLink } from "react-router-dom";
import "../styles/site.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/"         className="nav-btn nav-home"     aria-label="Home">Home</NavLink>
      <NavLink to="/teaching" className="nav-btn nav-teaching" aria-label="Teaching">Teaching</NavLink>
      <NavLink to="/research" className="nav-btn nav-research" aria-label="Research">Research</NavLink>
    </nav>
  );
}
