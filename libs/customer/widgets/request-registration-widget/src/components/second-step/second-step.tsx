import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Card, Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Button, Chip, Input, SearchItemsContainer, Select, Switch } from '@oxygen/ui-kit';

import { requestFormSchema } from '../../types';
import { FORM_ITEM, MAX_INPUTE_LENGTH, MAX_MOBILE_NUMBER_LENGTH } from '../../utils/consts';
import { useSelectDataQuery } from '../../services/first-step/get-select-data';
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
  const { data: selectData, isFetching: selectFetching } = useSelectDataQuery();
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
        <S.TitleTxt className={'cards-title'}>{t('register_info')}</S.TitleTxt>
        <Card>
          <SearchItemsContainer>
            <Form.Item name={FORM_ITEM.legal_person_name} label={t('form.legal_person_name')} rules={[rule]}>
              <Input size='large' placeholder={`${t('placeholder.legal_person_name')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>

            <Form.Item name={FORM_ITEM.legal_person_type} label={t('form.legal_person_type')} rules={[rule]}>
              {/* <Input placeholder={`${t('placeholder.legal_person_type')}`} maxLength={MAX_INPUTE_LENGTH} /> */}
              <Select
                size={'large'}
                options={selectData}
                loading={selectFetching}
                placeholder={`${t('placeholder.legal_person_type')}`}
              ></Select>
            </Form.Item>

            <Form.Item name={FORM_ITEM.registration_number} label={t('form.registration_number')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.registration_number')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.registration_date} label={t('form.registration_date')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.registration_date')}`} maxLength={MAX_INPUTE_LENGTH} type='date' />
            </Form.Item>
            <Form.Item name={FORM_ITEM.national_id} label={t('form.national_id')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.national_id')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.economy_code} label={t('form.economy_code')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.economy_code')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.activity_field} label={t('form.activity_field')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.activity_field')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.postal_code} label={t('form.postal_code')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.postal_code')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.phone} label={t('form.phone')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.phone')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
            <Form.Item
              className='span-4'
              name={FORM_ITEM.last_registration_address}
              label={t('form.last_registration_address')}
              rules={[rule]}
            >
              <Input placeholder={`${t('placeholder.last_registration_address')}`} maxLength={MAX_INPUTE_LENGTH} />
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
    </S.FirstStepContainer>
  );
};

export default SecondStep;
