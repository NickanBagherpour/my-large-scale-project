import React, { useState } from 'react';
import { createSchemaFieldRule } from 'antd-zod';
import { Form } from 'antd';

import { useTr } from '@oxygen/translation';
import { useBounce } from '@oxygen/hooks';
import { PageProps } from '@oxygen/types';
import { limits } from '@oxygen/utils';

import {
  updatePaginationAction,
  updateSearchTermAction,
  updateSortAction,
  useAppDispatch,
  useAppState,
} from '../../context';
import { FILTER_FORM_ITEM_NAMES, SORT_ORDER } from '../../utils/consts';
import { searchServiceSchema, SearchServiceType, Sort } from '../../types';
import { renderChips } from '../../utils/helper';

import * as S from './filter.style';

type FilterProps = PageProps & {
  //
};

const Filters: React.FC<FilterProps> = (props) => {
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const { status, sort } = useAppState();

  const [value, setValue] = useState('');

  useBounce(() => {
    updateSearchTermAction(dispatch, value.trim());
    updatePaginationAction(dispatch, { page: 1 });
  }, [value.trim()]);

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
          onChange={(value) => updateSortAction(dispatch, value as Sort)}
        />
      </S.Indicators>
    </S.Container>
  );
};

export default Filters;
