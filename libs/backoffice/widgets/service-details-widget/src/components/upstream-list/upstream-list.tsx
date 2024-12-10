import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { Initial } from './initial/initial';
import { useAppDispatch, useAppState } from '../../context';
import { UpstreamCreation } from './upstream-creation/upstream-creation';

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

  return <>{isInitialized ? <Initial /> : <UpstreamCreation />}</>;
};
