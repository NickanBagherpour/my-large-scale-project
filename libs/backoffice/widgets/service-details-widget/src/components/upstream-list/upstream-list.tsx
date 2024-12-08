import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { ActiveSelect } from './active-select/active-select';
import { useAppDispatch, useAppState } from '../../context';
import { UpstreamSelection } from './fallback-select/upstream-selection';

type UpstreamListType = PageProps & {
  //
};
export const UpstreamList: React.FC<UpstreamListType> = (props) => {
  //Hooks
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();

  //constants
  const isInitialized = state.upstreamTab.isInitialized;

  return <>{isInitialized ? <ActiveSelect /> : <UpstreamSelection />}</>;
};
