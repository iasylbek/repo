import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
    if (user) {
      dispatch(fetchJobs());
    }
  }, [dispatch, user]);

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
    <div style={{ minidth: '100%', alignSelf: 'center' }}>
      <TableContainer component={Paper} style={{ width: '100%' }}>
        <Table style={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>Job Title</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Posted Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job, index) => (
              <TableRow
                key={job._id || index}
                onClick={() => handleRowClick(job)}
                hover
              >
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>
                  {new Date(job.datePosted).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedJob && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <div
            style={{
              padding: 20,
              backgroundColor: 'white',
              margin: 'auto',
              marginTop: '10%',
              maxWidth: '80%',
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            <Typography variant='h6' color='black'>
              {selectedJob.title}
            </Typography>
            <Typography variant='subtitle1' color='black'>
              {selectedJob.company}
            </Typography>
            <Typography variant='body2' color='darkcyan' fontWeight={500}>
              Posted on: {new Date(selectedJob.datePosted).toLocaleDateString()}
            </Typography>
            <Typography variant='body2' color='black' fontWeight={700}>
              Apply at:{' '}
              <a
                href={selectedJob.applyUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                {selectedJob.applyUrl}
              </a>
            </Typography>
            <Typography variant='body1' color='black' fontSize={12}>
              {selectedJob.description}
            </Typography>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default JobsTable;
