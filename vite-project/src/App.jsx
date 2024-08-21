import './App.css';
import Contact from './components/Contact';
import Photoshoots from './components/Photoshoots';
import SignIn from './components/SignIn';
import UploadImage from './components/editPortfolio';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

function AppContent() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/signin' && location.pathname !== '/upload' &&(
        <>
          <h1>Katarina Paredes</h1>
          <Photoshoots />
          <Contact />
        </>
      )}
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/upload" element={<UploadImage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;