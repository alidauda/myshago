import { Field, Form, Formik } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import graphqlRequestClient from '../src/clients/graphqlResquest';
import {
  RegisterMutation,
  RegisterMutationVariables,
  useRegisterMutation,
  FieldError,
} from '../src/generated/graphql';

const Register: NextPage = () => {
  const router = useRouter();
  const { mutate } = useRegisterMutation(graphqlRequestClient, {
    onSuccess: (
      data: RegisterMutation,
      _variables: RegisterMutationVariables,
      _context: unknown
    ) => {
      return console.log('mutation data', data);
    },
   
  });

  return (
    <div className='w-full h-screen  justify-items-center items-center flex bg-[#B6E0FE]  '>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          
          const respone = mutate(values);
        }}
      >
        <div className='m-auto'>
          <Form className='flex flex-col  w-96 px-7 py-7 bg-white rounded-md shadow-lg'>
            <label htmlFor='email' className='mb-3 text-[#243B53] font-medium'>
              Email
            </label>
            <Field
              name='email'
              type='email'
              className='rounded-lg  px-4 py-3'
            />
            <label
              htmlFor='password'
              className='mt-5 mb-3 text-[#243B53] font-medium'
            >
              Password
            </label>
            <Field
              name='password'
              type='password'
              className='rounded-lg  px-4 py-3border-[#B6E0FE]  '
            />

            <button
              type={'submit'}
              className='mt-6 border-2 p-3 rounded-lg font-medium  text-[#F0F4F8] bg-[#4098D7] hover:bg-[#186FAF]  '
            >
              
                'submit'
             
            </button>
           
          </Form>
        </div>
      </Formik>
    </div>
  );
};

export default Register;
