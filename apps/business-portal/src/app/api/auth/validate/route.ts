import { createResponse, createErrorResponse } from '@oxygen/utils';

export async function GET(req: Request) {
  const token = req.headers.get('Authorization'); // token with Bearer
  // const token = cookies().get(CookieKey.SESSION_ID)?.value; // token without Bearer
  const url = `${process.env.SSO_URL}/identity/oauth2/auth/session/validate`;

  if (!token) {
    return createErrorResponse(null, { error: 'Token is missing', statusCode: 401 });
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    });

    // console.log('🚀 ~ GET ~ response:', url, response.status, token ,response);

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
