import axios from 'axios';

import { LocalStorageKey } from '@oxygen/types';
import { getCookie, ROUTES } from '@oxygen/utils';

const baseUrl = '/';

export const portalUrl = process.env.NEXT_PUBLIC_PORTAL_PREFIX;

const client = axios.create({
  baseURL: baseUrl,
  timeout: 120000,
  // maxRedirects: 0,// Disable automatic following of redirect responses
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    // csrf: '',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    // 'Access-Control-Request-Method': 'GET/POST/OPTIONS',
  },
  withCredentials: true,
});

// Add a request interceptor

client.interceptors.request.use(async (config) => {

  /* const session = await auth();

 // const userDataString = localStorage.getItem(LocalStorageKey.USER);

 // const userData = userDataString ? JSON.parse(userDataString) : null;
 // const branchCode = userData?.branchCode || '';

 if (session) {
   config.headers['Authorization'] = `Bearer ${session?.user?.name}`;
 }*/

  return config;
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;


    if (originalConfig.url !== ROUTES.CUSTOMER.AUTH && error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem(LocalStorageKey.USER);
        if (error.response.data.location) {
          window.location.href = error.response.data.location;
        } else {
          window.location.href = ROUTES.CUSTOMER.AUTH;
        }
      } /* else if (error.response.status === 300) {

        if(!error.response.request.responseURL.endsWith('/auth')){
          window.location = error.response.headers.location;
        }
      }*/
    }
    return Promise.reject(error);
  },
);

export default client;
