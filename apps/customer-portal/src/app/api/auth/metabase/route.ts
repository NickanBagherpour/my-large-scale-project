import { NextRequest, NextResponse } from 'next/server';
import { signTokenForMetabase } from '@oxygen/utils';

export async function GET(request: NextRequest) {
  const METABASE_SITE_URL = process.env.METABASE_SITE_URL;
  const METABASE_SECRET_KEY = process.env.METABASE_SECRET_KEY ?? '';

  const payload = {
    resource: { dashboard: 10 },
    params: {
      client_id: [],
    },
    exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
  };

  const token = await signTokenForMetabase(payload, METABASE_SECRET_KEY);
  const metaConfig = 'background=false&bordered=false&titled=false&hide_parameters=client_id';
  // const iframeUrl = `${METABASE_SITE_URL}/public/question/${token}?search_term=نیکان#bordered=true&titled=false&hide_parameters=search_term`;
  const iframeUrl = `${METABASE_SITE_URL}/embed/dashboard/${token}#${metaConfig}`;

  return NextResponse.json({ url: iframeUrl });
}
