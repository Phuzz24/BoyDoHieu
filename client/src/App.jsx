import { Routes, Route, useLocation } from 'react-router-dom'; // Thêm useLocation
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import ForgotPassword from './pages/ForgotPassword';
import BackToTop from './components/common/BackToTop';
import Products from './pages/Product';
import Contact from './pages/Contact.jsx';
import Spa from './pages/Spa.jsx';
import TermsAndConditions from './pages/TermsAndConditions.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import Favourites from './pages/Favourites.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx'; 
import OrderHistory from './pages/OrderHistory.jsx'; 
import Profile from './pages/Profile.jsx';
import ProtectedAdminRoute from './components/common/ProtectedAdminRoute'; // Từ trước

function AppContent() {
  const location = useLocation(); // Lấy path hiện tại
  const isAdminRoute = location.pathname.startsWith('/admin'); // Check nếu /admin*

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Header />} {/* Bỏ Header nếu admin */}
      <main className={`flex-grow ${isAdminRoute ? 'p-0' : 'container mx-auto px-4 py-8'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            } 
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/spa" element={<Spa />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/order-success/:orderId" element={<OrderSuccess />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/account" element={<Profile />} />
        </Routes>
        {!isAdminRoute && <BackToTop />} {/* Bỏ BackToTop nếu admin */}
      </main>
      {!isAdminRoute && <Footer />} {/* Bỏ Footer nếu admin */}
    </div>
  );
}

function App() {
  return <AppContent />; // Wrap trong component con để useLocation
}

export default App;