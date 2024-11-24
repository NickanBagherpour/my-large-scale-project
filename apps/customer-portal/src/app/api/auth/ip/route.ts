import { NextRequest, NextResponse, userAgent } from 'next/server';
import requestIp from 'request-ip';
import { headers } from 'next/headers';

export async function GET(request: NextRequest) {
  // Create a new response object for request-ip
  // const req = {
  //   headers: Object.fromEntries(request.headers), // Convert headers to a plain object
  //   connection: { remoteAddress: request.ip },
  // } as any;

  // Use request-ip middleware to get client IP
  // requestIp.mw()(req, {} as any, () => {});

  const ip = requestIp.getClientIp(request) || '127.0.0.1'; // Fallback if no IP is found
  const ip2 = headers().get('x-forwarded-for');
  // const userAgent = userAgent(request);

  // const detectedIp = requestIp.getClientIp(req)

  // Return the IP address as a JSON response
  return NextResponse.json({ ip, ip2 });
}
