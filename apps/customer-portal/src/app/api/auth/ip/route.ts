import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const headersList = request.headers;

  const getIP = async (): Promise<string> => {
    const forwarded = headersList.get('x-forwarded-for');
    let ip: string | null = null;

    if (forwarded) {
      // X-Forwarded-For may contain multiple IPs, take the first one
      const ips = forwarded.split(',').map((ip) => ip.trim());
      console.log('X-Forwarded-For IPs:', ips);
      ip = ips[0];
    }

    if (!ip) {
      // Fallback to X-Real-IP or request.ip if available
      ip = headersList.get('x-real-ip') || request.ip || null;
      console.log('X-Real-IP or Request IP:', ip);
    }

    if (!ip) {
      return 'Unavailable';
    }

    // If the IP is IPv6-mapped IPv4, strip the IPv6 prefix
    if (ip.startsWith('::ffff:')) {
      ip = ip.replace('::ffff:', '');
    }

    return ip;
  };

  // Function to fetch server's public IP from ipify
  const getIP2 = async (): Promise<string> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      console.log('Server Public IP from ipify:', data.ip);
      return data.ip;
    } catch (error) {
      console.error('Error fetching IP from ipify:', error);
      return 'Error fetching IP from ipify';
    }
  };

  const clientIP = await getIP();
  const serverIP = await getIP2();

  return NextResponse.json({ ip: serverIP, ip2: clientIP });
}
