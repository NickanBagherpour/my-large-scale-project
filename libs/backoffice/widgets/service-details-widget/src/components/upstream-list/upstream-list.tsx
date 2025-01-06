import { redirect, useRouter, useSearchParams } from 'next/navigation';

import { useTr } from '@oxygen/translation';
import { Nullable, PageProps } from '@oxygen/types';

import { ActiveSelect } from './active-select/active-select';
import { useAppDispatch, useAppState } from '../../context';
import { FallbackSelect } from './fallback-select/fallback-select';
import { Button } from '@oxygen/ui-kit';
import router from 'next/router';
import { ROUTES } from '@oxygen/utils';
export type UpstreamTabModalType = {
  addService: boolean;
  removeService: boolean;
};

type UpstreamListType = PageProps & {
  //
};

export const UpstreamList: React.FC<UpstreamListType> = (props) => {
  //Hooks
  const searchParams = useSearchParams();
  const servicename: Nullable<string> = searchParams.get('servicename');
  if (!servicename) {
    redirect('/not-found');
  }
  const params = servicename;
  const router = useRouter();
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();

  //constants
  const isInitialized = state.upstreamTab.activeSelect.isInitialized;

  return (
    <>
      <div className='service-technical-details'>
        <h3>{t('upstream')}</h3>
        <div className='btn-group'>
          <Button
            type={'primary'}
            color='primary'
            variant='filled'
            icon={<i className='icon-clock' />}
            onClick={() => router.push(`${ROUTES.BACKOFFICE.UPSTREAM_HISTORY}?id=${servicename}&type=service`)}
          >
            {t('see_changes_history')}
          </Button>
        </div>
      </div>

      {isInitialized ? <ActiveSelect /> : <FallbackSelect />}
    </>
  );
};
