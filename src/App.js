import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Homepage from './pages/HomePage';
import ExamplePage from './pages/ExamplePage';
import Travel from './pages/Travel';
import CommunityList from './pages/Community/';
import AdminCenterPage from './pages/AdminCenter/AdminCenterPage';
import 'swiper/scss';
import './styles/style.scss';
import PersonalHomePage from './pages/AdminCenter/PersonalHomePage';
import PostManagement from './pages/PostManagement/PostManagement';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="example" element={<ExamplePage />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/communitylist" element={<CommunityList />} />
        <Route path="/personalHomePage" element={<PersonalHomePage />} />
        <Route path="/AdminCenterPage" element={<AdminCenterPage />} />
        <Route path="/PostManagement" element={<PostManagement />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
