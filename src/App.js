import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';

import Home from './Components/Home';
import Registration from './Components/Registration';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';

import FileSharing from './Components/FileSharing';



const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/FileSharing" element={<FileSharing />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;