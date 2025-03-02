import { createSchemaFieldRule } from 'antd-zod';
import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { useTr } from '@oxygen/translation';
import { Box, Button, Chip, SearchItemsContainer, DatePicker, Icons } from '@oxygen/ui-kit';
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
import dayjs, { Dayjs } from 'dayjs';

export default function Filters({ filters, setFilters, onSearch }) {
  const [form] = Form.useForm<ServiceNameType>();
  const dispatch = useAppDispatch();
  const [t] = useTr();

  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);

  const handleDateChange = (field: 'fromDate' | 'toDate', date: Dayjs | null) => {
    if (field === 'fromDate') {
      setFromDate(date);
      if (toDate && date && toDate.isAfter(date.add(1, 'month'))) {
        setToDate(null);
      }
    } else if (field === 'toDate') {
      setToDate(date);
    }
  };

  const disableFromDate = (current: Dayjs) => {
    if (!toDate) return current.isAfter(dayjs());
    return current.isAfter(dayjs(toDate)) || current.isBefore(dayjs(toDate).subtract(1, 'month'));
  };

  const disableToDate = (current: Dayjs) => {
    if (!fromDate) return current.isAfter(dayjs());
    return current.isBefore(dayjs(fromDate)) || current.isAfter(dayjs(fromDate).add(1, 'month'));
  };

  const handleSubmit = () => {
    const queryParams = {
      clientGatewayId: selectedClient?.clientGatewayId || '',
      serviceGatewayId: selectedService?.serviceGatewayId || '',
      fromDate: fromDate ? dayjs(fromDate).format('YYYY/MM/DD') : '',
      toDate: toDate ? dayjs(toDate).format('YYYY/MM/DD') : '',
      size: filters.size.toString(),
      page: (filters.page - 1).toString(),
      sort: 'createDate,DESC',
    };

    console.log('selectedClient:', selectedClient);

    updateSearchTerm(dispatch, new URLSearchParams(queryParams).toString());
    onSearch();
  };

  return (
    <S.Container>
      <Box className='filter-container'>
        <Form form={form} layout='vertical'>
          <SearchItemsContainer>
            <Form.Item label={t('field.services')} name='service'>
              <ServiceSelector dispatch={dispatch} disabled={false} onSelect={setSelectedService} />
            </Form.Item>

            <Form.Item label={t('field.clients')} name='client'>
              <ClientSelector dispatch={dispatch} disabled={false} onSelect={setSelectedClient} />
            </Form.Item>

            <Form.Item name='fromDate' label={t('field.from_date')}>
              <DatePicker
                placeholder={t('field.from_date')}
                value={fromDate}
                onChange={(date) => handleDateChange('fromDate', date)}
                disabledDate={disableFromDate}
                suffixIcon={<Icons.Calender />}
                disableFuture={true}
              />
            </Form.Item>

            <Form.Item name='toDate' label={t('field.to_date')}>
              <DatePicker
                placeholder={t('field.to_date')}
                value={toDate}
                onChange={(date) => handleDateChange('toDate', date)}
                disabledDate={disableToDate}
                suffixIcon={<Icons.Calender />}
                disableFuture={true}
              />
            </Form.Item>
          </SearchItemsContainer>

          <S.Footer>
            <Button variant='outlined' onClick={() => form.resetFields()}>
              {t('button.delete_all')}
            </Button>
            <Button htmlType='submit' size='large' style={{ padding: '0 4rem' }} onClick={handleSubmit}>
              {t('button.search')}
            </Button>
          </S.Footer>
        </Form>
      </Box>
    </S.Container>
  );
}
