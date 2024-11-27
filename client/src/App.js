import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import JobListings from './components/JobListings/JobListings';
import Contact from './components/Contact/Contact';
import CompanyShowcase from './components/CompanyShowcase/CompanyShowcase';
import Login from './components/Login/Login';
import Test from './components/Test/Test';
import Navbar from './components/Navbar/Navbar';

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/jobs" element={<JobListings />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/companies" element={<CompanyShowcase />} />
                <Route path="/login" element={<Login />} />
                <Route path="/test" element={<Test />} />
            </Routes>
        </Router>
    );
}

export default App;
