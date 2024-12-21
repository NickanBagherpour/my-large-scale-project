import { LottieRefCurrentProps } from 'lottie-react';
import { Flex, Form, FormInstance, InputRef } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { MutableRefObject, RefObject, useState } from 'react';

import { Button, Input } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';

import { SearchService } from '../../types';
import { ContentType } from './inquiry-service';
import { Search_SERVICE_NAMES } from '../../utils/consts';
import { SearchInputIcon } from '../../assets';
import * as S from './search-box.style';
import { useInquireService } from '../../services/get-inquiry.api';

type Props = {
  form: FormInstance<{
    [x: string]: string;
  }>;
  changeContent: (c: ContentType) => void;
  loadingAnimationRef: MutableRefObject<LottieRefCurrentProps | null>;
  inputRef: RefObject<InputRef>;
  isLoading?: boolean;
};
const SearchBox: React.FC<Props> = ({ loadingAnimationRef, form, changeContent, inputRef }) => {
  const [t] = useTr();
  const mutation = useInquireService();
  const rule = createSchemaFieldRule(SearchService(t));
  const [loading, setLoading] = useState(false); //later should be changed with a prop from api call
  const onFinish = (values: any) => {
    loadingAnimationRef.current?.play();
    setLoading(true);
    changeContent('searching');
    //get data then stop animation
    console.log('values', values);
    mutation.mutate(values);
    console.log('data', mutation);
    setLoading(false);
    // setTimeout(() => {
    //   loadingAnimationRef.current?.pause();
    //   changeContent('addService');
    //   setLoading(false);
    // }, 3000);
  };
  return (
    <Form layout={'vertical'} onFinish={onFinish} form={form}>
      <Flex gap={'1rem'}>
        <S.FormItem name={Search_SERVICE_NAMES.ServiceName} rules={[rule]}>
          <Input
            autoFocus={true}
            ref={inputRef}
            placeholder={t('placeholders.search_service_inspection')}
            prefix={<SearchInputIcon />}
            allowClear
          />
        </S.FormItem>
        <Button htmlType='submit' disabled={loading}>
          {' '}
          //add on click
          {t('buttons.inspect')}
        </Button>
      </Flex>
    </Form>
  );
};
export default SearchBox;
