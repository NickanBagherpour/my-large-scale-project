import React, { useState } from 'react';
import { Form } from 'antd';

import { useTr } from '@oxygen/translation';
import { useBounce } from '@oxygen/hooks';
import { PageProps } from '@oxygen/types';
import { limits } from '@oxygen/utils';

import { updatePagination, updateSearchTerm, updateSort, useAppDispatch, useAppState } from '../../context';
import { renderChips } from '../../utils/helper';
import { FILTER_FORM_ITEM_NAMES, SORT_ORDER } from '../../utils/consts';
import { searchServiceSchema, SearchServiceType, Sort } from '../../types';

import * as S from './filter.style';
import { createSchemaFieldRule } from 'antd-zod';

type FilterProps = PageProps & {
  //
};

const Filters: React.FC<FilterProps> = (props) => {
  const { userRole } = props;

  const [t] = useTr();
  const dispatch = useAppDispatch();
  const { status, sort } = useAppState();
  const [value, setValue] = useState('');

  useBounce(() => {
    updateSearchTerm(dispatch, value.trim());
    updatePagination(dispatch, { page: 1 });
  }, [value]);

  const [form] = Form.useForm<SearchServiceType>();
  const rule = createSchemaFieldRule(searchServiceSchema(t));

  return (
    <S.Container>
      <Form form={form}>
        <S.FormItem name={FILTER_FORM_ITEM_NAMES.search_by_name} rules={[rule]}>
          <S.Input
            value={value}
            placeholder={t('search_by_service_english_name')}
            prefix={<i className='icon-search-normal' />}
            onChange={(e) => setValue(e.target.value)}
            allow={'letter'}
            type='text'
            maxLength={limits.DEFAULT_MAX_LENGTH}
          />
        </S.FormItem>
      </Form>

      <S.Indicators>
        {renderChips(status, dispatch, t)}
        <S.FilterPopover
          filters={[
            { key: SORT_ORDER.ASCENDING, title: t('filter.newest'), icon: 'icon-arrow-ascending' },
            { key: SORT_ORDER.DESCENDING, title: t('filter.oldest'), icon: 'icon-arrow-descending' },
          ]}
          initialValue={sort}
          onChange={(value) => updateSort(dispatch, value as Sort)}
        />
      </S.Indicators>
    </S.Container>
  );
};

export default Filters;
