import { Form, FormInstance, InputRef } from 'antd';
import { RefObject } from 'react';
import { createSchemaFieldRule } from 'antd-zod';
import { useTr } from '@oxygen/translation';
import { Button, Input } from '@oxygen/ui-kit';
import { CreateInquirySchema } from './inquiry.schema';
import { INQUIRY } from './consts';
import { InquiryType } from './types';
import * as S from './search-box.style';

type Props = {
  form: FormInstance<{ name: string }>;
  onFinish: ((values: { name: string }) => void) | undefined;
  inputRef: RefObject<InputRef | null>;
  isLoading: boolean;
  type: InquiryType;
};
const SearchBox: React.FC<Props> = ({ form, inputRef, onFinish, isLoading, type }) => {
  const [t] = useTr();
  const rule = createSchemaFieldRule(CreateInquirySchema(t, type));
  return (
    <Form layout={'vertical'} onFinish={onFinish} form={form}>
      <S.Container>
        <S.FormItem rules={[rule]} name={INQUIRY.ItemName}>
          <Input
            autoFocus={true}
            ref={inputRef}
            placeholder={t('placeholder.search_by_english_name', { element: t(`element.${type}`) })}
            prefix={<i className='search-normal' />}
            allowClear
          />
        </S.FormItem>
        <Button htmlType='submit' onClick={form.submit} disabled={isLoading}>
          {t('button.inquire_item', { element: t(`element.${type}`) })}
        </Button>
      </S.Container>
    </Form>
  );
};
export default SearchBox;
