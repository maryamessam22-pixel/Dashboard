import React, { Component } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Sidebar from '../components/Sidebar';
import Home from './Home';
import Messages from './Messages';

const Routing = () => {
    return ( <>
    

{/* <Sidebar/> */}

 <BrowserRouter>
 <Routes>
          <Route path="/" element={<Home />} />
          <Route path="messages" element={<Messages />} />
 
 
          {/* <Route path="*" element={<Errorpage />} /> */}
  </Routes>
 </BrowserRouter>


    </> );
}
 
export default Routing;