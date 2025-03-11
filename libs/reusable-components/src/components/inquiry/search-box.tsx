import { Form, FormInstance, InputRef } from 'antd';
import { RefObject } from 'react';
import { createSchemaFieldRule } from 'antd-zod';
import { useTr } from '@oxygen/translation';
import { Button, Input } from '@oxygen/ui-kit';
import { CreateInquirySchema } from './inquiry.schema';
import { INQUIRY } from './consts';
import * as S from './search-box.style';

export type SearchBoxProps = {
  form: FormInstance<{ name: string }>;
  onFinish: ((values: { name: string }) => void) | undefined;
  inputRef: RefObject<InputRef | null>;
  isLoading?: boolean;
  onFormValueChange: () => void;
  buttonText?: string;
  placeholderText?: string;
};
const SearchBox: React.FC<SearchBoxProps> = ({
  form,
  inputRef,
  onFinish,
  isLoading,
  onFormValueChange,
  buttonText,
  placeholderText,
}) => {
  const [t] = useTr();
  const rule = createSchemaFieldRule(CreateInquirySchema(t));
  return (
    <Form onValuesChange={() => onFormValueChange()} layout={'vertical'} onFinish={onFinish} form={form}>
      <S.Container>
        <S.FormItem rules={[rule]} name={INQUIRY.ItemName}>
          <Input
            autoFocus={true}
            ref={inputRef}
            placeholder={placeholderText ?? t('placeholder.search_by_english_name', { element: t(`element.service`) })}
            prefix={<i className='icon-search-normal' />}
            allowClear={!isLoading}
            maxLength={100}
          />
        </S.FormItem>
        <Button htmlType='submit' onClick={form.submit} disabled={isLoading}>
          {buttonText ?? t('button.inquire_item', { element: t(`element.service`) })}
        </Button>
      </S.Container>
    </Form>
  );
};
export default SearchBox;
