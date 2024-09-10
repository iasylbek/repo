import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import JobsTable from '../components/JobsTable';
import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/jobs' element={user ? <JobsTable /> : <LoginForm />} />
        <Route path='*' element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
