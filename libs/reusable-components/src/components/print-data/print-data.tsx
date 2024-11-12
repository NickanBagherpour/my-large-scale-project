import React, { Fragment } from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Icons } from '@oxygen/ui-kit';
import { dateLocale, uuid } from '@oxygen/utils';

// import { resetFormAction, useAppDispatch, useAppState } from '../../context';
import * as S from './print-data.style';

type PrintInfo = {
  header: string;
  items: {
    title?: string;
    value?: any;
    align?: string;
  }[];
};

type PrintSecuritiesProps = PageProps & {
  printInfo: any[];
  message?: string;
  icon?: string;
  isCompact?: boolean;
  date?: string;
  id?: string;
};

const PrintData: React.FC<PrintSecuritiesProps> = (props) => {
  const [t] = useTr();

  const { printInfo, icon = <i className='icon-check' />, message, isCompact = false, date, id } = props;

  return (
    <S.Wrapper isCompact={isCompact}>
      <div className='receipt-body'>
        <div className='receipt-top-header'>
          <S.LogoContainer>
            <Icons.BankLogo width={48} height={48} />
          </S.LogoContainer>

          <p>
            <span>{t('common.print_date')}</span>: <span dir='ltr'>{date ?? dateLocale()}</span>
          </p>
        </div>
        <div className='receipt-header'>{icon}</div>
        <p className='banner-result'>{message}</p>

        {printInfo.map((record) => (
          <Fragment key={uuid()}>
            <div className='title'>{record.header && <p>{record.header}</p>}</div>
            <div className='info-section'>
              {record.items.map((item) => (
                <div className='wrapper' key={uuid()}>
                  <div className='property-title'>{item.title ? item.title : '-'}</div>
                  <div className=' property-value'>{item.value ? item.value : '-'}</div>
                </div>
              ))}
            </div>
          </Fragment>
        ))}

        <div className='receipt-footer'>
          <p className='footer-item'>{t('print.actions_without_id_not_allowed')}</p>
          {id && (
            <p className='footer-item'>
              {t('print.unique_id')}: {id}
            </p>
          )}
        </div>
      </div>
    </S.Wrapper>
  );
};

export default PrintData;
