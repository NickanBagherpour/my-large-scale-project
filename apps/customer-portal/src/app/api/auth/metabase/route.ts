import { NextRequest, NextResponse } from 'next/server';
import { signTokenForMetabase } from '@oxygen/utils';

export async function GET(request: NextRequest) {
  const METABASE_SITE_URL = process.env.METABASE_SITE_URL || 'http://uat.metabase.oxygenpro.ir';
  const METABASE_SECRET_KEY =
    process.env.METABASE_SECRET_KEY || '5b8e3ace607d464833f0a48d09c53b09598ac05fa307a99f5078c69fc1f0c044';

  const payload = {
    resource: { dashboard: 10 },
    params: {
      client_id: [],
    },
    exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
  };

  const token = await signTokenForMetabase(payload, METABASE_SECRET_KEY);

  // const iframeUrl = `${METABASE_SITE_URL}/public/question/${token}?search_term=نیکان#bordered=true&titled=false&hide_parameters=search_term`;
  const iframeUrl = `${METABASE_SITE_URL}/embed/dashboard/${token}#bordered=true&titled=false&hide_parameters=search_term`;

  return NextResponse.json({ url: iframeUrl });
}
