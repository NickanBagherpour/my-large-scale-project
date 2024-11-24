'use server';

import { useMutation } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import Api from '../services/api';
import { headers } from 'next/headers';
import { signIn } from '@oxygen/customer/auth';

const base_url = process.env.API_BASE_URL;

export const registerUser = async (formData: any) => {
  const requestHeaders = headers();
  const ip = requestHeaders.get('x-forwarded-for') || 'Unknown IP';

  const { captchaToken, ...restParams } = formData;

  // console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii requestHeaders', requestHeaders);
  console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii registerUser', ip, base_url, formData);
  const res = await fetch(`${base_url}/api/v1/client/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Captcha-Token': captchaToken,
    },
    body: JSON.stringify(restParams),
  });

  console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii res', res);

  if (!res.ok) {
    throw new Error('Failed to register');
  }

  const data = await res.json();
  // const token = res.headers.get('X-Auth-Token'); // Assuming the token is in this header

  // return { data, token };
  return data;
};
