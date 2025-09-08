import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Header from './components/Header';
import LoginModal from './components/LoginModal';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <LoginModal />
          
          <main>
            <Routes>
              <Route path="/" element={<ProductListing />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;