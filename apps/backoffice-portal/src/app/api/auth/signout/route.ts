import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { CookieKey } from '@oxygen/types';

export async function GET(req: Request) {
  const sessionTicket = cookies().get(CookieKey.SESSION_TICKET)?.value;
  const token = cookies().get(CookieKey.SESSION_ID)?.value;
  const url = `${process.env.NEXT_PUBLIC_SSO_URL}/identity/oauth2/auth/session/signout?sessionTicket=${sessionTicket}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('External SSO response:', response);

    // Check if the external response was not okay
    if (!response.ok) {
      // Parse the response body to get the error message (if any)
      const errorData = await response.json();
      const errorMessage = errorData?.message || 'Unknown error';

      // Return the external error status code with additional property
      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
          errorDetails: errorData // Add any extra data you want here
        },
        { status: response.status } // Set the response status to match the external service
      );
    }

    // const data = await response.json();
    console.log('Signout done');

    return new NextResponse(JSON.stringify({ success: true }));
  } catch (error) {
    console.error('Error during signout:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      errorDetails: error.stack // You can customize this part as needed
    }, { status: 500 });
  }
}
