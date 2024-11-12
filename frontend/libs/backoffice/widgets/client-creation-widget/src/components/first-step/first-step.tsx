import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Card, Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Button, Chip, Input, SearchItemsContainer, Select, Switch } from '@oxygen/ui-kit';

import { createFormSchema } from '../../types';
import { useAppDispatch, useAppState } from '../../context';
import { FORM_ITEM, MAX_INPUTE_LENGTH } from '../../utils/consts';
import { initialValues } from '../../utils/first-step-initial-values';
import { useSelectDataQuery } from '../../services/first-step/get-select-data';
import { useGetnameTagDataQuery } from '../../services/first-step/get-name-tag-data';
import { useGetGrantTagDataQuery } from '../../services/first-step/get-gant-tag-data';

import * as S from './first-step.style';

type FirstStepProps = PageProps & {
  setCurrentStep: (prev) => void;
};

const FirstStep: React.FC<FirstStepProps> = (props) => {
  const { setCurrentStep } = props;
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const router = useRouter();
  const [form] = Form.useForm();

  const { data: grantTagData, isFetching: grantTagFetching } = useGetGrantTagDataQuery();
  const { data: NameTagData, isFetching: nameTagFetching } = useGetnameTagDataQuery();
  const { data: selectData, isFetching: selectFetching } = useSelectDataQuery();

  const [firstStepValues, setFirstStepValues] = useState(undefined);
  const [grantTags, setGrantTags] = useState([]);
  const [nameTags, setNameTags] = useState([]);
  const rule = createSchemaFieldRule(createFormSchema(t));
  const handleGrantTagChange = (values) => {
    setGrantTags(values);
  };
  const handleNameTagChange = (values) => {
    setNameTags(values);
  };
  const onFinish = (values) => {
    console.log('this is on finish:', values);
    setFirstStepValues({ ...values });
    setCurrentStep((perv) => perv + 1);
  };

  const handleGrantChipClose = (key) => {
    setGrantTags((prevTags) => prevTags.filter((tag: any) => tag.key !== key));
  };
  const handleNameChipClose = (key) => {
    setNameTags((prevTags) => prevTags.filter((tag: any) => tag.key !== key));
  };
  const handleReturn = () => {
    router.back();
  };

  form.setFieldValue('grant-tag', grantTags);
  form.setFieldValue('add-tag', nameTags);
  return (
    <S.FirstStepContainer>
      <Form layout={'vertical'} onFinish={onFinish} form={form} initialValues={firstStepValues}>
        <S.FirstForm>
          <S.TagPicker>
            <Form.Item className={'tag-input-grant-tag'} name={'grant-tag'}>
              <S.Select
                multiSelect={true}
                defaultValue={grantTags}
                menu={grantTagData}
                onChange={handleGrantTagChange}
                loading={grantTagFetching}
              >
                {t('form.grant_type')}
              </S.Select>
            </Form.Item>
            <div>
              {grantTags.map((tag: any) => (
                <Chip
                  tooltipTitle={tag}
                  key={tag.key}
                  type='active'
                  tooltipOnEllipsis={true}
                  closeIcon
                  onClose={() => handleGrantChipClose(tag.key)}
                >
                  {tag.label}
                </Chip>
              ))}
            </div>
          </S.TagPicker>

          <S.TagPicker>
            <Form.Item className={'tag-input-grant-tag'} name={'add-tag'}>
              <S.Select
                multiSelect={true}
                defaultValue={nameTags}
                menu={NameTagData}
                onChange={handleNameTagChange}
                loading={nameTagFetching}
              >
                {t('form.add_tags')}
              </S.Select>
            </Form.Item>
            <div>
              {nameTags.map((tag: any) => (
                <Chip
                  tooltipTitle={tag.label}
                  tooltipOnEllipsis={true}
                  closeIcon
                  type='active'
                  onClose={() => handleNameChipClose(tag.key)}
                >
                  {tag.label}
                </Chip>
              ))}
            </div>
          </S.TagPicker>
        </S.FirstForm>
        <S.TitleTxt className={'cards-title'}>{t('client_info')}</S.TitleTxt>
        <Card>
          <SearchItemsContainer>
            <Form.Item name={FORM_ITEM.latin_name_client} label={t('form.latin_name_client')} rules={[rule]}>
              <Input size='large' placeholder={`${t('placeholder.latin_name_client')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>

            <Form.Item name={FORM_ITEM.persian_name_client} label={t('form.persian_name_client')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.farsi_name_client')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.client_type} label={t('form.client_type')} rules={[rule]}>
              <Select
                size={'large'}
                options={selectData}
                loading={selectFetching}
                placeholder={`${t('placeholder.client_type')}`}
              ></Select>
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
            <Form.Item name={FORM_ITEM.aggregator} label={t('form.aggregator')} rules={[rule]}>
              <Select
                size={'large'}
                options={selectData}
                loading={selectFetching}
                placeholder={`${t('placeholder.Aggregator')}`}
              ></Select>
            </Form.Item>
          </SearchItemsContainer>
        </Card>
        <S.TitleTxt className={'cards-title'}>{t('applicant_info')}</S.TitleTxt>
        <Card>
          <SearchItemsContainer>
            <Form.Item name={FORM_ITEM.user_name} label={t('form.user_name')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.user_name')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.national_code} label={t('form.national_code')}>
              <Input placeholder={`${t('placeholder.national_code')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.organization_name} label={t('form.organization_name')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.organization_name')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.mobile_number} label={t('form.mobile_number')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.mobile_number')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.telephone} label={t('form.telephone')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.telephone')}`} maxLength={MAX_INPUTE_LENGTH} />
            </Form.Item>
            <Form.Item name={FORM_ITEM.email} label={t('form.email')} rules={[rule]}>
              <Input placeholder={`${t('placeholder.email')}`} maxLength={MAX_INPUTE_LENGTH} type='email' />
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

export default FirstStep;
