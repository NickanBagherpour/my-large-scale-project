import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join('/');
  const url = new URL(request.url);
  const forwardUrl = `${url.origin}/api/v1/${path}`;


  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa get', path);
  // Forward the request to the actual API
  const response = await fetch(forwardUrl, {
    method: request.method,
    headers: request.headers,
  });

  return NextResponse.json(await response.json(), {
    status: response.status,
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  // Similar implementation as GET, but handle POST data
  const path = params.path.join('/');
  const url = new URL(request.url);
  const forwardUrl = `${url.origin}/api/v1/${path}`;


  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa post', path);


  const response = await fetch(forwardUrl, {
    method: request.method,
    headers: request.headers,
    body: await request.text(),
  });

  return NextResponse.json(await response.json(), {
    status: response.status,
  });
}

// Implement other HTTP methods (PUT, DELETE, etc.) as needed
