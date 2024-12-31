import { LottieRefCurrentProps } from 'lottie-react';
import { Flex, Form, FormInstance, InputRef } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { MutableRefObject, RefObject } from 'react';

import { Button, Input } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';

import { ContentType } from './inquiry-service';
import { SearchInputIcon } from '../../assets';
import { InquiryParams } from '../../types/get-Inquiry-info.type';
import { ServiceName } from '../../types';
import { SERVICE_NAME } from '../../utils/consts';

import * as S from './search-box.style';

type Props = {
  form: FormInstance<{
    [x: string]: string;
  }>;
  changeContent: (c: ContentType) => void;
  loadingAnimationRef: MutableRefObject<LottieRefCurrentProps | null>;
  inputRef: RefObject<InputRef>;
  isLoading: boolean;
  startLoading: () => void;
  formSubmitted: () => void;
  changeParams: (v: InquiryParams) => void;
};
const SearchBox: React.FC<Props> = ({
  loadingAnimationRef,
  form,
  inputRef,
  startLoading,
  changeContent,
  formSubmitted,
  changeParams,
  isLoading,
}) => {
  const [t] = useTr();
  // const rule = createSchemaFieldRule(ServiceName(t));
  const onFinish = async (values: any) => {
    startLoading();
    changeContent('searching');
    loadingAnimationRef.current?.play();
    changeParams({ 'service-name': values?.serviceName });
    formSubmitted();
  };
  return (
    <Form layout={'vertical'} onFinish={onFinish} form={form}>
      <Flex gap={'1rem'}>
        <S.FormItem name={SERVICE_NAME.ServiceName}>
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
      </Flex>
    </Form>
  );
};
export default SearchBox;
