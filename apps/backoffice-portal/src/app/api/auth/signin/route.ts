import { createResponse } from '@oxygen/types';
import { ENV_CONSTANTS } from '@oxygen/utils';

export async function POST(req: Request) {
  const { code } = await req.json();

  if (ENV_CONSTANTS.IS_DEMO /*ENV_CONSTANTS.IS_DEV && !ENV_CONSTANTS.DEV_WITH_SSO*/) {
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

  const url = `${process.env.SSO_URL}/identity/oauth2/auth/token`;

  const basicToken = Buffer.from(`${process.env.NEXT_PUBLIC_SSO_CLIENT_KEY}:${process.env.SSO_CLIENT_SECRET}`).toString('base64');

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${basicToken}`,
  };

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    redirect_uri: process.env.SSO_REDIRECT_URL,
    code,
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch token');
    }
    const data = await response.json();

    return createResponse({ success: true, data });
  } catch (error: any) {
    console.error('Error during SSO:', error);
    return createResponse({ success: false, error: error.message, errorDetails: error.stack, statusCode: 500 });
  }
}
