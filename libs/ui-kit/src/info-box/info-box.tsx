'use client';

import React, { CSSProperties } from 'react';

import { InfoItemType } from '@oxygen/types';
import { useTr } from '@oxygen/translation';

import { Box } from '../box/box';
import { Loading } from '../loading/loading';

import * as S from './info-box.style';

export type InfoBoxProps = {
  data: InfoItemType[] | null;
  footer?: React.ReactNode;
  isDense?: boolean;
  margin?: CSSProperties['margin'];
  minColumnCount?: number;
  titleWordWrap?: boolean;
  loading?: boolean;
};

export const InfoBox = (props: InfoBoxProps) => {
  const {
    data = [],
    footer,
    isDense = false,
    margin = '2rem 3.2rem',
    minColumnCount = 4,
    titleWordWrap = true,
    loading = false,
  } = props;

  const [t] = useTr();

  if (loading) {
    return (
      <S.InfoBoxWrapper min_col={1} margin={margin}>
        <div className={'fullwidth grid-item'}>
          <Loading />
        </div>
        {/* {footer && <Box className='info-box__footer'>{footer}</Box>} */}
      </S.InfoBoxWrapper>
    );
  }

  return (
    <S.InfoBoxWrapper dense={String(isDense)} margin={margin} min_col={minColumnCount} wrap={String(titleWordWrap)}>
      {data?.map((item: InfoItemType, index) => {
        return (
          <div key={index} className={`${item?.fullwidth ? 'fullwidth' : ''} grid-item`}>
            <Box className='info-box__title'>{t(item.key)}</Box>
            {item.type !== 'file' ? (
              <Box className={'info-box__value-wrapper'}>
                <span className='info-box__value'>{item.value}</span>
                <span className='info-box__sub-value'>{item.subValue}</span>
              </Box>
            ) : (
              <span className='info-box__files'>{item.files.map((subItem, index) => subItem)}</span>
            )}
          </div>
        );
      })}
      {footer && <Box className='info-box__footer'>{footer}</Box>}
    </S.InfoBoxWrapper>
  );
};
