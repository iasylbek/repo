import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/authSlice';

const LoginForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values) => {
    const resultAction = await dispatch(loginUser(values));
    if (loginUser.fulfilled.match(resultAction)) {
      // Save token to localStorage
      localStorage.setItem('token', resultAction.payload.token);
      // Redirect or update state to show logged-in content
      window.location.href = '/jobs'; // Redirect to jobs page or use router
    } else {
      // Handle login error
      alert('Login failed');
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Field name='email' placeholder='Email' />
        <ErrorMessage name='email' />
        <Field name='password' placeholder='Password' type='password' />
        <ErrorMessage name='password' />
        <button type='submit'>Login</button>
        <button type='button'>
          <a href='/register'>Register</a>
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
