import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'styled-components';

import { Card, Form, Tooltip } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Button, Input, SearchItemsContainer, Icons } from '@oxygen/ui-kit';

import { requestRegistrationFormSchema } from '../../types';
import { FORM_ITEM, MAX_INPUTE_LENGTH, MAX_MOBILE_NUMBER_LENGTH } from '../../utils/consts';
import { updateFirstStepAction, useAppDispatch, useAppState } from '../../context';

import * as S from './fourth-step.style';

type FourthStepProps = PageProps & {
  setCurrentStep: (prev) => void;
};

const FourthStep: React.FC<FourthStepProps> = (props) => {
  const { setCurrentStep } = props;
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const theme = useTheme();

  const router = useRouter();
  const [form] = Form.useForm();

  const rule = createSchemaFieldRule(requestRegistrationFormSchema(t));

  const onFinish = (values) => {
    updateFirstStepAction(dispatch, values);
    setCurrentStep((perv) => perv + 1);
  };

  const handleReturn = () => {
    router.back();
  };

  return (
    <S.FourthStepContainer>
      <Form layout={'vertical'} onFinish={onFinish} form={form} initialValues={state.firstStep}>
        <S.TitleTxt className={'cards-title'}>
          {t('representative_info')}
          <S.TooltipContainer>
            <Tooltip color={theme.primary.main} title={t('tooTip_text')}>
              <S.IconWrapper>
                <Icons.InfoCircle />
              </S.IconWrapper>
            </Tooltip>
          </S.TooltipContainer>
        </S.TitleTxt>
        <Card>
          <SearchItemsContainer $columnNumber='3'>
            <Form.Item name={FORM_ITEM.persian_name} label={t('form.persian_name')} rules={[rule]}>
              <Input size='large' placeholder={`${t('placeholder.persian_name')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.mobile_number} label={t('form.mobile_number')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.mobile_number')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.Phone_number} label={t('form.Phone_number')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.Phone_number')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
          </SearchItemsContainer>
        </Card>
        <S.TitleTxt className={'cards-title'}>
          {t('technical_representative_info')}
          <S.TooltipContainer>
            <Tooltip color={theme.primary.main} title={t('tooTip_text')}>
              <S.IconWrapper>
                <Icons.InfoCircle />
              </S.IconWrapper>
            </Tooltip>
          </S.TooltipContainer>
        </S.TitleTxt>
        <Card>
          <SearchItemsContainer $columnNumber='3'>
            <Form.Item name={FORM_ITEM.technical_persian_name} label={t('form.persian_name')} rules={[rule]}>
              <Input size='large' placeholder={`${t('placeholder.persian_name')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.technical_mobile_number} label={t('form.mobile_number')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.mobile_number')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.technical_Phone_number} label={t('form.Phone_number')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.Phone_number')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
          </SearchItemsContainer>
        </Card>
        <S.TitleTxt className={'cards-title'}>ClientKey</S.TitleTxt>
        <Card>
          <S.AlertContainer description={t('clientKeyMessage')} />
          <SearchItemsContainer $columnNumber='2'>
            <Form.Item name={FORM_ITEM.clientKey} label='ClientKey' rules={[rule]}>
              <Input size='large' placeholder={'ClientKey'} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
          </SearchItemsContainer>
        </Card>
      </Form>
      <S.Footer>
        <Button variant={'outlined'} onClick={handleReturn}>
          {t('return')}
        </Button>
        <Button htmlType={'submit'} onClick={form.submit}>
          {t('submit_info')}
          <i className={'icon-arrow-left'}></i>
        </Button>
      </S.Footer>
    </S.FourthStepContainer>
  );
};

export default FourthStep;
