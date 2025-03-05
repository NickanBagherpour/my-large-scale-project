import { createSchemaFieldRule } from 'antd-zod';
import { Form } from 'antd';
import { useState } from 'react';
import { useTr } from '@oxygen/translation';
import { useBounce } from '@oxygen/hooks';
import { updateSearchTerm, useAppDispatch } from '../../context';
import { CLIENT_REPORT_NAME } from '../../utils/consts';
import { ClientReportNameSchema, ClientReportNameType } from '../../types/search-client-report.schema';
import * as S from './filters.style';

export default function Filters() {
  const [t] = useTr();
  const rule = createSchemaFieldRule(ClientReportNameSchema(t));
  const [form] = Form.useForm<ClientReportNameType>();
  const dispatch = useAppDispatch();

  const [value, setValue] = useState('');

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
      <Form form={form}>
        <S.Actions>
          <Form.Item name={CLIENT_REPORT_NAME.clientReportName} rules={[rule]} style={{ width: '100%' }}>
            <S.Input
              value={value}
              placeholder={t('placeholder.search_by_english_name', { element: t('element.client') })}
              prefix={<i className='icon-search-normal' />}
              onChange={(e) => setValue(e.target.value)}
            />
          </Form.Item>
        </S.Actions>
      </Form>
    </S.Container>
  );
}
