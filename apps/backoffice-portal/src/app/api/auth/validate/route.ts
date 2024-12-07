import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { CookieKey } from '@oxygen/types';

export async function GET(req: Request) {
  const token = req.headers.get('Authorization');
  // const token = cookies().get(CookieKey.SESSION_ID)?.value;
  const url = `${process.env.NEXT_PUBLIC_SSO_URL}/identity/oauth2/auth/session/validate`;

  if (!token) {
    return NextResponse.json(
      { success: false, error: 'Token is missing' },
      { status: 401 } // Unauthorized if no token is provided
    );
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // Handle response failure (invalid token)
      const errorData = await response.json();
      const errorMessage = errorData?.message || 'Unknown error';
      return NextResponse.json(
        { success: false, error: errorMessage, errorDetails: errorData },
        { status: response.status }
      );
    }

    // Token is valid if the response is OK
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error during token validation:', error);
    return NextResponse.json(
      { success: false, error: 'Error during token validation', errorDetails: error.stack },
      { status: 500 } // Internal server error
    );
  }
}
