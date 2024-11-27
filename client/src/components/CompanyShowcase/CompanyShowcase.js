import React, { useEffect, useState } from 'react';
import axios from '../../api'; // Assuming api.js is configured in src/services
import './CompanyShowcase.css';

const CompanyShowcase = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        // Example API call to fetch company images
        const fetchCompanies = async () => {
            try {
                const response = await axios.get('/user/companies'); // Adjust endpoint as needed
                console.log('Fetched companies:', response.data);
                setCompanies(response.data);
            } catch (error) {
                console.error('Error fetching company data:', error);
            }
        };

        fetchCompanies();
    }, []);

    return (
        <div>
            <h1>Company Showcase</h1>
            <div className="company-container">
                {companies.map(company => (
                    <div key={company.id} className="company-item">
                        <img src={company.imageUrl} alt={company.name} style={{ width: '500px', height: '150px', objectFit: 'contain' }} />
                        <p>{company.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompanyShowcase;
