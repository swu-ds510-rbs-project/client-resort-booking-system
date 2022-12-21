import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "bootstrap-icons/font/bootstrap-icons.css";

import 'rsuite/dist/rsuite.min.css';

import { TheNavbar } from './Components/Navbar';
import { HouseList } from './Components/HouseSearching/HouseList';

import { Login } from './Components/UserAuthentication/Login';
import { Register } from './Components/UserAuthentication/Register';
import './font.css';
import { Profile } from './Components/UserAuthentication/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <TheNavbar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/available-houses" element={<HouseList />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </BrowserRouter>
);