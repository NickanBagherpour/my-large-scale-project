import React, { useState } from 'react';
import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Input } from '@oxygen/ui-kit';
import { ROUTES } from '@oxygen/utils';
import { useBounce } from '@oxygen/hooks';

import { updateSearchTerm, useAppDispatch } from '../../context';

import { FORM_ITEM_NAMES } from '../../utils/form-item-name';
import { MAX_LENGTH_INPUT } from '../../utils/consts';

import { createFormSchema } from '../../types';

import * as S from './filter.style';

type FilterProps = PageProps & {
  //
};

const Filter: React.FC<FilterProps> = (props) => {
  const dispatch = useAppDispatch();
  const [t] = useTr();
  const [form] = Form.useForm();
  const [value, setValue] = useState('');
  const [stateModal, setStateModal] = useState<boolean>(false);

  const rule = createSchemaFieldRule(createFormSchema(t));

  useBounce(() => {
    updateSearchTerm(dispatch, value.trim());
  }, [value]);

  const handleChangeModal = () => {
    setStateModal(true);
  };

  function handleCancel() {
    setStateModal(false);
    form.resetFields();
  }

  const onFinish = (value) => {
    setStateModal(false);
  };

  return (
    <S.FilterContainer>
      <S.Actions>
        <S.Form layout={'vertical'} form={form}>
          <Form.Item name={FORM_ITEM_NAMES.scopesName} rules={[rule]} label={t('search')}>
            <S.Input
              value={value}
              placeholder={t('placeholder.search_by_name')}
              maxLength={MAX_LENGTH_INPUT}
              prefix={<i className='icon-search-normal' />}
              onChange={(e) => setValue(e.target.value)}
            />
          </Form.Item>
        </S.Form>
        <S.Buttons>
          <S.Button href={ROUTES.BACKOFFICE.SCOPE_CREATION} color='primary' variant='solid'>
            {t('button.create_new_scope')}
          </S.Button>
        </S.Buttons>
      </S.Actions>
      <S.UploadModal
        open={stateModal}
        centered={true}
        title={t('add_scope')}
        onCancel={handleCancel}
        cancelText={t('button.cancel')}
        okText={t('button.register_info')}
        onOk={() => form.submit()}
      >
        <Form layout={'vertical'} onFinish={onFinish} form={form}>
          <Form.Item name={'latinNameClient'} label={t('table.latin_name_scope')} rules={[rule]}>
            <Input maxLength={MAX_LENGTH_INPUT} />
          </Form.Item>
        </Form>
      </S.UploadModal>
    </S.FilterContainer>
  );
};

export default Filter;
