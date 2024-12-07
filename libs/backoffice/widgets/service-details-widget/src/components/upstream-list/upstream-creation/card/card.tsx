import React, { useState } from 'react';

import { PageProps } from '@oxygen/types';
import { GridCard } from '@oxygen/reusable-components';

import * as S from './card.style';
import { Button, Loading } from '@oxygen/ui-kit';
export type CardProps = PageProps & {
  name?: string;
  description?: string;
  isActiveInTheService?: boolean;
  date?: string;
  wordToHighlight?: string;
  idx?: number;
  searchTerm?: string;
  activeServer?: number;
  cardData: any[];
  loading: boolean;
};
export const Card = (props: CardProps) => {
  const { cardData, loading } = props;
  const [clickedCard, setClickedCard] = useState('');

  return (
    <>
      {loading ? (
        <Loading style={{ height: '5rem', marginTop: '3rem' }} />
      ) : (
        <S.CardContainer>
          {cardData?.map((data, index) => (
            <GridCard
              activeServersCount={data.active_server}
              key={index}
              name={data.upstream_latin_name}
              status={data.is_server_active ? 'active' : 'inactive'}
              wordToHighlight=''
              href='#'
              isSetting={false}
              clickedCard={clickedCard}
              className={data.id}
              onClick={() => setClickedCard(data.id)}
            />
          ))}
        </S.CardContainer>
      )}
    </>
  );
};
