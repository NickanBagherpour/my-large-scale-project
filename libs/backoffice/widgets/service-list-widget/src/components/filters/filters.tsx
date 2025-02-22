import { createSchemaFieldRule } from 'antd-zod';
import { Form } from 'antd';
import { useState } from 'react';
import { useTr } from '@oxygen/translation';
import { Chip } from '@oxygen/ui-kit';
import { InquiryComponent } from '@oxygen/reusable-components';
import { useBounce, useToggle } from '@oxygen/hooks';
import { updateSearchTerm, updateSort, updateStatus, useAppDispatch, useAppState } from '../../context';
import { WidgetStateType } from '../../context/types';
import UploadService from '../upload-service/upload-service';
import { SERVICE_NAME } from '../../utils/consts';
import { CreateServiceNameSchema, ServiceNameType } from '../../types/search-service.schema';
import * as S from './filters.style';

type Status = WidgetStateType['status'];
type Sort = WidgetStateType['sort'];

function getChipType(currentStatus: Status, chipStatus: Status) {
  return currentStatus === chipStatus ? 'active' : 'unActive';
}

export default function Filters() {
  const [t] = useTr();
  const rule = createSchemaFieldRule(CreateServiceNameSchema(t));
  const [form] = Form.useForm<ServiceNameType>();
  const dispatch = useAppDispatch();
  const { status, sort } = useAppState();
  const [value, setValue] = useState('');
  const [isUploadModalOpen, toggleUploadModal] = useToggle(false);
  const [isInquiryModalOpen, toggleInquiryModal] = useToggle(false);

  useBounce(async () => {
    try {
      await form.validateFields();
      updateSearchTerm(dispatch, value?.trim());
    } catch {
      console.log('search input validation failed');
    }
  }, [value]);

  return (
    <>
      <S.Container>
        <Form form={form}>
          <S.Actions>
            <Form.Item name={SERVICE_NAME.ServiceName} rules={[rule]} style={{ width: '100%' }}>
              <S.Input
                value={value}
                placeholder={t('placeholder.search_by_english_name', { element: t('element.service') })}
                prefix={<i className='icon-search-normal' />}
                onChange={(e) => setValue(e.target.value)}
              />
            </Form.Item>

            <S.Buttons>
              {/* <S.Button onClick={toggleUploadModal} color='primary' variant='outlined'>
              {t('upload_service')}
            </S.Button> */}
              <S.Button onClick={toggleInquiryModal} color='primary' variant='solid'>
                {t('create_new_service')}
              </S.Button>
            </S.Buttons>
          </S.Actions>
        </Form>

        <S.Indicators>
          <S.Chips>
            <Chip
              iconProp={status == null ? 'checked icon-checkmark' : undefined}
              type={getChipType(status, null)}
              onClick={() => updateStatus(dispatch, null)}
            >
              {t('all_services')}
            </Chip>

            <S.Divider type='vertical' />

            <Chip
              iconProp={status === true ? 'checked icon-checkmark' : undefined}
              type={getChipType(status, true)}
              onClick={() => updateStatus(dispatch, true)}
            >
              {t('operational_services')}
            </Chip>

            <Chip
              iconProp={status === false ? 'checked icon-checkmark' : undefined}
              type={getChipType(status, false)}
              onClick={() => updateStatus(dispatch, false)}
            >
              {t('stopped_services')}
            </Chip>
          </S.Chips>

          <S.FilterPopover
            filters={[
              { key: 'ascending', title: t('common.ascending'), icon: 'icon-arrow-ascending' },
              { key: 'descending', title: t('common.descending'), icon: 'icon-arrow-descending' },
            ]}
            initialValue={sort}
            onChange={(value) => updateSort(dispatch, value as Sort)}
          />
        </S.Indicators>
      </S.Container>
      {isUploadModalOpen && <UploadService toggle={toggleUploadModal} isOpen={isUploadModalOpen} />}
      {/* {isInquiryModalOpen && <InquiryService toggle={toggleInquiryModal} isOpen={isInquiryModalOpen} />} */}
      {isInquiryModalOpen && <InquiryComponent type='service' dispatch={dispatch} toggle={toggleInquiryModal} />}
    </>
  );
}
