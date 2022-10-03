import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { UserInfoProvider } from './hooks/useUserInfo';
import { SocketProvider } from './hooks/useSocket';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import ScrollToTop from './components/layout/ScrollToTop';
import Homepage from './pages/HomePage';
import Travel from './pages/Travel';
import AdminCenter from './components/adminPage/AdminCenter';
import AdminVocherPage from './pages/AdminVocherPage';
import AdminCollectionPage from './pages/AdminCollectionPage';
import AdminMessageListPage from './pages/AdminMessageListPage';
import AdminProfilePage from './pages/AdminProfilePage';
import AdminOrderListPage from './pages/AdminOrderListPage';
import Conversation from './components/layout/Conversation';
import CommunityList from './pages/CommunityList';
import CommunityHomePage from './pages/CommunityHomePage';
import CommunityManagement from './pages/CommunityManagement';
import Travelmap from './pages/Travel_map';
import ExamplePage from './pages/ExamplePage/ExamplePage';

import Post from './pages/PostManagement/Post';
import PostTrip from './pages/PostManagement/PostTrip';
import PostEdit from './pages/PostManagement/PostEdit';
import PostTripEdit from './pages/PostManagement/PostTripEdit';
import EcEnjoyHomepage from './pages/Ecommerce/EC_HomePage/EC_2Enjoy_Homepage';
import EcRestaurantHomepage from './pages/Ecommerce/EC_HomePage/EC_3Restaurant_Homepage';
import EcCommodityHomepage from './pages/Ecommerce/EC_HomePage/EC_4Commodity_Homepage';
import EcProductDetail from './pages/Ecommerce/ProductDetail';
import EcProductFilter from './pages/Ecommerce/EC_productFilter';
import ECOrderSteps from './pages/Ecommerce/EC_checkout';
import ECLinePay from './pages/Ecommerce/EC_LinePay';

import 'antd/dist/antd.min.css';
import 'swiper/scss';
import 'swiper/css/bundle';
import 'react-photo-view/dist/react-photo-view.css';
import './styles/style.scss';

function App() {
  return (
    <div className="app">
      <UserInfoProvider>
        <SocketProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="example" element={<ExamplePage />} />
            <Route path="/travel" element={<Travel />} />
            <Route path="/Travel_map" element={<Travelmap />} />
            <Route path="/communityList" element={<CommunityList />} />
            <Route path="/communityHomePage" element={<CommunityHomePage />} />
            <Route path="admin" element={<AdminCenter />}>
              <Route index element={<AdminProfilePage />} />
              <Route path="profile" element={<AdminProfilePage />} />
              <Route path="order" element={<AdminOrderListPage />} />
              <Route path="voucher" element={<AdminVocherPage />} />
              <Route path="community" element={<CommunityManagement />} />
              <Route path="collection" element={<AdminCollectionPage />} />
              <Route path="messages" element={<AdminMessageListPage />} />
            </Route>
            <Route path="/post" element={<Post />} />
            <Route path="/postEdit" element={<PostEdit />} />
            <Route path="/postTrip" element={<PostTrip />} />
            <Route path="/postTripEdit" element={<PostTripEdit />} />
            {/* EC section-------------------------------- */}
            <Route path="/ec-productfilter" element={<EcProductFilter />} />
            <Route path="/ec-productdetail" element={<EcProductDetail />} />
            <Route
              path="/ec-restauranthomepage"
              element={<EcRestaurantHomepage />}
            />
            <Route
              path="/ec-commodityhomepage"
              element={<EcCommodityHomepage />}
            />
            <Route path="/ec-enjoyhomepage" element={<EcEnjoyHomepage />} />
            <Route path="ec-ordersteps" element={<ECOrderSteps />} />
            <Route path="/linePay/confirm" element={<ECLinePay />} />
            {/* EC section-------------------------------- */}
          </Routes>
          <Outlet />
          <Footer />
          <Conversation />
          <ScrollToTop />
        </SocketProvider>
      </UserInfoProvider>
    </div>
  );
}

export default App;
