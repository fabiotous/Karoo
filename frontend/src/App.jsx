import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';
import About from './pages/About';
import UnderConstruction from './pages/UnderConstruction';
import ElectronicProducts from './pages/ElectronicProducts';
import Staff from './pages/Staff';
import Cart from './pages/Cart';
import Headers from './components/Headers';
import Footers from './components/Footers';
import './css/Home.css';
import ProtectedRoute from './components/ProtectedRoute';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import ShippingReturns from './pages/ShippingReturns';
import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080');

function App() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server with ID:', socket.id);
    });

    return () => {
      socket.off('connect');
    };
  }, []);

  return(
    <BrowserRouter>
      <Headers></Headers>
<Routes>
  {/* Public routes */}
  <Route path="/signin" element={<SignIn/>}/>
  <Route path="/signup" element={<SignUp/>}/>
  <Route path="/about" element={<About/>}/>
  <Route path="/faq" element={<FAQ/>}/>
  <Route path="/privacy" element={<PrivacyPolicy />} />
  <Route path="/terms" element={<TermsConditions />} />
  <Route path="/shipping" element={<ShippingReturns />} />

  {/* Protected routes */}
  <Route path="/" element={
    <ProtectedRoute>
      <HomePage/>
    </ProtectedRoute>
  }/>

  <Route path="/home" element={
    <ProtectedRoute>
      <HomePage/>
    </ProtectedRoute>
  }/>

  <Route path="/underconstruction" element={
    <ProtectedRoute>
      <UnderConstruction/>
    </ProtectedRoute>
  }/>

  <Route path="/electronics" element={
    <ProtectedRoute>
      <ElectronicProducts socket={socket}/>
    </ProtectedRoute>
  }/>

  <Route path="/staff" element={
    <ProtectedRoute>
      <Staff socket={socket}/>
    </ProtectedRoute>
  }/>

  <Route path="/cart" element={
    <ProtectedRoute>
      <Cart/>
    </ProtectedRoute>
  }/>
</Routes>
      <Footers></Footers>
    </BrowserRouter>
  )
}

export default App;
