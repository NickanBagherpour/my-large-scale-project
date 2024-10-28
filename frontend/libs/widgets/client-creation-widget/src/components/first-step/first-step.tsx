import React from 'react';

import { Card, Form } from 'antd';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Box, Button, Chip, Divider, Input, SearchItemsContainer, Select, Switch, TagInput } from '@oxygen/ui-kit';

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

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <S.FirstStepContainer>
      <Form layout={'vertical'} onFinish={onFinish} form={form}>
        <Box>
          <Form.Item className={'tag-input'}>
            {/* <TagInput
              handleCheckboxChange={(value, e) => console.log('handleCheckboxChange', value)}
              buttonCaption={t('form.grant_type')}
              options={['af', 'asdf']}
              multiSelect={false}
            />         */}
          </Form.Item>
          <Box flexGrow={9} marginLeft={'1rem'}>
            <Chip type={'active'} className={'tags'} closeIcon={<i className={'icon-close'}></i>}>
              Client Flow
            </Chip>
          </Box>
        </Box>
      </Form>
    </S.FirstStepContainer>
  );
};

export default FirstStep;
