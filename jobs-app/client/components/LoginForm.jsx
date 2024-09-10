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

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => dispatch(loginUser(values))}
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
