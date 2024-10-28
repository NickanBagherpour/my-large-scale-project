import React, { useState } from 'react';
import { z } from 'zod';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';

import { useAppDispatch, useAppState } from '../../context';
//import { useGetReportDataQuery } from '../../services';
import * as S from './first-step.style';
import { Form } from 'antd';
import { Button, Chip, Input, SearchItemsContainer, Select, Switch, TagInput } from '@oxygen/ui-kit';

import { useGetGrantTypeQuery } from '../../services/get-grant-type.api';
import { useGetTags } from '../../services/get-tag-info.api';

type FirstStepProps = PageProps & {
  //
};

const FirstStep: React.FC<FirstStepProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const [form] = Form.useForm();
  const [grantTypeState, setGrantTypeState] = useState<any>([]);
  const [tagsState, setTagsState] = useState<any>([]);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  const { data: grantType } = useGetGrantTypeQuery();

  const { data: tags } = useGetTags();

  const FormItem = {
    latin_name_client: 'latin_name_client',
    persian_name_client: 'persian_name_client',
    client_type: 'client_type',
    client_id: 'client_id',
    identity_auth: 'identity_auth',
    website_url: 'website_url',
    input_address: 'input_address',
    return_address: 'return_address',
    aggregator_status: 'aggregator_status',
    aggregator: 'aggregator',
    user_name: 'user_name',
    national_code: 'national_code',
    organization_name: 'organization_name',
    mobile_number: 'mobile_number',
    telephone: 'telephone',
    email: 'email',
  };

  const formSchema = z.object({
    [FormItem.latin_name_client]: z.string(),
    [FormItem.persian_name_client]: z.string(),
    [FormItem.client_type]: z.string(),
    [FormItem.client_id]: z.string(),
    [FormItem.identity_auth]: z.string(),
    [FormItem.website_url]: z.string(),
    [FormItem.input_address]: z.string(),
    [FormItem.return_address]: z.string(),
    [FormItem.aggregator_status]: z.boolean().optional(),
    [FormItem.aggregator]: z.string(),
  });

  type FormValues = z.infer<typeof formSchema>;

  const grantTypeData = grantType?.content ?? [];

  const tagsData = tags?.content ?? [];

  const onFinish = async (values) => {
    try {
      const values = await form.validateFields();
      const parsedValues = formSchema.parse(values);

      setErrors({});
      console.log(values);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const zodErrors = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {} as { [key: string]: string });
        setErrors(zodErrors);
      }
    }
  };

  const handleGrantTypeChange = (value: string, e) => {
    e.stopPropagation(); // Prevent dropdown from closing
    e.preventDefault(); // Prevent default behavior
    setGrantTypeState((prev) => {
      const existingItem = prev.find((item) => item.value === value);
      if (existingItem) {
        return prev.filter((item) => item.value !== value);
      } else {
        const optionToAdd = grantTypeData.find((option) => option.value === value);
        return optionToAdd ? [...prev, { label: optionToAdd.label, value }] : prev;
      }
    });
  };

  const handleTagsChange = (value: string, e) => {
    e.stopPropagation(); // Prevent dropdown from closing
    e.preventDefault(); // Prevent default behavior
    setTagsState((prev) => {
      const existingItem = prev.find((item) => item.value === value);
      if (existingItem) {
        return prev.filter((item) => item.value !== value);
      } else {
        const optionToAdd = tagsData.find((option) => option.value === value);
        return optionToAdd ? [...prev, { label: optionToAdd.label, value }] : prev;
      }
    });
  };

  const options = [
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'Yiminghe', label: 'yiminghe' },
    { value: 'disabled', label: 'Disabled', disabled: true },
  ];

  const otherOption = [
    {
      value: 'jack',
      label: 'Jack (100)',
    },
    {
      value: 'lucy',
      label: 'Lucy (101)',
    },
  ];

  return (
    <S.FirtStepContainer>
      <div className={'form_wrapper'}>
        <p className={'cards-title'}>{t('edit_client_info')}</p>
        <Form layout={'vertical'} onFinish={onFinish} form={form}>
          <div className={'grid'}>
            <div className='item1'>
              <Form.Item name='grantType' className={'drop_down_input'}>
                <TagInput
                  buttonCaption={t('form.grant_type')}
                  options={grantTypeData}
                  multiSelect={true}
                  handleCheckboxChange={handleGrantTypeChange}
                  setCheckedItems={setGrantTypeState}
                  checkedItems={grantTypeState}
                />
              </Form.Item>
            </div>
            <span className={'line'}></span>
            <div className='item2'>
              {grantTypeState.map((item, index) => (
                <Chip type={'active'} className={'tags'} closeIcon={<i className={'icon-close style-icon'}></i>}>
                  {item.label}
                </Chip>
              ))}
            </div>
          </div>
          <div className={'grid'}>
            <div className='item1'>
              <Form.Item name='tags' className={'drop_down_input'}>
                <TagInput
                  buttonCaption={t('form.add_tags')}
                  options={tagsData}
                  multiSelect={true}
                  handleCheckboxChange={handleTagsChange}
                  setCheckedItems={setTagsState}
                  checkedItems={tagsState}
                />
              </Form.Item>
            </div>
            <span className={'line'}></span>
            <div className='item2'>
              {tagsState.map((item, index) => (
                <Chip type={'active'} className={'tags'} closeIcon={<i className={'icon-close style-icon'}></i>}>
                  {item.label}
                </Chip>
              ))}
            </div>
          </div>

          <SearchItemsContainer>
            <Form.Item
              name={FormItem.latin_name_client}
              validateStatus={errors.latin_name_client ? 'error' : ''}
              help={errors.latin_name_client}
              label={t('form.latin_name_client')}
            >
              <Input placeholder={'app-bale'} />
            </Form.Item>
            <Form.Item
              validateStatus={errors.persian_name_client ? 'error' : ''}
              help={errors.persian_name_client}
              name={FormItem.persian_name_client}
              label={t('form.persian_name_client')}
            >
              <Input placeholder={t('placeholder.client_bale')} />
            </Form.Item>
            <Form.Item
              name={FormItem.client_type}
              validateStatus={errors.client_type ? 'error' : ''}
              help={errors.client_type}
              label={t('form.client_type')}
            >
              <Select size={'large'} placeholder={t('placeholder.credit_system')} options={otherOption}></Select>
            </Form.Item>
            <Form.Item
              name={FormItem.client_id}
              validateStatus={errors.client_id ? 'error' : ''}
              help={errors.client_id}
              label={t('form.client_id')}
            >
              <Input placeholder={t('placeholder.client_id')} />
            </Form.Item>
            <Form.Item
              validateStatus={errors.identity_auth ? 'error' : ''}
              help={errors.identity_auth}
              name={FormItem.identity_auth}
              label={t('form.identity_auth')}
            >
              <Input placeholder={t('placeholder.identity_auth')} />
            </Form.Item>
            <Form.Item
              validateStatus={errors.website_url ? 'error' : ''}
              help={errors.website_url}
              name={FormItem.website_url}
              label={t('form.website_url')}
            >
              <Input placeholder={t('placeholder.website_url')} />
            </Form.Item>
            <Form.Item
              validateStatus={errors.input_address ? 'error' : ''}
              help={errors.input_address}
              name={FormItem.input_address}
              label={t('form.input_address')}
            >
              <Input placeholder={t('placeholder.input_address')} />
            </Form.Item>
            <Form.Item
              validateStatus={errors.return_address ? 'error' : ''}
              help={errors.return_address}
              name={FormItem.return_address}
              label={t('form.return_address')}
            >
              <Input placeholder={t('placeholder.return_address')} />
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
              validateStatus={errors.aggregator ? 'error' : ''}
              help={errors.aggregator}
              name={FormItem.aggregator}
              label={t('form.aggregator')}
            >
              <Select size={'large'} options={options} placeholder={t('placeholder.faraboom')}></Select>
            </Form.Item>
          </SearchItemsContainer>
        </Form>
      </div>
      <div className={'footer'}>
        <Button variant={'outlined'}>{t('form.return')}</Button>
        <Button htmlType={'submit'} onClick={() => form.submit()}>
          {t('form.register_info')}
          <i className={'icon-arrow-left'}></i>
        </Button>
      </div>
    </S.FirtStepContainer>
  );
};

export default FirstStep;
