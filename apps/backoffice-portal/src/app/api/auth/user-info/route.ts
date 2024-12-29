import { createResponse, JwtPayload } from '@oxygen/types';
import Mockify from '@oxygen/mockify';
import { decodeJWT, ENV_CONSTANTS } from '@oxygen/utils';

export async function GET(req) {
  // Get the authorization token from the request headers (assumed you set it in the headers)
  const token = req.headers.get('authorization');

  if (ENV_CONSTANTS.IS_DEMO /*ENV_CONSTANTS.IS_DEV && !ENV_CONSTANTS.DEV_WITH_SSO*/) {
    return createResponse({
      success: true,
      data: (await Mockify.getUserProfile()).data,
    });
  }

  if (!token || !token.startsWith('Bearer ')) {
    return createResponse({
      success: false,
      error: 'Authorization token is missing or invalid',
      statusCode: 400, // Bad Request
    });
  }

  const url = `${process.env.SSO_URL}/identity-user-manager/userInfo`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: token, // Passing the token in the authorization header
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    const data = await response.json();

    const decodedToken = decodeJWT(token);

    data.userInfo.role = decodedToken?.payload?.role;

    return createResponse({
      success: true,
      data: data, // Response data for successful request
    });
  } catch (error: any) {
    console.error('Error during user info fetch:', error);
    return createResponse({
      success: false,
      error: error.message,
      errorDetails: error.stack, // Optional: Provide error details for debugging
      statusCode: 500, // Internal Server Error
    });
  }
}

function getRole(decodedToken: JwtPayload | null): string | null {
  if (decodedToken?.role) {
    return decodedToken.role?.replace(`${process.env.SSO_CLIENT_KEY}-`, '');
  }

  return null;
}
