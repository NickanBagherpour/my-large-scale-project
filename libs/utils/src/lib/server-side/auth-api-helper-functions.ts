'use server';

import { cookies } from 'next/headers';

import { CookieKey } from '@oxygen/types';
import Mockify from '@oxygen/mockify';

import { createErrorResponse, createResponse } from '../api-response';
import { ENV_CONSTANTS } from '../env';
import { decodeToken, getRole } from '../jwt-util';

/**
 * Authentication configuration interface
 */
interface AuthConfig {
  ssoUrl?: string;
  clientKey?: string;
  clientSecret?: string;
  redirectUrl?: string;
}

/**
 * Performs signin by exchanging the authorization code for an access token
 *
 * @param {string} code - Authorization code from SSO provider
 * @param {AuthConfig} config - Authentication configuration
 * @returns {Promise<Response>} OAuth token response
 */
export async function signin(code: string, config: AuthConfig): Promise<Response> {
  if (ENV_CONSTANTS.IS_DEMO) {
    return createResponse({
      success: true,
      data: {
        last_logins: '[]',
        token_type: 'bearer',
        expires_in: 86400,
        access_token: process.env.NEXT_PUBLIC_TOKEN,
      },
    });
  }

  const url = `${config.ssoUrl}/identity/oauth2/auth/token`;

  const basicToken = Buffer.from(`${config.clientKey}:${config.clientSecret}`).toString('base64');

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${basicToken}`,
  };

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    redirect_uri: config.redirectUrl ?? '',
    code,
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch token >>  ${JSON.stringify(response)}`);
    }
    const data = await response.json();

    return createResponse({ success: true, data });
  } catch (error: unknown) {
    console.error('Error during SSO:', error);
    return createErrorResponse(error);
  }
}


/**
 * Performs signout by invalidating the session ticket
 *
 * @param {string} sessionTicket - Session ticket
 * @param {string} token - Access token
 * @param {AuthConfig} config - Authentication configuration
 * @returns {Promise<Response>} Signout response
 */
export async function signout(sessionTicket: string, token: string, config: AuthConfig): Promise<Response> {

  try {
    const url = `${config.ssoUrl}/identity/oauth2/auth/session/signout?sessionTicket=${sessionTicket}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log('-------------------SSO signout failed-------------------------');
    }


    const cookieStore = await cookies();

    // Filter out the CONFIG cookie
    const cookiesToClear = cookieStore
      .getAll()
      .filter((cookie) => cookie.name !== CookieKey.CONFIG);

    // Create the response with success and clear the cookies
    const res = createResponse({ success: true });

    // Append Set-Cookie headers to clear each cookie
    cookiesToClear.forEach((cookie) => {
      res.cookies.delete(cookie.name);
    });

    return res;

  } catch (error: unknown) {
    return createErrorResponse(error);
  }
}

/**
 * Validates the access token
 *
 * @param {string or null} bearerToken - Bearer token means it has the word Bearer followed by a space and then a JWT
 * @param {AuthConfig} config - Authentication configuration
 * @returns {Promise<Response>} Validation response
 */
export async function validateAccessToken(bearerToken: string | null, config: AuthConfig): Promise<Response> {

  try {

    const url = `${config.ssoUrl}/identity/oauth2/auth/token/validate`;

    if (!bearerToken) {
      return createErrorResponse(null, { error: 'Token is missing', statusCode: 401 });
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: bearerToken,
      },
    });

    // console.log('🚀 ~ GET ~ response:', url, response.status, token ,response);

    if (!response.ok) {
      throw new Error('Failed to validate token');
    }

    if (!response.ok) {
      const errorData = await response.json();
      return createErrorResponse(errorData, {
        error: errorData.message || 'Invalid token',
        errorDetails: errorData,
        statusCode: response.status,
      });
    }

    return createResponse({ success: true });

  } catch (error: unknown) {
    return createErrorResponse(error, {
      error: 'Error during token validation',
    });
  }
}

/**
 * Gets the user info
 * @param {string or null} bearerToken - Bearer token means it has the word Bearer followed by a space and then a JWT
 * @param {AuthConfig} config - Authentication configuration
 * * @returns {Promise<Response>} User info response
 */
export async function getUserInfo(bearerToken: string | null, config: AuthConfig): Promise<Response> {

  if (ENV_CONSTANTS.IS_DEMO /*ENV_CONSTANTS.IS_DEV && !ENV_CONSTANTS.DEV_WITH_SSO*/) {
    return createResponse({
      success: true,
      data: (await Mockify.getUserProfile()).data,
    });
  }

  if (!bearerToken || !bearerToken.startsWith('Bearer')) {
    return createErrorResponse(null, {
      error: 'Authorization token is missing or invalid',
      statusCode: 400, // Bad Request
    });
  }

  try {
    const url = `${config.ssoUrl}/identity-user-manager/userInfo`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: bearerToken, // Passing the token in the authorization header
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    const data = await response.json();

    const decodedToken = decodeToken(bearerToken);

    // console.log('decodedToken in user-info -----------------------------------------------', decodedToken);

    data.userInfo.role = getRole(decodedToken);

    return createResponse({
      success: true,
      data: data, // Response data for successful request
    });
  } catch (error: unknown) {
    console.error('Error during user info fetch:', error);
    return createErrorResponse(error);
  }
}
