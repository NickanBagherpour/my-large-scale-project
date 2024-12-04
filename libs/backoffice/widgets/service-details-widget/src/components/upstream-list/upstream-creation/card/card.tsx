import React from 'react';

import { PageProps } from '@oxygen/types';
import { GridCard } from '@oxygen/reusable-components';

import * as S from './card.style';
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
};
export const Card = (props: CardProps) => {
  const {
    cardData,
    activeServer = 1,
    name = 'alireza',
    description = 'alire zaa aaaa aaa',
    isActiveInTheService = true,
    date = 'ghaffar',
    idx = 0,
    searchTerm = '',
  } = props;

  return (
    <S.CardContainer>
      {cardData.map((data, index) => (
        <GridCard
          activeServersCount={activeServer}
          key={index}
          name={description}
          englishName={name}
          status={isActiveInTheService ? 'active' : 'inactive'}
          date={date}
          wordToHighlight={searchTerm}
          href='#'
        />
      ))}
    </S.CardContainer>
  );
};
