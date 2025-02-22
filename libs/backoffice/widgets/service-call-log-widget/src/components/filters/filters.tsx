import { createSchemaFieldRule } from 'antd-zod';
import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { useTr } from '@oxygen/translation';
import { Box, Button, Chip, DatePicker, SearchItemsContainer } from '@oxygen/ui-kit';
import { useBounce, useToggle } from '@oxygen/hooks';
// import { updateSearchTerm, updateSort, updateStatus, useAppDispatch, useAppState } from '../../context';
import { WidgetStateType } from '../../context/types';
import { FILTERS } from '../../utils/consts';
import { updatePagination, useAppDispatch, useAppState } from '../../context';

import { CreateServiceNameSchema, ServiceNameType } from '../../types/search-service.schema';
import * as S from './filters.style';
import { Services } from '@oxygen/reusable-components';
import ServiceSelector from '../service-selector/service-selector';
import { useGetClientServices } from '../../utils/get-client-services.api';

import { updateSearchTerm } from '../../context';
import ClientSelector from '../client-selector/client-selector';

// type Status = WidgetStateType['status'];
// type Sort = WidgetStateType['sort'];

function getChipType(currentStatus: any, chipStatus: any) {
  return currentStatus === chipStatus ? 'active' : 'unActive';
}

export default function Filters() {
  const [t] = useTr();
  const clientName = '333';
  const hasServices = true;
  const rule = createSchemaFieldRule(CreateServiceNameSchema(t));
  const [form] = Form.useForm<ServiceNameType>();
  const dispatch = useAppDispatch();
  // const { status, sort } = useAppState();
  const [value, setValue] = useState('');
  const [pagination, setPagination] = useState<{ page: number; size: number }>({ page: 1, size: 5 });
  const { page, size } = pagination;

  const { data, isFetching } = useGetClientServices(
    {
      size,
      clientName,
      page: page - 1,
      sort: 'createDate,DESC',
    },
    dispatch
  );
  const [serviceToRemove, setServiceToRemove] = useState<any | null>(null);
  const [serviceToView, setServiceToView] = useState<any | null>(null);

  function handleSearch() {
    form
      .validateFields()
      .then((values) => {
        const queryParams = {
          clientGatewayId: values[FILTERS.Client] || '',
          serviceGatewayId: values[FILTERS.Service] || '',
          fromDate: values[FILTERS.FromDate] || '',
          toDate: values[FILTERS.Todate] || '',
          size: size.toString(), // Convert number to string
          page: (page - 1).toString(),
          sort: 'createDate,DESC',
        };

        // Convert queryParams object into a query string
        const queryString = new URLSearchParams(queryParams).toString();

        // Update search term and trigger API call
        updateSearchTerm(dispatch, queryString);
      })
      .catch(() => {
        console.log('Search input validation failed');
      });
  }

  function test() {
    //dsd
  }

  useBounce(async () => {
    try {
      await form.validateFields();
      updateSearchTerm(dispatch, value?.trim());
    } catch {
      console.log('search input validation failed');
    }
  }, [value]);

  return (
    <S.Container>
      <Box className='filter-container'>
        <Form form={form} layout={'vertical'}>
          {/* <S.Actions> */}
          <SearchItemsContainer>
            <Form.Item
              label={t('field.services')}
              name={FILTERS.Service}
              // rules={[rule]}
              style={{ width: '100%' }}
            >
              <ServiceSelector dispatch={dispatch} disabled={false} onSelect={test} />
            </Form.Item>
            <Form.Item
              label={t('field.clients')}
              name={FILTERS.Client}
              // rules={[rule]}
              style={{ width: '100%' }}
            >
              <ClientSelector dispatch={dispatch} disabled={false} onSelect={test} />
            </Form.Item>
            <Form.Item
              label={t('field.from_date')}
              name={FILTERS.FromDate}
              // rules={[rule]}
              style={{ display: '100%' }}
            >
              {/* <S.Input
                value={value}
                placeholder={t('placeholder.search_by_english_name', { element: t('element.service') })}
                prefix={<i className='icon-search-normal' />}
                onChange={(e) => setValue(e.target.value)}
              /> */}
              <DatePicker
              // placeholder={t('field.from_date', { element: t('element.service') })}
              // prefix={<i className='icon-search-normal' />}
              />
            </Form.Item>
            <Form.Item
              label={t('field.to_date')}
              name={FILTERS.Todate}
              // rules={[rule]}
              style={{ width: '100%' }}
            >
              <DatePicker />
            </Form.Item>
            {/* </S.Actions> */}
          </SearchItemsContainer>
          <S.Footer>
            <Button variant={'outlined'} onClick={() => form.resetFields()}>
              {t('button.delete_all')}
            </Button>
            <Button htmlType={'submit'} size='large' onClick={handleSearch}>
              {t('button.search')}
            </Button>
          </S.Footer>
        </Form>
      </Box>
    </S.Container>
  );
}
