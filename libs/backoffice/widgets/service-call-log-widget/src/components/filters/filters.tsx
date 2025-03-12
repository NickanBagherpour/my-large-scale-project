import { createSchemaFieldRule } from 'antd-zod';
import { Form, DatePicker } from 'antd';
import { useState } from 'react';
import { useTr } from '@oxygen/translation';
import { Box, Button, SearchItemsContainer, Icons, Select } from '@oxygen/ui-kit';
import { useAppDispatch } from '../../context';

import { ServiceNameType } from '../../types/search-service.schema';
import * as S from './filters.style';
import ServiceSelector from '../service-selector/service-selector';

import { updateSearchTerm } from '../../context';
import ClientSelector from '../client-selector/client-selector';
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';
import { FormSchema } from '../../types/filters.schema';

export default function Filters({ filters, setFilters, onSearch, onReset }) {
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [t] = useTr();
  const rule = createSchemaFieldRule(FormSchema(t));

  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [selectedClient, setSelectedClient] = useState<any | null>(null);

  const onFinish = (values) => {
    const dateRange = values['date'];
    const status = values['status'];
    // const service = values['service'];
    // const client = values['client'];

    let fromDate = null;
    let toDate = null;

    if (dateRange && dateRange.length === 2) {
      fromDate = dateRange[0].format('YYYY/MM/DD HH:mm:ss');
      toDate = dateRange[1].format('YYYY/MM/DD HH:mm:ss');
    }
    const queryParams = {
      clientGatewayId: selectedClient.clientGatewayId,
      serviceGatewayId: selectedService.serviceGatewayId,
      fromDate: fromDate,
      toDate: toDate,
      status: status,
      size: filters.size.toString(),
      page: (filters.page - 1).toString(),
      sort: 'createDate,DESC',
    };

    updateSearchTerm(dispatch, new URLSearchParams(queryParams).toString());
    onSearch();

    console.log('date range:', dateRange);
    console.log('From Date:', fromDate);
    console.log('To Date:', toDate);
    console.log('Status:', status);

    // Use these values (e.g., send them to an API)
  };

  const getYearMonth = (date) => date.year() * 12 + date.month();

  const disabled30DaysDate = (current, { from, type }) => {
    if (from) {
      const minDate = from.add(-31, 'days');
      const maxDate = from.add(31, 'days');
      switch (type) {
        case 'year':
          return current.year() < minDate.year() || current.year() > maxDate.year();
        case 'month':
          return getYearMonth(current) < getYearMonth(minDate) || getYearMonth(current) > getYearMonth(maxDate);
        default:
          return Math.abs(current.diff(from, 'days')) >= 30;
      }
    }
    return false;
  };

  const statusOptions = [
    { value: '1', label: 'range (100, 199)' },
    { value: '2', label: 'range (200, 299)' },
    { value: '3', label: 'range (300, 499)' },
    { value: '4', label: 'range (400, 499)' },
    { value: '5', label: 'range (500, 599)' },
  ];

  return (
    <S.Container>
      <Box className='filter-container'>
        <Form
          form={form}
          layout='vertical'
          onFinish={onFinish}
          initialValues={{
            date: [dayjs().subtract(1, 'month').startOf('day'), dayjs().endOf('day')],
          }}
        >
          <SearchItemsContainer>
            <Form.Item label={t('field.services')} name='service' rules={[rule]}>
              <ServiceSelector
                dispatch={dispatch}
                disabled={false}
                onSelect={(selectedService) => {
                  form.setFieldsValue({ service: selectedService?.name });
                  form.validateFields(['service']);
                  setSelectedService(selectedService);
                }}
              />
            </Form.Item>

            <Form.Item label={t('field.clients')} name='client' rules={[rule]}>
              <ClientSelector
                dispatch={dispatch}
                disabled={false}
                onSelect={(selectedClient) => {
                  form.setFieldsValue({ client: selectedClient?.clientName });
                  form.validateFields(['client']);
                  setSelectedClient(selectedClient);
                }}
              />
            </Form.Item>

            <Form.Item name='date' label={t('common.date')} rules={[rule]}>
              <RangePicker
                showTime={{
                  format: 'HH:mm',
                  defaultValue: [dayjs().startOf('day'), dayjs().endOf('day')], // Default start and end times
                }}
                format='YYYY/MM/DD HH:mm'
                disabledDate={disabled30DaysDate}
              />
            </Form.Item>

            <Form.Item name='status' label={t('uikit.status')} rules={[rule]}>
              <Select options={statusOptions} size='large' placeholder={t('placeholders.choose_status')} />
            </Form.Item>
          </SearchItemsContainer>

          <S.Footer>
            <Button
              variant='outlined'
              onClick={() => {
                form.resetFields();
                onReset();
              }}
            >
              {t('button.delete_all')}
            </Button>

            <Button htmlType='submit' size='large' style={{ padding: '0 4rem' }}>
              {t('button.search')}
            </Button>
          </S.Footer>
        </Form>
      </Box>
    </S.Container>
  );
}
