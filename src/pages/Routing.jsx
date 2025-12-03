import React, { Component } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Home';
import Messages from './Messages';
import Profile from './Profile';

const Routing = () => {
    return ( <>
    



 <BrowserRouter>
 <Routes>
          <Route path="/" element={<Home />} />
          <Route path="messages" element={<Messages />} />
          <Route path="profile" element={<Profile/>} />
 
          {/* <Route path="*" element={<Errorpage />} /> */}
  </Routes>
 </BrowserRouter>


    </> );
}
 
export default Routing;