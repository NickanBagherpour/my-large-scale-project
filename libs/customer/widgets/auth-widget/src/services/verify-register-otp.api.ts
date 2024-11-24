import { useMutation } from '@tanstack/react-query';
import Api from './api';
import { ApiUtil } from '@oxygen/utils';
import { useAppDispatch } from '../context';
import { signIn } from '@oxygen/customer/auth';

export const useVerifyRegisterMutation = () => {

  const dispatch = useAppDispatch();

  return useMutation(
    {
      mutationFn: (params) => Api.postVerifyRegisterOTP(params),
      // onSuccess: async (data) => {
      //   console.log('Registration successful11:', data);
      //
      //   const { error } = await signIn('credentials', { id:  data.headers['Authorization'], redirect: false });
      //
      //   // document.cookie = `authToken=${token}; path=/; secure; HttpOnly`; // Save the token in cookies
      // },
      onError: (e) => {
        const err = ApiUtil.getErrorMessage(e);
        dispatch({ type: 'UPDATE_GLOBAL_MESSAGE', payload: err });
      },
    });
};

