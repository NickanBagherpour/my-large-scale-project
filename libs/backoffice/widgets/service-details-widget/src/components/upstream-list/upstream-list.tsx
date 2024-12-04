import { useTr } from '@oxygen/translation';
import { InfoItemType, PageProps } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';

import { Initial } from './initial/initial';

import * as S from './upstream-list.style';

type UpstreamListType = PageProps & {
  //
};
export const UpstreamList: React.FC<UpstreamListType> = (props) => {
  //Hooks
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [t] = useTr();

  //constants
  const tableData = [];
  const isInitialized = state.upstreamTab.isInitialized;

  return <>{isInitialized ? <Initial /> : null}</>;
};
