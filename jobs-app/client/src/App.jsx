import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import JobsTable from '../components/JobsTable';
import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector((state) => {
    console.log('state on App', state);

    return state.auth;
  });

  console.log('user', user);

  return (
    <Router>
      <Routes>
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route
          path='/jobs'
          element={user ? <JobsTable /> : <Navigate to='/login' />}
        />
        <Route path='*' element={<Navigate to='/jobs' />} />
      </Routes>
    </Router>
  );
}

export default App;
