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

function App() {

  return(
    <BrowserRouter>
      <Headers></Headers>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/underconstruction" element={<UnderConstruction/>}/>
        <Route path="/electronics" element={<ElectronicProducts/>}/>
        <Route path="/staff" element={<Staff/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
      <Footers></Footers>
    </BrowserRouter>
  )
}

export default App;
