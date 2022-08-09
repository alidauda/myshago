import { Field, Form, Formik } from 'formik';
import { NextPage } from 'next';
import { useState } from 'react';
import graphqlRequestClient from '../src/clients/graphqlResquest';
import {
  RegisterMutation,
  RegisterMutationVariables,
  useRegisterMutation,
} from '../src/generated/graphql';

const Register: NextPage = () => {
  const { mutate } = useRegisterMutation<RegisterMutation>(graphqlRequestClient, {
    onSuccess: (
      data: RegisterMutation,
      _variables: RegisterMutationVariables,
      _context: unknown
    ) => {
      return console.log('mutation data', data);
    },
  });
  const [email, setEmail] = useState('');
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values, { setErrors }) => {
        const response= mutate(values)
if(response.){

}
      }}
    >
      <Form>
        <label htmlFor='email'>Email</label>
        <Field name='email' type='email' />
        <label htmlFor='password'>Password</label>
        <Field name='firstName' type='password' />
      </Form>
    </Formik>
  );
};

export default Register;
