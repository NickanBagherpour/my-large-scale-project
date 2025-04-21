import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';

import { ClientAggregatorSelector } from '@oxygen/reusable-components';
import { Button, DatePicker, Icons, Input, Select } from '@oxygen/ui-kit';
import { MutationStatus } from '@tanstack/react-query';
import { useDateLocaleListener } from '@oxygen/hooks';
import { useTr } from '@oxygen/translation';

import { CreateBillType, createBillType, FORM_ITEM_NAMES } from './billing-request-modal.schema';
import { DiscountType } from '../../utils/billing-request';

import * as S from './billing-request-modal.style';

interface ReusableFormModalProps {
  open: boolean;
  setOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
  onConfirm: (values: CreateBillType) => void;
  status: MutationStatus;
  initialData?: CreateBillType;
  dispatch: any;
}

const discountTypes = [
  {
    label: 'ثابت',
    value: '1',
  },
  {
    label: 'درصد',
    value: '2',
  },
];

const BillingRequestModal: React.FC<ReusableFormModalProps> = (props) => {
  const { open, setOpen, onConfirm, status, initialData, dispatch } = props;
  const [isCreateMode, setIsCreateMode] = useState(true);
  const [t] = useTr();
  const rule = createSchemaFieldRule(createBillType(t));
  const [form] = Form.useForm<CreateBillType>();
  const [selectedClient, setSelectedClient] = useState<any | null>(null);

  const [discountType, setDiscountType] = useState();

  useEffect(() => {
    if (initialData && open) {
      form.setFieldsValue(initialData);
    }
  }, [open, initialData, form]);

  useDateLocaleListener();

  const handleFinish = (values: CreateBillType) => {
    setIsCreateMode(false);

    const trimmedValues = {
      ...values,
      [FORM_ITEM_NAMES.name]: values[FORM_ITEM_NAMES.name]?.trim(),
      [FORM_ITEM_NAMES.year]: values[FORM_ITEM_NAMES.year],
      [FORM_ITEM_NAMES.month]: values[FORM_ITEM_NAMES.month],
      [FORM_ITEM_NAMES.discountType]: values[FORM_ITEM_NAMES.discountType]?.trim(),
      [FORM_ITEM_NAMES.discountAmount]: values[FORM_ITEM_NAMES.discountAmount]?.trim(),
    };

    onConfirm(trimmedValues);
    console.log('trimmedValues', trimmedValues);
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
    setIsCreateMode(true);
  };

  const modalFooter = [
    <Button variant={'outlined'} onClick={handleCancel}>
      {t('button.cancel')}
    </Button>,
    <S.RegisterButton
      disabled={status === 'pending'}
      onClick={() => {
        console.log(form.getFieldsValue());
        form.submit();
      }}
    >
      {t('button.register_request')}
    </S.RegisterButton>,
  ];
  const renderModalContent = () => {
    return (
      <>
        <S.StyledHeader>
          <S.StyledTitle>
            {t(isCreateMode ? 'reusable.billing_request.create_request' : 'reusable.billing_request.edit_request')}
          </S.StyledTitle>
          <S.StyledCloseIcon className={'icon-close-square'} onClick={handleCancel} />
        </S.StyledHeader>
        <S.StyledDivider />
        <S.StyledForm
          layout='vertical'
          labelAlign='left'
          labelCol={{ span: 8 }}
          style={{ width: '100%' }}
          form={form}
          onFinish={handleFinish}
          colon={false}
          initialValues={initialData}
        >
          <S.InputsBox>
            <S.Grid>
              <Form.Item
                name={FORM_ITEM_NAMES.name}
                label={t('reusable.billing_request.client_or_aggregator_name')}
                rules={[rule]}
              >
                <ClientAggregatorSelector
                  dispatch={dispatch}
                  disabled={false}
                  onSelect={(selectedClient) => {
                    form.setFieldsValue({ name: selectedClient?.name });
                    form.validateFields(['name']);
                    setSelectedClient(selectedClient);
                  }}
                />
              </Form.Item>

              <Form.Item name={FORM_ITEM_NAMES.year} label={t('reusable.billing_request.year')} rules={[rule]}>
                <DatePicker.YearPicker
                  variant={'outlined'}
                  format={'YYYY'}
                  prefix={<Icons.Calender />}
                  suffixIcon={<i className={'icon-chev-down rotate-icon'} />}
                />
              </Form.Item>

              <Form.Item name={FORM_ITEM_NAMES.month} label={t('reusable.billing_request.month')} rules={[rule]}>
                <DatePicker.MonthPicker
                  variant={'outlined'}
                  format={'MM'}
                  prefix={<Icons.Calender />}
                  suffixIcon={<i className={'icon-chev-down rotate-icon'} />}
                />
              </Form.Item>

              <Form.Item
                name={FORM_ITEM_NAMES.discountType}
                label={t('reusable.billing_request.discount_type')}
                rules={[rule]}
              >
                <Select
                  size={'large'}
                  options={discountTypes}
                  placeholder={`${t('placeholder.dont_have')}`}
                  allowClear
                  onChange={(value) => {
                    setDiscountType(value);
                  }}
                ></Select>
              </Form.Item>
              <Form.Item
                name={FORM_ITEM_NAMES.discountAmount}
                label={t('reusable.billing_request.discount_amount')}
                rules={[rule]}
              >
                {discountType === DiscountType.FIXED ? (
                  <Input.Money showLetter={true} disabled={!discountType} />
                ) : (
                  <Input
                    allow={'number'}
                    suffix={<S.Icon className='icon-percentage-circle' />}
                    disabled={!discountType}
                  />
                )}
              </Form.Item>
            </S.Grid>
          </S.InputsBox>
        </S.StyledForm>
      </>
    );
  };
  return (
    <S.StyledModal
      open={open}
      onCancel={handleCancel}
      confirmLoading={status === 'pending'}
      destroyOnClose={true}
      closeIcon={false}
      headerDivider={false}
      footer={modalFooter}
      centered={true}
      // width={1000}
    >
      {renderModalContent()}
    </S.StyledModal>
  );
};
export default BillingRequestModal;
