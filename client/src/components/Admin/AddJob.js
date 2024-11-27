import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addJob } from '../../redux/jobsSlice';

const AddJob = () => {
    const dispatch = useDispatch();
    const [jobData, setJobData] = useState({
        companyName: '',
        jobTitle: '',
        description: '',
        salary: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData({ ...jobData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addJob(jobData));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="companyName" placeholder="Company Name" onChange={handleChange} required />
            <input name="jobTitle" placeholder="Job Title" onChange={handleChange} required />
            <textarea name="description" placeholder="Description" onChange={handleChange} required />
            <input name="salary" placeholder="Salary" onChange={handleChange} required type="number" />
            <button type="submit">Add Job</button>
        </form>
    );
};

export default AddJob;
