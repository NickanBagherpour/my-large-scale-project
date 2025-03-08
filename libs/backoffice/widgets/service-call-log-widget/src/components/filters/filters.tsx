import { createSchemaFieldRule } from 'antd-zod';
import { Form } from 'antd';
import { useState } from 'react';
import { useTr } from '@oxygen/translation';
import { Box, Button, SearchItemsContainer, DatePicker, Icons } from '@oxygen/ui-kit';
import { useAppDispatch } from '../../context';

import { ServiceNameType } from '../../types/search-service.schema';
import * as S from './filters.style';
import ServiceSelector from '../service-selector/service-selector';

import { updateSearchTerm } from '../../context';
import ClientSelector from '../client-selector/client-selector';
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';
import { FormSchema } from '../../types/filters.schema';

export default function Filters({ filters, setFilters, onSearch }) {
  const [form] = Form.useForm<ServiceNameType>();
  const dispatch = useAppDispatch();
  const [t] = useTr();
  const rule = createSchemaFieldRule(FormSchema(t));

  const today = dayjs();
  const oneMonthAgo = dayjs().subtract(1, 'month');

  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const [fromDate, setFromDate] = useState<dayjs.Dayjs | null>(oneMonthAgo);
  const [toDate, setToDate] = useState<dayjs.Dayjs | null>(today);

  const handleDateChange = (field: 'fromDate' | 'toDate', date: dayjs.Dayjs | null) => {
    if (field === 'fromDate') {
      setFromDate(date);
      setToDate(null);
    } else {
      setToDate(date);
    }
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

    updateSearchTerm(dispatch, new URLSearchParams(queryParams).toString());
    onSearch();
  };

  return (
    <S.Container>
      <Box className='filter-container'>
        <Form
          form={form}
          layout='vertical'
          initialValues={{
            fromDate: dayjs().subtract(1, 'month'),
            toDate: dayjs(),
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

            <Form.Item name='fromDate' label={t('field.from_date')} rules={[rule]}>
              <DatePicker
                placeholder={t('field.from_date')}
                fromDate={fromDate}
                toDate={toDate}
                setFromDate={setFromDate}
                setToDate={setToDate}
                value={fromDate}
                onChange={(date) => handleDateChange('fromDate', date)}
                suffixIcon={<i className={'icon-calendar-2'} />}
              />
            </Form.Item>

            <Form.Item name='toDate' label={t('field.to_date')} rules={[rule]}>
              <DatePicker
                placeholder={t('field.to_date')}
                fromDate={fromDate}
                toDate={toDate}
                setFromDate={setFromDate}
                setToDate={setToDate}
                value={toDate}
                onChange={(date) => handleDateChange('toDate', date)}
                suffixIcon={<i className={'icon-calendar-2'} />}
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
