import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Card, Form } from 'antd';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Box, Button, Chip, Input, SearchItemsContainer, Select, Switch, Dropdown, MenuItemType } from '@oxygen/ui-kit';

import { dropdownOptions, FormItem } from '../../utils/consts';
import { useAppDispatch, useAppState } from '../../context';

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

  const [grantTags, setGrantTags] = useState([]);
  const [nameTags, setNameTags] = useState([]);

  const handleGrantTagChange = (values) => {
    setGrantTags(values);
  };
  const handleNameTagChange = (values) => {
    setNameTags(values);
  };

  const onFinish = (values) => {
    console.log('this is on finish:', values);
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

  const handleSubmit = () => {
    form.submit();
  };
  form.setFieldValue('grant-tag', grantTags);
  form.setFieldValue('add-tag', nameTags);
  return (
    <S.FirstStepContainer>
      <Form layout={'vertical'} onFinish={onFinish} form={form}>
        <S.FirstForm>
          <S.TagPicker>
            <Form.Item className={'tag-input-grant-tag'} name={'grant-tag'}>
              <S.Select
                multiSelect={true}
                defaultValue={grantTags}
                menu={dropdownOptions}
                onChange={handleGrantTagChange}
                loading={false}
              >
                {t('form.grant_type')}
              </S.Select>
            </Form.Item>
            <div>
              {grantTags.map((tag: any) => (
                <Chip key={tag.key} type='active' closeIcon onClose={() => handleGrantChipClose(tag.key)}>
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
                menu={dropdownOptions}
                onChange={handleNameTagChange}
                loading={false}
              >
                {t('form.add_tags')}
              </S.Select>
            </Form.Item>
            <div>
              {nameTags.map((tag: any) => (
                <Chip key={tag.key} type='active' closeIcon onClose={() => handleNameChipClose(tag.key)}>
                  {tag.label}
                </Chip>
              ))}
            </div>
          </S.TagPicker>
        </S.FirstForm>
        <S.TitleTxt className={'cards-title'}>{t('client_info')}</S.TitleTxt>
        <Card>
          <SearchItemsContainer>
            <Form.Item
              name={FormItem.latin_name_client}
              label={t('form.latin_name_client')}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Input placeholder={'...'} size='large' />
            </Form.Item>

            <Form.Item
              name={FormItem.persian_name_client}
              label={t('form.persian_name_client')}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Input placeholder={'...'} />
            </Form.Item>
            <Form.Item
              name={FormItem.client_type}
              label={t('form.client_type')}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Select size={'large'} placeholder={'...'}></Select>
            </Form.Item>
            <Form.Item
              name={FormItem.client_id}
              label={t('form.client_id')}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Input placeholder={'...'} />
            </Form.Item>
            <Form.Item
              name={FormItem.identity_auth}
              label={t('form.identity_auth')}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Input placeholder={'...'} />
            </Form.Item>
            <Form.Item name={FormItem.website_url} label={t('form.website_url')}>
              <Input placeholder={'...'} />
            </Form.Item>
            <Form.Item
              name={FormItem.input_address}
              label={t('form.input_address')}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Input placeholder={'...'} />
            </Form.Item>
            <Form.Item
              name={FormItem.return_address}
              label={t('form.return_address')}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Input placeholder={'...'} />
            </Form.Item>
            <Form.Item
              name={FormItem.aggregator_status}
              className={'label-switch'}
              layout={'horizontal'}
              label={t('form.aggregator_status')}
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name={FormItem.aggregator}
              label={t('form.aggregator')}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Select size={'large'} placeholder={'...'}></Select>
            </Form.Item>
          </SearchItemsContainer>
        </Card>
        <S.TitleTxt className={'cards-title'}>{t('applicant_info')}</S.TitleTxt>
        <Card>
          <SearchItemsContainer>
            <Form.Item
              name={FormItem.user_name}
              label={t('form.user_name')}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Input placeholder={'...'} />
            </Form.Item>
            <Form.Item name={FormItem.national_code} label={t('form.national_code')}>
              <Input placeholder={'...'} />
            </Form.Item>
            <Form.Item
              name={FormItem.organization_name}
              label={t('form.organization_name')}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Input placeholder={'...'}></Input>
            </Form.Item>
            <Form.Item
              name={FormItem.mobile_number}
              label={t('form.mobile_number')}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Input placeholder={'...'} />
            </Form.Item>
            <Form.Item name={FormItem.telephone} label={t('form.telephone')}>
              <Input placeholder={'...'} />
            </Form.Item>
            <Form.Item name={FormItem.email} label={t('form.email')}>
              <Input placeholder={'...'} />
            </Form.Item>
          </SearchItemsContainer>
        </Card>
      </Form>
      <S.Footer>
        <Button variant={'outlined'} onClick={handleReturn}>
          {t('return')}
        </Button>
        <Button htmlType={'submit'} onClick={handleSubmit}>
          {t('submit_info')}
          <i className={'icon-arrow-left'}></i>
        </Button>
      </S.Footer>
    </S.FirstStepContainer>
  );
};

export default FirstStep;
