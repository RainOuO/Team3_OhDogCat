import React from 'react';
import Footer from './components/layout/Footer';
import Homepage from './pages/HomePage';
import Header from './components/layout/Header';
import Travel from './pages/Travel';

import { Routes, Route } from 'react-router-dom';
import 'swiper/css/bundle';
import './styles/style.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/travel/:tavelId" element={<Travel />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
