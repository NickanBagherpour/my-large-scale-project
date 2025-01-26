import React, { useState } from 'react';

import { Card, Form, Tooltip } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { useAppTheme } from '@oxygen/hooks';
import { Button, Input, SearchItemsContainer, Icons } from '@oxygen/ui-kit';

import { useSecondStepRequestRegistrationMutationQuery } from '../../services/representative-define-step/representative-define-step-data';
import { requestRegistrationFormSchema } from '../../types';
import { FORM_ITEM, MAX_INPUTE_LENGTH, MAX_MOBILE_NUMBER_LENGTH } from '../../utils/consts';
import { updateRepresentativeDefineStepAction, useAppDispatch, useAppState } from '../../context';

import * as S from './representative-define-step.style';

type RepresentativeDefineStepProps = PageProps & {
  setCurrentStep: (prev) => void;
};

const RepresentativeDefineStep: React.FC<RepresentativeDefineStepProps> = (props) => {
  const { setCurrentStep } = props;
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const theme = useAppTheme();

  const [form] = Form.useForm();

  const rule = createSchemaFieldRule(requestRegistrationFormSchema(t));

  const { mutate: secondMutate, isPending: SecondIsPending } = useSecondStepRequestRegistrationMutationQuery();

  const onFinish = (values) => {
    const params = {
      persian_name: values.persian_name,
      mobile_number: values.mobile_number,
      phone_number: values.phone_number,
      technical_persian_name: values.technical_persian_name,
      technical_mobile_number: values.technical_mobile_number,
      technical_Phone_number: values.technical_Phone_number,
      clientKey: values.clientKey,
      submissionId: state.submissionId,
    };
    secondMutate(params, {
      onSuccess: (data) => {
        console.log('request registration representative define step successful:', data);
        updateRepresentativeDefineStepAction(dispatch, values);
        setCurrentStep((perv) => perv + 1);
      },
      onError: (error) => {
        console.error('request registration representative define step  failed:', error);
      },
    });
  };

  const handleReturn = () => {
    setCurrentStep((perv) => perv - 1);
  };

  return (
    <S.RepresentativeStepContainer>
      <Form layout={'vertical'} onFinish={onFinish} form={form} initialValues={state.representativeDefineStep}>
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
              <Input placeholder={`${t('placeholder.mobile_number')}`} maxLength={MAX_MOBILE_NUMBER_LENGTH} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.phone_number} label={t('form.Phone_number')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.Phone_number')}`} maxLength={MAX_MOBILE_NUMBER_LENGTH} />
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
              <Input placeholder={`${t('placeholder.mobile_number')}`} maxLength={MAX_MOBILE_NUMBER_LENGTH} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.technical_Phone_number} label={t('form.Phone_number')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.Phone_number')}`} maxLength={MAX_MOBILE_NUMBER_LENGTH} />
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
        <Button htmlType={'submit'} loading={SecondIsPending} onClick={form.submit}>
          {t('submit_info')}
          <i className={'icon-arrow-left'}></i>
        </Button>
      </S.Footer>
    </S.RepresentativeStepContainer>
  );
};

export default RepresentativeDefineStep;
