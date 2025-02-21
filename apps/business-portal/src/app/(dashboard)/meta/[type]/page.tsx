'use server';

import MetaWidget from '@oxygen/business/widgets/meta-widget';

import { notFound } from 'next/navigation';
import { getAppBaseUrl } from '@oxygen/utils';

export default async function ReportPage(
  {
    params,
    searchParams,
  }: {
    params: Promise<{ type: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }) {
  const { type } = await params;
  const { id } = await searchParams;

  const baseUrl = await getAppBaseUrl();

  if (!id || typeof id !== 'string') {
    notFound();
  }

  // const response = await fetch(`${baseUrl}/api/auth/metabase`);

  const response = await fetch(`${baseUrl}/api/auth/metabase?type=${type}&id=${id}`, {
    cache: "no-store",
  });

  const data = await response.json();

  const reportUrl = data.url;

  if (!reportUrl) {
    notFound()
  }

  return <MetaWidget parentProps={{ reportUrl, params: { type, id } as any }} />;
}
