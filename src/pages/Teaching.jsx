// src/pages/Teaching.jsx
import { Link } from 'react-router-dom';

export default function Teaching() {
  return (
    <main style={{ padding: '1rem' }}>
      <h1>Teaching</h1>
      <ul>
        <li><Link to="/courses/ARHI13182">ARHI 13182 — Art & Visual Culture</Link></li>
        <li><Link to="/courses/ARHI43406">ARHI 43406 — Topics in Contemporary Art</Link></li>
        {/* Add more courses by adding another <li> */}
      </ul>
    </main>
  );
}
