import { scopeHistoryData } from '@oxygen/types';
import { upstreamCardData } from './data/upstream-card.data';

export type UpstreamCardDetailsType = {
  upstream_latin_name: string;
  id: string;
  active_server: string;
  is_server_active: boolean;
};

export const UpstreamCardDetails = async () => {
  return new Promise<{ data: { content: UpstreamCardDetailsType[] } }>((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: { content: upstreamCardData } });
    }, 700);
  });
};
