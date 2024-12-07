import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { code } = await req.json();

/*  if (process.env.NODE_ENV === 'development') {
    return new NextResponse(JSON.stringify({
      success: true, tokenData: {
        'last_logins': '[]',
        'token_type': 'bearer',
        'expires_in': 86400,
        'access_token': process.env.NEXT_PUBLIC_TOKEN,
      },
    }));
  }*/

  const url = `${process.env.NEXT_PUBLIC_SSO_URL}/identity/oauth2/auth/token`;
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${process.env.NEXT_PUBLIC_SSO_CLIENT_SECRET}`,
  };

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    redirect_uri: process.env.NEXT_PUBLIC_SSO_REDIRECT_URL,
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

    return new NextResponse(JSON.stringify({ success: true, tokenData: data }));
  } catch (error: any) {
    console.error('Error during SSO:', error);
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
