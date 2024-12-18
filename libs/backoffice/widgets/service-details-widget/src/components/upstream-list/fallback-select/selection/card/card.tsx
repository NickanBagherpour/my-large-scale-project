import React, { useState } from 'react';

import { Loading } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { GridCard } from '@oxygen/reusable-components';

import * as S from './card.style';
import { updateUpstreamAction, useAppDispatch, useAppState } from '../../../../../context';
import { UpstreamContentData } from 'libs/backoffice/widgets/service-details-widget/src/types';
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
export const Card = (props: CardProps) => {
  const { cardData, loading } = props;

  const dispatch = useAppDispatch();
  const state = useAppState();

  const [clickedCard, setClickedCard] = useState('');

  const handleClick = (data) => {
    setClickedCard(data.id);
    updateUpstreamAction(dispatch, { ...state.upstreamTab.activeSelect, cardId: data.id });
  };
  return (
    <>
      {loading ? (
        <Loading style={{ height: '5rem', marginTop: '3rem' }} />
      ) : (
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
            />
          ))}
        </S.CardContainer>
      )}
    </>
  );
};
