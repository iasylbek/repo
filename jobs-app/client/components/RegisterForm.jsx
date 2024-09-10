import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/authSlice';

const RegisterForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(12, 'Password must be at least 12 characters')
      .matches(/[A-Z]/, 'Must contain an uppercase letter')
      .matches(/[a-z]/, 'Must contain a lowercase letter')
      .matches(/[0-9]/, 'Must contain a number')
      .matches(/[!@#$%^&*]/, 'Must contain a special character')
      .required('Password is required'),
    role: Yup.string().required('Role is required'),
  });

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '', role: 'Free User' }}
      validationSchema={validationSchema}
      onSubmit={(values) => dispatch(registerUser(values))}
    >
      <Form>
        <Field name='name' placeholder='Name' />
        <ErrorMessage name='name' />
        <Field name='email' placeholder='Email' />
        <ErrorMessage name='email' />
        <Field name='password' placeholder='Password' />
        <ErrorMessage name='password' />
        <Field as='select' name='role'>
          <option value='Free User'>Free User</option>
          <option value='Paid User'>Paid User</option>
        </Field>
        <button type='submit'>Register</button>
        <button type='button'>
          <a href='/'>Return Back</a>
        </button>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
