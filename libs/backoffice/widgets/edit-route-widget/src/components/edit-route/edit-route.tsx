import React from 'react';
import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Button, Input, SearchItemsContainer, Select, Typography } from '@oxygen/ui-kit';
import { FooterContainer, ReturnButton } from '@oxygen/reusable-components';

import { FormSchema } from '../../types';
import { FORM_ITEM_NAMES } from '../../utils/form-item-name';
import { MAX_LENGTH_INPUT } from '../../utils/consts';

import * as S from './edit-route.style';
import { useRouter } from 'next/navigation';

type EditScopeProps = PageProps & {
  //
};

const EditRoute: React.FC<EditScopeProps> = (props) => {
  const [t] = useTr();
  const [form] = Form.useForm();
  const rule = createSchemaFieldRule(FormSchema(t));
  const submitClick = () => form.submit();

  const selectOptions = [
    { label: 'HTTP', value: '1' },
    { label: 'HTTPS', value: '2' },
    { label: 'UDP', value: '3' },
  ];

  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };

  const onFinish = async (values) => {
    // console.log('inputValue', values);
  };

  return (
    <S.EditRouteContainer>
      <div className={'form-wrapper'}>
        {/* <Typography.Title>{t('edit_route')}</Typography.Title> */}
        <h3>{t('edit_route')}</h3>
        <Form layout={'vertical'} onFinish={onFinish} form={form}>
          <SearchItemsContainer>
            <Form.Item name={FORM_ITEM_NAMES.action} className={'span-2'} label={t('action')} rules={[rule]}>
              <Input maxLength={MAX_LENGTH_INPUT} placeholder={t('placeholders.action')} />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.protocol} className={'span-2'} label={t('protocol')} rules={[rule]}>
              <Select options={selectOptions} placeholder={t('placeholders.protocol')} size='large' />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.path} className={'span-2'} label={t('path')} rules={[rule]}>
              <Input maxLength={MAX_LENGTH_INPUT} placeholder={t('placeholders.path')} />
            </Form.Item>
            <Form.Item name={FORM_ITEM_NAMES.host} className={'span-2'} label={t('host')} rules={[rule]}>
              <Input maxLength={MAX_LENGTH_INPUT} placeholder={t('placeholders.host')} />
            </Form.Item>
          </SearchItemsContainer>
        </Form>
      </div>
      <FooterContainer>
        <ReturnButton size={'large'} variant={'outlined'} onClick={handleReturn}>
          {t('buttons.cancel')}
        </ReturnButton>
        <Button htmlType={'submit'} onClick={submitClick}>
          {t('buttons.save_changes')}
        </Button>
      </FooterContainer>
    </S.EditRouteContainer>
  );
};

export default EditRoute;
