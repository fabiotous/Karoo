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

function App() {

  return(
    <BrowserRouter>
      <Headers></Headers>
<Routes>
  {/* Public routes */}
  <Route path="/signin" element={<SignIn/>}/>
  <Route path="/signup" element={<SignUp/>}/>

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

  <Route path="/about" element={
    <ProtectedRoute>
      <About/>
    </ProtectedRoute>
  }/>

  <Route path="/underconstruction" element={
    <ProtectedRoute>
      <UnderConstruction/>
    </ProtectedRoute>
  }/>

  <Route path="/electronics" element={
    <ProtectedRoute>
      <ElectronicProducts/>
    </ProtectedRoute>
  }/>

  <Route path="/staff" element={
    <ProtectedRoute>
      <Staff/>
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
