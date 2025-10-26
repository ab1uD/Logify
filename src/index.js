import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar.jsx';

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Routes, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import SightingsSection from "./components/SightingsSection";
import Testimonials from "./components/Testimonials";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ReportSighting from "./components/ReportSighting.jsx";
import AllReports from "./components/AllReports.jsx";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <BrowserRouter>
  <NavBar />
      <Routes>
        <Route path="/" element={ <App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/sightings" element={<SightingsSection />} />
      
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/report" element={<ReportSighting />} />
        <Route path="/report/:username" element={<ReportSighting />} />
        <Route path="/reports" element={<AllReports />} />
        
       
        
      </Routes>

    
  </BrowserRouter>
);

