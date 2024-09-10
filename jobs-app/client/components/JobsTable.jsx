import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  // TableSortLabel,
  Modal,
  Typography,
  Paper,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchJobs } from '../features/jobsSlice';

const JobsTable = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);

  const [selectedJob, setSelectedJob] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handleRowClick = (job) => {
    if (user.role === 'Paid User') {
      setSelectedJob(job);
      setOpen(true);
    } else {
      alert('Feature not available for Free Users');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job Title</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Job Type</TableCell>
              <TableCell>Job Level</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id} onClick={() => handleRowClick(job)} hover>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.jobType}</TableCell>
                <TableCell>{job.jobLevel}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedJob && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <div style={{ padding: 20 }}>
            <Typography variant='h6'>Job Details</Typography>
            <Typography>Geo: {selectedJob.geo}</Typography>
            <Typography>
              Salary Currency: {selectedJob.salaryCurrency}
            </Typography>
            <Typography>Industry: {selectedJob.industry}</Typography>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default JobsTable;
