import { createSchemaFieldRule } from 'antd-zod';
import { Form, DatePicker, DatePickerProps } from 'antd';
import { useState } from 'react';
import { useTr } from '@oxygen/translation';
import { Box, Button, SearchItemsContainer, Icons, Select } from '@oxygen/ui-kit';
import { useAppDispatch } from '../../context';

import { ServiceNameType } from '../../types/search-service.schema';
import * as S from './filters.style';
import ServiceSelector from '../service-selector/service-selector';

import { updateSearchTerm } from '../../context';
import ClientSelector from '../client-selector/client-selector';
import dayjs, { Dayjs } from 'dayjs';
import jalaliday from 'jalaliday';
import { FormSchema } from '../../types/filters.schema';
import { RangePickerProps } from 'antd/es/date-picker';

export default function Filters({ filters, setFilters, onSearch, onReset }) {
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [t] = useTr();
  const rule = createSchemaFieldRule(FormSchema(t));

  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const [confirmedDates, setConfirmedDates] = useState<any | null>(null);

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
      clientGatewayId: selectedClient?.clientGatewayId || '',
      serviceGatewayId: selectedService?.serviceGatewayId || '',
      fromDate: fromDate || '',
      toDate: toDate || '',
      status: status || '',
      size: filters.size.toString(),
      page: (filters.page - 1).toString(),
      sort: 'createDate,DESC',
    };

    updateSearchTerm(dispatch, new URLSearchParams(queryParams).toString());
    onSearch();
  };

  const disabled30DaysDate = (current: Dayjs | null): boolean => {
    const formValues = form.getFieldsValue();
    if (!current) return false;

    if (confirmedDates) {
      const [fromDatee, toDatee] = confirmedDates;

      if (fromDatee && !toDatee) {
        const maxAllowedDate = fromDatee.add(30, 'days');
        return current.isBefore(fromDatee.startOf('day')) || current.isAfter(maxAllowedDate.endOf('day'));
      }

      if (!fromDatee && toDatee) {
        const minAllowedDate = toDatee.subtract(30, 'days');
        return current.isAfter(toDatee.endOf('day')) || current.isBefore(minAllowedDate.startOf('day'));
      }
    }

    const dateRange = formValues['date'];

    if (dateRange) {
      const fromDate = dateRange[0];
      const toDate = dateRange[1];

      return current.isBefore(fromDate.startOf('day')) || current.isAfter(toDate.endOf('day'));
    } else {
      return false;
    }
  };

  const statusOptions = [
    { value: '1', label: t('range_100_to_199') },
    { value: '2', label: t('range_200_to_299') },
    { value: '3', label: t('range_300_to_399') },
    { value: '4', label: t('range_400_to_499') },
    { value: '5', label: t('range_500_to_599') },
  ];

  const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    setConfirmedDates(value);
  };

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
                onOk={onOk}
                showTime={{
                  format: 'HH:mm',
                  defaultValue: [dayjs().startOf('day'), dayjs().endOf('day')], // Default start and end times
                }}
                format='YYYY/MM/DD HH:mm'
                disabledDate={disabled30DaysDate}
                suffixIcon={<Icons.Calender />}
              />
            </Form.Item>

            <Form.Item name='status' label={t('uikit.status')} rules={[rule]}>
              <Select options={statusOptions} allowClear size='large' placeholder={t('placeholders.choose_status')} />
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
