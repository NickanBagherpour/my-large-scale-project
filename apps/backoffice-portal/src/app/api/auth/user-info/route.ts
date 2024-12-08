import { NextResponse } from 'next/server';

export async function GET(req) {
  // Get the authorization token from the request headers (assumed you set it in the headers)
  const token = req.headers.get('authorization');

  if (!token || !token.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, error: 'Authorization token is missing or invalid' }, { status: 400 });
  }

  const url = `${process.env.NEXT_PUBLIC_SSO_URL}/identity-user-manager/userInfo`;

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

    return NextResponse.json({
      success: true,
      userInfo: data,
    });
  } catch (error) {
    console.error('Error during user info fetch:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
