import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/homepage';
import About from './pages/About';
import UnderConstruction from './pages/UnderConstruction';
import ElectronicProducts from './pages/ElectronicProducts';
import Staff from './pages/Staff';
//import SearchBook from './components/SearchBook';

import Headers from './components/Headers';
import Footers from './components/Footers';
import './css/Home.css';

//React uses Pascal Case / Upper Camel Case for component names by convention (differentiates it from non-jsx JavaScript functions)
function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  // This function will be called when a book is added, updated, or deleted
  const handleRefresh = () => {
    //often this is a counter; but I don't like the idea of an infinite counter so using a boolean toggle instead
    setRefreshTrigger(prev => !prev);
  };

  // return (
  //   //this is a fragment - a way to return elements without adding additional divs to the DOM
  //   <>
  //     <DisplayBooks refreshTrigger={refreshTrigger} />
  //     <SearchBook />
  //     <NewBook onBookAdded={handleRefresh} />
  //     <UpdateBook onBookUpdated={handleRefresh} />
  //     <DeleteBook onBookDeleted={handleRefresh} />
  //   </>
  // );
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
      </Routes>
      <Footers></Footers>
    </BrowserRouter>
  )
}

//export allows this component to be imported in other files/modules
export default App;
