import React from 'react';

import { Card, Form } from 'antd';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import {
  Box,
  Button,
  Chip,
  Divider,
  DropdownOption,
  Input,
  SearchItemsContainer,
  Select,
  Switch,
  TagInput,
} from '@oxygen/ui-kit';

import { useAppDispatch, useAppState } from '../../context';
//import { useGetReportDataQuery } from '../../services';

import * as S from './first-step.style';

type FirstStepProps = PageProps & {
  //
};

const FirstStep: React.FC<FirstStepProps> = (props) => {
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();
  const [form] = Form.useForm();

  const FormItem = {
    latin_name_client: 'latin-name-client',
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
  const dropdownOptions: DropdownOption[] = [
    { label: 'Client Flow', value: 'option1' },
    { label: 'Password Flow', value: 'option2' },
    { label: 'Implicit Flow', value: 'option4' },
    { label: 'Refresh Token', value: 'option5' },
    { label: 'Client Flow', value: 'option6' },
    { label: 'Password Flow', value: 'option7' },
    { label: 'Authorization Code Flow', value: 'option8' },
    { label: 'Implicit Flow', value: 'option9' },
    { label: 'Refresh Token', value: 'option10' },
  ];
  const handleCheckboxChange = (e, values, value) => {
    //console.log('handleCheckboxChange', value, values);
    /* e.stopPropagation(); // Prevent dropdown from closing
     e.preventDefault(); // Prevent default behavior
     setCheckedItems((prev) => {
       const existingItem = prev.find((item) => item.value === value);
       if (existingItem) {
         return prev.filter((item) => item.value !== value);
       } else {
         const optionToAdd = dropdownOptions.find((option) => option.value === value);
         return optionToAdd ? [...prev, { label: optionToAdd.label, value }] : prev;
       }
     });*/
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <S.FirstStepContainer>
      <Form layout={'vertical'} onFinish={onFinish} form={form}>
        <Box marginTop={'4rem'}>
          <Form.Item className={'tag-input-grant-tag'}>
            <TagInput
              title={t('add_grant_type')}
              multiSelect={true}
              //to do handle theme dynamic
              options={dropdownOptions}
              onChange={handleCheckboxChange}
              loading={false}
            />
          </Form.Item>
          <Box flexGrow={9} marginLeft={'1rem'}>
            <Chip type={'active'} className={'tags'} closeIcon>
              Client Flow
            </Chip>
          </Box>
        </Box>
        <Box marginTop={'4rem'}>
          <Form.Item className={'tag-input-add-tag'}>
            <TagInput
              title={t('add_grant_type')}
              multiSelect={true}
              //to do handle theme dynamic
              options={dropdownOptions}
              onChange={handleCheckboxChange}
              loading={false}
            />
          </Form.Item>
          <Box flexGrow={9} marginLeft={'1rem'}>
            <Chip type={'active'} className={'tags'} closeIcon>
              Client Flow
            </Chip>
          </Box>
        </Box>
      </Form>
    </S.FirstStepContainer>
  );
};

export default FirstStep;
