import React, { CSSProperties } from 'react';
import { InfoItemType } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { Box } from '../box/box';
import * as S from './info-box.style';
import { Tag } from 'antd';

type InfoBoxProps = {
  data: InfoItemType[] | null;
  footer?: React.ReactNode;
  isDense?: boolean;
  margin?: CSSProperties['margin'];
  minColumnCount?: number;
  titleWordWrap?: boolean;
};

export const InfoBox = (props: InfoBoxProps) => {
  const {
    data = [],
    footer,
    isDense = false,
    margin = '2rem 3.2rem',
    minColumnCount = 1,
    titleWordWrap = true,
  } = props;

  const [t] = useTr();

  return (
    <S.InfoBoxWrapper dense={isDense} margin={margin} min_col={minColumnCount} wrap={titleWordWrap}>
      {data?.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <div>
              <Box className='info-box__title'>{t(item.key)} :</Box>
              {item.type !== 'file' ? (
                <Box className='info-box__value-wrapper'>
                  {item.roundedText ? (
                    <Tag bordered={false}>{item.value}</Tag>
                  ) : (
                    <>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        {item.startIcon && <span className='info-box__icon'>{item.startIcon}</span>}{' '}
                        <span className='info-box__value'>{item.value}</span>
                      </div>
                      <span className='info-box__sub-value'>{item.subValue}</span>
                    </>
                  )}
                </Box>
              ) : (
                <span className='info-box__files'>
                  {item.files.map((subItem, subIndex) => (
                    <span key={subIndex}>{subItem}</span>
                  ))}
                </span>
              )}
            </div>
          </React.Fragment>
        );
      })}
      {footer && <Box className='info-box__footer'>{footer}</Box>}
    </S.InfoBoxWrapper>
  );
};
