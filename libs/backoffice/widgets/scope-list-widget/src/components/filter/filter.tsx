import React, { useState } from 'react';
import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
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
  const [value, setValue] = useState<string>('');

  const rule = createSchemaFieldRule(createFormSchema(t));

  useBounce(() => {
    updateSearchTerm(dispatch, value.trim());
  }, [value]);

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
    </S.FilterContainer>
  );
};

export default Filter;
