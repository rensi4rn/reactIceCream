import React from 'react';


 
import './styles/ice-cream.scss';


import Header from './structure/Header';
import Footer from './structure/Footer';
import Menu from './ice-cream/Menu';
import EditIceCream from './ice-cream/EditIceCream';
import AddIceCream from './ice-cream/AddIceCream';
import IceCreams from './ice-cream/IceCreams'

import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'; 



const App = () => {
  return (
    <Router>   
        <a href="#main" className="skip-link" > Skip to content</a> 
        <Header />
        <Routes>
            <Route path="/" element={<Menu/>} />
            <Route path="/menu-items/add" element={<AddIceCream  />} />     
            <Route path="/menu-items/:menuItemId" element={<EditIceCream  />} />  
            <Route path="/ice-creams" element={<IceCreams/>} />    

            <Route
                path="*"
                element={<Menu/>}
            />
        </Routes> 
         
        <Footer/>
   </Router> 
  );
};

export default App;
