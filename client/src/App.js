import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import CompanyShowcase from './components/CompanyShowcase/CompanyShowcase';
import Login from './components/Login/Login';
import JobListings from './components/JobListings/JobListings';
import Test from './components/Test/Test';
import Navbar from './components/Navbar/Navbar';
import Employees from './components/Admin/Employees';
import AddJob from './components/Admin/AddJob';
import Jobs from './components/Employee/Jobs';

// PrivateRoute component for role-based access
const PrivateRoute = ({ children, userType, requiredType }) => {
    const { user } = useSelector((state) => state.auth);

    // Redirect if not logged in or if the user type doesn't match
    if (!user || user.type !== requiredType) {
        return <Navigate to="/" />;
    }

    return children;
};

function App() {
    const { user } = useSelector((state) => state.auth);

    return (
        <Router>
            <Navbar />
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/joblist" element={<JobListings />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/companies" element={<CompanyShowcase />} />
                <Route path="/login" element={<Login />} />
                <Route path="/test" element={<Test />} />

                {/* Admin Routes */}
                <Route
                    path="/admin/employees"
                    element={
                        <PrivateRoute userType={user?.type} requiredType="admin">
                            <Employees />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/add-job"
                    element={
                        <PrivateRoute userType={user?.type} requiredType="admin">
                            <AddJob />
                        </PrivateRoute>
                    }
                />

                {/* Employee Routes */}
                <Route
                    path="/jobs"
                    element={
                        <PrivateRoute userType={user?.type} requiredType="employee">
                            <Jobs />
                        </PrivateRoute>
                    }
                />

                {/* Catch-all route */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;

