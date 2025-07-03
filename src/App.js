// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Research from './pages/Research';
import Teaching from './pages/Teaching';
import Contact from './pages/Contact';
import ARHI13182 from './pages/ARHI13182';
import ARHI43406 from './pages/ARHI43406';




function App() {
  return (
    <BrowserRouter basename="/">
      <Navbar />
      <Routes>
     
<Route path="/courses/ARHI13182" element={<ARHI13182 />} />
<Route path="/courses/ARHI43406" element={<ARHI43406 />} />
        <Route path="/" element={<Home />} />
        <Route path="/research" element={<Research />} />
        <Route path="/teaching" element={<Teaching />} />
        <Route path="/contact" element={<Contact />} />
        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
