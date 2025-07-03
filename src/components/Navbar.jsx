import { NavLink } from 'react-router-dom';

const linkStyle = ({ isActive }) => ({
  marginRight: '1rem',
  textDecoration: 'none',
  color: isActive ? '#0070f3' : '#333',
});

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem' }}>
      <NavLink to="/"         style={linkStyle}>Home</NavLink>
      <NavLink to="/research" style={linkStyle}>Research</NavLink>
      <NavLink to="/teaching" style={linkStyle}>Teaching</NavLink>
    </nav>
  );
}
