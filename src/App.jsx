import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ToTop from './components/ToTop';
import WaFloat from './components/WaFloat';
import AdminPanel from './components/AdminPanel';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import MapPage from './pages/MapPage';
import Reviews from './pages/Reviews';
import Booking from './pages/Booking';

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Loader />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      {pathname !== '/admin' && <Footer />}
      <ToTop />
      <WaFloat />
    </>
  );
}

