import { type NextRequest, NextResponse } from 'next/server';
import { signTokenForMetabase } from '@oxygen/utils';
import { CookieKey } from '@oxygen/types';

export async function GET(request: NextRequest) {
  const METABASE_SITE_URL = process.env.METABASE_SITE_URL;
  const METABASE_SECRET_KEY = process.env.METABASE_SECRET_KEY ?? '';

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const id = searchParams.get('id');
  const conf = request.cookies.get(CookieKey.CONFIG)?.value;

  console.log('config', conf);

  // Determine which dashboard to use based on the type
  let dashboardId;
  let params;
  switch (type) {
    case 'client':
      dashboardId = 10; // Replace with actual client dashboard ID
      params = {
        // client_id: [id],
        client_id: [],
      };
      break;
    case 'service':
      dashboardId = 11; // Replace with actual service dashboard ID
      params = {
        // client_id: [id],
        client_id: [],
      };
      break;
    default:
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  const payload = {
    resource: { dashboard: dashboardId },
    params: params,
    exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
  };

  const token = await signTokenForMetabase(payload, METABASE_SECRET_KEY);
  const metaConfig = 'background=false&bordered=false&titled=false&hide_parameters=client_id';
  const iframeUrl = `${METABASE_SITE_URL}/embed/dashboard/${token}#${metaConfig}`;

  return NextResponse.json({ url: iframeUrl });
}

