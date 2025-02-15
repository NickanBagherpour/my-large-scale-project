import React from 'react';

import { Chip, Tag } from '@oxygen/ui-kit';
import { getValueOrDash } from '@oxygen/utils';

import * as S from '../components/second-tab/modals/info-service-modal/info-service-modal.style';

export const renderChip = (tag) => (
  <Chip key={tag} tooltipTitle={tag.label} ellipsis={true} tooltipOnEllipsis={true} type='active'>
    <span>{tag}</span>
  </Chip>
);

export const renderTag = (tag: string) => (
  <Tag type={'processing'}>
    <S.Text copyable={{ text: tag, tooltips: ['', ''] }}>{getValueOrDash(tag)}</S.Text>
  </Tag>
);
