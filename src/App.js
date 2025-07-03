// src/App.jsx  (remove the old per-course imports)
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home     from './pages/Home';
import Research from './pages/Research';
import Teaching from './pages/Teaching';
import CoursePage from './pages/CoursePage';   // new

export default function App() {
  return (
    <BrowserRouter basename="/">
      <Navbar />
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/research"   element={<Research />} />
        <Route path="/teaching"   element={<Teaching />} />

        {/* dynamic course route */}
        <Route path="/courses/:courseId" element={<CoursePage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
