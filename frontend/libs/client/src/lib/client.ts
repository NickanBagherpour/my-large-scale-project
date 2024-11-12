import axios from 'axios';

import { LocalStorageKey } from '@oxygen/types';

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

client.interceptors.request.use((config) => {

  // const userDataString = localStorage.getItem(LocalStorageKey.USER);

  // const userData = userDataString ? JSON.parse(userDataString) : null;
  // const branchCode = userData?.branchCode || '';

  // if (branchCode) {
  //   config.headers['BRANCH_CODE'] = branchCode;
  // }

  return config;
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;

    if (originalConfig.url !== '/auth' && error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem(LocalStorageKey.USER);
        if (error.response.data.location) {
          window.location.href = error.response.data.location;
        } else {
          window.location.href = '/auth';  //fixme remove .html extension
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
