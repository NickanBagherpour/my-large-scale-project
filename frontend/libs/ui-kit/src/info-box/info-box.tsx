import { uuid } from '@oxygen-portal/utils';
import React, { ReactNode } from 'react';

import * as S from './info-box.style';
import { BasicComponentProps, Nullable } from '@oxygen-portal/types';
import { Box } from '../index';

export type InfoBoxItem = {
  title?: ReactNode;
  value?: ReactNode;
  fullWidth?: boolean;
  error?: boolean;
};

export type InfoBoxProps = BasicComponentProps & {
  bordered?: boolean;
  data?: Nullable<InfoBoxItem[]>;
  footer?: ReactNode;
  columnsCount?: number;
  sideItem?: any;
};

export const InfoBox: React.FC<InfoBoxProps> = (props) => {
  const { bordered = true, data, footer, columnsCount = 3, ...rest } = props;

  if (!data || data?.length === 0) {
    return <></>;
  }

  return (
    <S.InfoBoxWrapper bordered={bordered} cols={columnsCount} {...rest}>
      <Box className={'infobox__container'}>
        {props.sideItem}

        <div className='infobox__data-container'>
          {data?.map((item, index) => {
            return (
              <div className={`infobox__item ${item.fullWidth ? 'infobox__item--full' : ''}`} key={uuid(index)}>
                {item.title && <span className='infobox__item__title'>{item.title}</span>}
                <span className='infobox__item__value'>
                  {
                    item.error ?
                      <i className={'icon-info-noback error-icon'} /> : item.value
                  }
                </span>
              </div>
            );
          })}
        </div>
      </Box>

      {footer && <div className='infobox__footer'>{footer}</div>}
    </S.InfoBoxWrapper>
  );
};

// export default InfoBox;
