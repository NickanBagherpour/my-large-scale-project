import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Card, Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Button, Chip, Input, SearchItemsContainer, Select, Switch } from '@oxygen/ui-kit';

import { requestFormSchema } from '../../types';
import { FORM_ITEM, MAX_INPUTE_LENGTH, MAX_MOBILE_NUMBER_LENGTH } from '../../utils/consts';
// import { useSelectDataQuery } from '../../services/first-step/get-select-data';
import { updateFirstStepAction, useAppDispatch, useAppState } from '../../context';
// import { useGetnameTagDataQuery } from '../../services/first-step/get-name-tag-data';
// import { useGetGrantTagDataQuery } from '../../services/first-step/get-gant-tag-data';

import * as S from './second-step.style';
import { number } from 'zod';

type SecondStepProps = PageProps & {
  setCurrentStep: (prev) => void;
};

const SecondStep: React.FC<SecondStepProps> = (props) => {
  const { setCurrentStep } = props;
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const router = useRouter();
  const [form] = Form.useForm();

  // const { data: grantTagData, isFetching: grantTagFetching } = useGetGrantTagDataQuery();
  // const { data: NameTagData, isFetching: nameTagFetching } = useGetnameTagDataQuery();
  // const { data: selectData, isFetching: selectFetching } = useSelectDataQuery();
  // const [grantTags, setGrantTags] = useState(state.firstStep.grant_tag);
  // const [nameTags, setNameTags] = useState(state.firstStep.add_tag);
  const rule = createSchemaFieldRule(requestFormSchema(t));

  // const handleGrantTagChange = (values) => {
  //   setGrantTags(values);
  // };

  // const handleNameTagChange = (values) => {
  //   setNameTags(values);
  // };
  const onFinish = (values) => {
    updateFirstStepAction(dispatch, values);
    setCurrentStep((perv) => perv + 1);
  };

  // const handleGrantChipClose = (key) => {
  //   setGrantTags((prevTags) => prevTags.filter((tag: any) => tag.key !== key));
  // };

  // const handleNameChipClose = (key) => {
  //   setNameTags((prevTags) => prevTags.filter((tag: any) => tag.key !== key));
  // };

  const handleReturn = () => {
    router.back();
  };
  // useEffect(() => {
  //   form.setFieldValue('grant_tag', grantTags);
  //   form.setFieldValue('add_tag', nameTags);
  // }, [grantTags, nameTags]);

  return (
    <S.FirstStepContainer>
      <Form layout={'vertical'} onFinish={onFinish} form={form} initialValues={state.firstStep}>
        <S.TitleTxt className={'cards-title'}>{t('client_info')}</S.TitleTxt>
        <Card>
          <SearchItemsContainer>
            <Form.Item name={FORM_ITEM.latin_name_client} label={t('form.latin_name_client')} rules={[rule]}>
              <Input size='large' placeholder={`${t('placeholder.latin_name_client')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>

            <Form.Item name={FORM_ITEM.persian_name_client} label={t('form.persian_name_client')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.farsi_name_client')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>

            <Form.Item name={FORM_ITEM.client_id} label={t('form.client_id')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.client_id')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.identity_auth} label={t('form.identity_auth')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.authentication_id')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.website_url} label={t('form.website_url')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.website_address')}`} maxLength={MAX_INPUTE_LENGTH} type='url' />
            </Form.Item>
            <Form.Item name={FORM_ITEM.input_address} label={t('form.input_address')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.input_address')}`} maxLength={MAX_INPUTE_LENGTH} type='url' />
            </Form.Item>
            <Form.Item name={FORM_ITEM.return_address} label={t('form.return_address')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.return_address')}`} maxLength={MAX_INPUTE_LENGTH} type='url' />
            </Form.Item>
            <Form.Item
              name={FORM_ITEM.aggregator_status}
              className={'label-switch'}
              layout={'horizontal'}
              label={t('form.aggregator_status')}
            >
              <Switch />
            </Form.Item>
          </SearchItemsContainer>
        </Card>
        <S.TitleTxt className={'cards-title'}>{t('applicant_info')}</S.TitleTxt>
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
    </S.FirstStepContainer>
  );
};

export default SecondStep;
