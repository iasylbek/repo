import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchJobs } from '../features/jobsSlice';
import { Modal, Typography } from '@mui/material';

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

  const columns = [
    { field: 'title', headerName: 'Job Title', flex: 1 },
    { field: 'company', headerName: 'Company Name', flex: 1 },
    { field: 'jobType', headerName: 'Job Type', flex: 1 },
    { field: 'jobLevel', headerName: 'Job Level', flex: 1 },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <DataGrid
        rows={jobs}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={user.role === 'Paid User' ? [10, 20, 50] : [10]}
        onRowClick={(params) => handleRowClick(params.row)}
        getRowId={(row) => row._id}
        sx={{
          '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: '#f5f5f5',
          },
          '& .MuiDataGrid-row:nth-of-type(odd)': {
            backgroundColor: '#ffffff',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#e0f7fa',
          },
          '& .MuiDataGrid-row': {
            borderBottom: '1px solid #e0e0e0',
          },
        }}
      />

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
