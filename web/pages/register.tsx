import { Field, Form, Formik } from 'formik';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import graphqlRequestClient from '../src/clients/graphqlResquest';
import {
  RegisterMutation,
  RegisterMutationVariables,
  useRegisterMutation,
} from '../src/generated/graphql';
import { toErrorMap } from '../src/utils/toError';

const Register: NextPage = () => {
  const router = useRouter();
  const { data, mutate ,isLoading} = useRegisterMutation<RegisterMutation>(
    graphqlRequestClient,
    {
      onSuccess: (
        data: RegisterMutation,
        _variables: RegisterMutationVariables,
        _context: unknown
      ) => {
        return console.log('mutation data', data);
      },
    }
  );
  const [error, setError] = useState<String[]>();
  const [show, setShow] = useState(false);
  return (
    <div className='w-full h-screen  justify-items-center items-center flex bg-[#B6E0FE]  '>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
           mutate(values);
          if (data?.register.error) {
            const dt = data?.register.error?.map((e) => e.message);
            setShow(true);
            setError(dt);
          } else if (data?.register.user) {
            router.push('/');
          }
        }}
      >
         {({ isSubmitting }) => (
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
            <div className=" flex justify-center items-center">
  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
</div>
            <button
              type={'submit'}
              disabled={isSubmitting}
              className='mt-6 border-2 p-3 rounded-lg font-medium  text-[#F0F4F8] bg-[#4098D7] hover:bg-[#186FAF]  '
            >
              {isSubmitting?<div className=" flex justify-center items-center">
  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
</div>:"submit"}
            </button>
            {show ? (
              <div className='flex justify-between mt-4 text-red-400 bg-[#D9E2EC] p-3 rounded-md font-medium'>
                <p>{error}</p>
                <button className='text-lg' onClick={(_) => setShow(false)}>
                  x
                </button>
              </div>
            ) : (
              ''
            )}
          </Form>
        </div>
         )}
      </Formik>
    </div>
  );
};

export default Register;
