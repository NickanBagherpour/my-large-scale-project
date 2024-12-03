import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { CookieKey } from '@oxygen/types';

export async function GET(req: Request) {
  const sessionTicket = cookies().get(CookieKey.SESSION_TICKET)?.value;
  const token = cookies().get(CookieKey.SESSION_ID)?.value;
  const url = `${process.env.NEXT_PUBLIC_SSO_URL}/identity/oauvth2/auth/session/signout?sessionTicket=${sessionTicket}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('ssssssssssssssssiiiiiiiiiiiiiiiiiggggggggnnnnnnnnnnnn', response);

    if (!response.ok) {
      throw new Error('Failed to fetch token');
    }
    const data = await response.json();
    console.log('Received token:', data);

    return new NextResponse(JSON.stringify({ success: true }));
  } catch (error: any) {
    console.error('Error during SSO:', error);
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
