import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../redux/jobsSlice';
import { Card, CardContent, Typography } from '@mui/material';

const Jobs = () => {
    const dispatch = useDispatch();
    const { list: jobs, loading } = useSelector((state) => state.jobs);

    useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            {jobs.map((job) => (
                <Card key={job._id}>
                    <CardContent>
                        <Typography variant="h5">{job.jobTitle}</Typography>
                        <Typography>{job.description}</Typography>
                        <Typography>Salary: {job.salary}</Typography>
                        <Typography>Company: {job.companyName}</Typography>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default Jobs;
