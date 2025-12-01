import React, { Component } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Sidebar from '../components/Sidebar';
import Home from './Home';

const Routing = () => {
    return ( <>
    

{/* <Sidebar/> */}

 <BrowserRouter>
 <Routes>
          <Route path="/" element={<Home />} />
 
 
 
          {/* <Route path="*" element={<Errorpage />} /> */}
  </Routes>
 </BrowserRouter>


    </> );
}
 
export default Routing;