import React from 'react';
import { Box, MarkText } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { AdvanceGridCardPropsType } from '../../utils/advance-grid-card/type';
import { getStatusConfig } from '../../utils/advance-grid-card/consts';

import * as S from './advance-grid-card.style';
export const AdvanceGridCard = ({
  btnHandleClick,
  btnLoading,
  data,
  wordToHighlight = '',
}: AdvanceGridCardPropsType) => {
  const [t] = useTr();
  const { code } = data.submissionStatus;
  // Get the status configuration based on the code
  const { textColor, bankColor, bankIcon, businessColor, businessIcon, descriptionText, isBlack } =
    getStatusConfig(code);

  return (
    <S.Container>
      <S.Div>
        <S.Details>
          <S.Title>
            <MarkText highlightColor='success' wordToHighlight={wordToHighlight} text={data.clientName} />
          </S.Title>
          <S.SubTitle>{data.aggregatorName}</S.SubTitle>
          <S.IconTextWrapper>
            <i className='icon-calendar' />
            <S.Date>{data.createDate}</S.Date>
          </S.IconTextWrapper>
          <S.IconTextWrapper>
            <i className='icon-convertshape' />
            <S.ServiceCount>{`${data.serviceCount} ${t('advance_grid_card.on_demand_service')}`}</S.ServiceCount>
          </S.IconTextWrapper>
        </S.Details>
        <S.Status>
          <S.StatusContainer>
            <S.IconTop color={bankColor as S.ColorType}>{bankIcon}</S.IconTop>
            <S.Paragraph>{t('advance_grid_card.validation_commercial_banking')}</S.Paragraph>
          </S.StatusContainer>
          <Box flexGrow={1}>
            <S.LineUp color={bankColor as S.ColorType} />
            <S.LineDown color={businessColor as S.ColorType} />
          </Box>
          <S.StatusContainer>
            <S.IconButtom color={businessColor as S.ColorType} isBlack={isBlack}>
              {businessIcon}
            </S.IconButtom>
            <S.Paragraph>{t('advance_grid_card.business_unit')}</S.Paragraph>
          </S.StatusContainer>
        </S.Status>
      </S.Div>
      <S.Discription color={textColor as S.ColorType}>
        <span>{t('advance_grid_card.discription')}</span>
        {t(descriptionText)}
      </S.Discription>
      <S.Button variant='outlined' loading={btnLoading} onClick={() => btnHandleClick(data.submissionId)}>
        {t('button.view_request')}
      </S.Button>
    </S.Container>
  );
};
