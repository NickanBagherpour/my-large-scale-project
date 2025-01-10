import { Form, FormInstance, InputRef } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { RefObject } from 'react';

import { Button, Input } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';

import { SearchInputIcon } from '../../assets';
import { SERVICE_NAME } from '../../utils/consts';
import { CreateServiceInquirySchema } from '../../types/inquire-service.schema';

import * as S from './search-box.style';

type Props = {
  form: FormInstance<{
    [x: string]: string;
  }>;
  onFinish: ((values: { [x: string]: string }) => void) | undefined;
  inputRef: RefObject<InputRef>;
  isLoading: boolean;
};
const SearchBox: React.FC<Props> = ({ form, inputRef, onFinish, isLoading }) => {
  const [t] = useTr();
  const rule = createSchemaFieldRule(CreateServiceInquirySchema(t));

  return (
    <Form layout={'vertical'} onFinish={onFinish} form={form}>
      <S.Container>
        <S.FormItem rules={[rule]} name={SERVICE_NAME.ServiceName}>
          <Input
            autoFocus={true}
            ref={inputRef}
            placeholder={t('placeholders.search_service_inspection')}
            prefix={<SearchInputIcon />}
            allowClear
          />
        </S.FormItem>
        <Button htmlType='submit' onClick={form.submit} disabled={isLoading}>
          {t('buttons.inspect')}
        </Button>
      </S.Container>
    </Form>
  );
};
export default SearchBox;
