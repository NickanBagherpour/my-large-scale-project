export const drafts = [
  { name: 'svc-mgmt-sapta-bale-mob-birthdate', level: 2, id: 1 },
  { name: 'customer-account-info', level: 3, id: 2 },
] as const;

export type Service = {
  name: string;
  persianName: string;
  scope: string;
  url: string;
  version: string;
  status: boolean;
};

export const servicesList: Service[] = [
  {
    name: 'mohsen',
    persianName: 'محسن',
    scope: 'test',
    url: 'http://locale.com',
    version: 'v1',
    status: false,
  },
  {
    name: 'ali',
    persianName: 'علی',
    scope: 'bug',
    url: 'http://locale.com',
    version: 'v1',
    status: true,
  },
  {
    name: 'amir',
    persianName: 'امیر',
    scope: 'feat',
    url: 'http://locale.com',
    version: 'v1',
    status: false,
  },
];
