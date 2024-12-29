import React from 'react';

import * as S from './advance-grid-card.style';
import { Button } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { text } from 'stream/consumers';

interface SubmissionStatus {
  code: number;
  title: string;
}

interface Request {
  requestId: number;
  createDate: string; // Use 'string' if storing as text, or consider Date if parsed.
  creator: number;
  modifier: number;
  trackCode: string;
  submissionStatus: SubmissionStatus;
  organizationId: number;
  organizationName: string;
  clientName: string;
  permissionUserId: number;
  aggregatorName: string;
  serviceCount: number;
}

export type AdvanceGridCardPropsType = {
  children?: React.ReactNode;
  btnHandleClick: () => void;
  btnLoading: boolean;
  data: Request;
};
export const AdvanceGridCard = (props: AdvanceGridCardPropsType) => {
  const { children, btnHandleClick, btnLoading, data } = props;
  //hooks
  const [t] = useTr();

  let textColor;
  let businessColor;
  let businessIcone;
  let bankColor;
  let bankIcone;
  let discriptionText;

  const code = data.submissionStatus.code;
  switch (code) {
    case 2: {
      textColor = 'warning';
      businessColor = 'default';
      businessIcone = <i className='icon-close' />;
      bankColor = 'warning';
      bankIcone = <i className='icon-close' />;
      discriptionText = 'advance_grid_card.2';
      break;
    }
    case 3: {
      textColor = 'error';
      bankColor = 'error';
      bankIcone = <i className='icon-close' />;
      businessColor = 'default';
      businessIcone = <i className='icon-close' />;
      discriptionText = 'advance_grid_card.3';
      break;
    }
    case 4: {
      textColor = 'warning';
      bankColor = 'success';
      bankIcone = <i className='icon-checkmark' />;
      businessColor = 'warning';
      businessIcone = <i className='icon-close' />;
      discriptionText = 'advance_grid_card.4';
      break;
    }
    case 5: {
      textColor = 'warning';
      bankColor = 'success';
      bankIcone = <i className='icon-checkmark' />;
      businessColor = 'warning';
      businessIcone = <i className='icon-close' />;
      discriptionText = 'advance_grid_card.5';
      break;
    }
    case 6: {
      textColor = 'error';
      bankColor = 'success';
      bankIcone = <i className='icon-checkmark' />;
      businessColor = 'warning';
      businessIcone = <i className='icon-close' />;
      discriptionText = 'advance_grid_card.6';
      break;
    }
    case 7: {
      textColor = 'success';
      bankColor = 'success';
      bankIcone = <i className='icon-checkmark' />;
      businessColor = 'success';
      businessIcone = <i className='icon-checkmark' />;
      discriptionText = 'advance_grid_card.7';
      break;
    }
    // Add more cases as needed
    default: {
      // Optional: Handle cases where no match is found
      textColor = 'default';
      businessColor = 'default';
      businessIcone = '-';
      bankColor = 'default';
      bankIcone = '-';
      discriptionText = '-';
    }
  }

  return (
    <S.Container>
      <S.Divider>
        <S.Details>
          <S.Title>{data.clientName}</S.Title>
          <S.SubTitle>{data.aggregatorName}</S.SubTitle>
          <S.Date>{data.createDate}</S.Date>
          <S.ServiceCount>{`${data.serviceCount}${t('advance_grid_card.on_demand_service')}`}</S.ServiceCount>
        </S.Details>
        <S.Status>ghaffar</S.Status>
      </S.Divider>
      <S.Discription color={textColor}>
        <span>{t('advance_grid_card.discription')}</span>
        {t(discriptionText)}
      </S.Discription>
      <S.Button variant='outlined' loading={btnLoading} onClick={btnHandleClick}>
        {t('button.view_request')}
      </S.Button>
    </S.Container>
  );
};
