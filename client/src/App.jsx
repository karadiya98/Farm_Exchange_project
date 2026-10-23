import React, { useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SideAds from './components/SideAds';
import Home from './pages/Home';
import Equipment from './pages/Equipment';
import Specials from './pages/Specials';
import Dealers from './pages/Dealers';
import About from './pages/About';
import Contact from './pages/Contact';
import Listing from './pages/Listing';
import Signup from './pages/Signup';
import UploadAd from './pages/UploadAd';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import AdminOrders from './admin/pages/AdminOrders';
import AdminListings from './admin/pages/AdminListings';
import AdminCustomers from './admin/pages/AdminCustomers';
import AdminAds from './admin/pages/AdminAds';
import AdminFinances from './admin/pages/AdminFinances';
import AdminAnalytics from './admin/pages/AdminAnalytics';
import AdminSettings from './admin/pages/AdminSettings';

function Shell() {
  const { pathname, search } = useLocation();
  const isAdmin = pathname.startsWith('/admin');
  const isSignup = pathname === '/signup';

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  if (isAdmin) {
    return (
      <div className="max-w-[100vw] overflow-x-hidden font-sans text-primary">
        <Routes>
          <Route
            path="/admin"
            element={(
              <ProtectedRoute adminOnly>
                <AdminLayout />
              </ProtectedRoute>
            )}
          >
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="listings" element={<AdminListings />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="ads" element={<AdminAds />} />
            <Route path="finances" element={<AdminFinances />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className={`flex max-w-[100vw] flex-col overflow-x-clip bg-white font-sans text-primary ${isSignup ? 'h-svh overflow-hidden' : 'min-h-screen'}`}>
      <Navbar />
      {!isSignup && <SideAds />}
      <main className={`min-w-0 w-full flex-1 ${isSignup ? 'flex min-h-0 flex-col' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/catalogues" element={<Navigate to={`/equipment${search}`} replace />} />
          <Route path="/listing/:id" element={<Listing />} />
          <Route path="/specials" element={<Specials />} />
          <Route path="/dealers" element={<Dealers />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/upload-ad"
            element={(
              <ProtectedRoute>
                <UploadAd />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/profile"
            element={(
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/settings"
            element={(
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/cart"
            element={(
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/orders"
            element={(
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/orders/:orderId"
            element={(
              <ProtectedRoute>
                <OrderDetail />
              </ProtectedRoute>
            )}
          />
        </Routes>
      </main>
      {!isSignup && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Shell />
    </Router>
  );
}
