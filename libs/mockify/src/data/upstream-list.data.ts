import { UpstreamType } from '@oxygen/types';

const englishNames = [
  'API-SERVICES-UPSTREAM',
  'USER-SERVICES-UPSTREAM',
  'PAYMENT-SERVICES-UPSTREAM',
  'DATA-SERVICES-UPSTREAM',
  'AUTH-SERVICES-UPSTREAM',
];

export const upstreamsList: UpstreamType[] = Array.from({ length: 43 }).map((_, index) => ({
  id: index + 1, // Auto-generated ID starting from 1
  name: englishNames[Math.floor(Math.random() * englishNames.length)],
  description: 'سمات آی تی',
  activeServers: Math.floor(Math.random() * 33),
}));
