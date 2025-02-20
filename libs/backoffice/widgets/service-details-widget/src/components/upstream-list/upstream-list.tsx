import { redirect, useSearchParams } from 'next/navigation';

import { Nullable, PageProps } from '@oxygen/types';

import { ActiveSelect } from './active-select/active-select';

type UpstreamListType = PageProps & {
  //
};

export const UpstreamList: React.FC<UpstreamListType> = (props) => {
  const searchParams = useSearchParams();
  const serviceName: Nullable<string> = searchParams.get('servicename');
  if (!serviceName) {
    redirect('/not-found');
  }

  return <ActiveSelect serviceName={serviceName} />;
};

//checked
