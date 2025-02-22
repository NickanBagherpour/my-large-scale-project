import React, { useEffect, useState } from 'react';

import { Loading } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { GridCard } from '@oxygen/reusable-components';

import { UpstreamContentData } from 'libs/backoffice/widgets/service-details-widget/src/types';

import { updateUpstreamAction, useAppDispatch, useAppState } from '../../../../../context';

import * as S from './cards.style';

export type CardProps = PageProps & {
  name?: string;
  description?: string;
  isActiveInTheService?: boolean;
  date?: string;
  wordToHighlight?: string;
  idx?: number;
  searchTerm?: string;
  activeServer?: number;
  cardData: UpstreamContentData[] | undefined;
  loading: boolean;
};
export const Cards = (props: CardProps) => {
  const { cardData, loading, wordToHighlight } = props;

  const dispatch = useAppDispatch();
  const state = useAppState();

  const [clickedCard, setClickedCard] = useState('');

  useEffect(() => {
    if (!state.upstreamTab.activeSelect.cardId) {
      setClickedCard('');
    }
  }, [state.upstreamTab.activeSelect]);

  const handleClick = (data) => {
    setClickedCard(data.id);
    updateUpstreamAction(dispatch, { ...state.upstreamTab.activeSelect, cardId: data.name });
  };

  return (
    <Loading spinning={loading}>
      <S.CardContainer>
        {cardData?.map((data, index) => (
          <GridCard
            serversCount={data.activeServerCount}
            key={index}
            title={data.name}
            status={data.activeServerCount !== 0 ? 'active' : 'inactive'}
            hasSetting={false}
            isSelected={+clickedCard === data.id}
            onClick={() => handleClick(data)}
            isHeaderLtr={true}
            wordToHighlight={wordToHighlight}
          />
        ))}
      </S.CardContainer>
    </Loading>
  );
};
