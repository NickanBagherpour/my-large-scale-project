import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { ActiveSelect } from './active-select/active-select';
import { useAppDispatch, useAppState } from '../../context';
import { FallbackSelect } from './fallback-select/fallback-select';

export type UpstreamTabModalType = {
  addService: boolean;
  removeService: boolean;
};

type UpstreamListType = PageProps & {
  //
};

export const UpstreamList: React.FC<UpstreamListType> = (props) => {
  //Hooks
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();

  //constants
  const isInitialized = state.upstreamTab.activeSelect.isInitialized;

  return <>{isInitialized ? <ActiveSelect /> : <FallbackSelect />}</>;
};
