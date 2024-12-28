import { createResponse } from '@oxygen/types';

export async function GET(req: Request) {
  const token = req.headers.get('Authorization');
  // const token = cookies().get(CookieKey.SESSION_ID)?.value;
  const url = `${process.env.SSO_URL}/identity/oauth2/auth/session/validate`;

  if (!token) {
    return createResponse({ success: false, error: 'Token is missing', statusCode: 401 });
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log('🚀 ~ GET ~ response:', url, response.status, token ,response);

    if (!response.ok) {
      const errorData = await response.json();
      return createResponse({
        success: false,
        error: errorData.message || 'Invalid token',
        errorDetails: errorData,
        statusCode: response.status,
      });
    }

    return createResponse({ success: true });
  } catch (error: any) {
    return createResponse({
      success: false,
      error: 'Error during token validation',
      errorDetails: error.stack,
      statusCode: 500,
    });
  }
}
