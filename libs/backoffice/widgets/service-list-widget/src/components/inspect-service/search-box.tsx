import { Form, FormInstance, InputRef } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { SearchService } from '../../types';
import { ContentType } from './inspect-service';
import { MutableRefObject, RefObject } from 'react';
import { Search_SERVICE_NAMES } from '../../utils/consts';
import { Button, Input } from '@oxygen/ui-kit';
import { SearchInputIcon } from '../../assets';
import { useTr } from '@oxygen/translation';
import { LottieRefCurrentProps } from 'lottie-react';
import * as S from './search-box.style';
type Props = {
  form: FormInstance<{
    [x: string]: string;
  }>;
  changeContent: (c: ContentType) => void;
  loadingAnimationRef: MutableRefObject<LottieRefCurrentProps | null>;
  inputRef: RefObject<InputRef>;
};
const SearchBox: React.FC<Props> = ({ loadingAnimationRef, form, changeContent, inputRef }) => {
  const [t] = useTr();
  const rule = createSchemaFieldRule(SearchService(t));
  const onFinish = () => {
    changeContent('searching');
    loadingAnimationRef.current?.play();
    //get data then stop animation
    setTimeout(() => {
      loadingAnimationRef.current?.pause();
      changeContent('alreadyExists');
    }, 3000);
  };
  return (
    <Form layout={'vertical'} onFinish={onFinish} form={form}>
      <S.FormRow style={{ padding: 0 }}>
        <S.FormItem name={Search_SERVICE_NAMES.SearchService} rules={[rule]}>
          <Input
            autoFocus={true}
            ref={inputRef}
            placeholder={t('placeholders.search_service_inspection')}
            prefix={<SearchInputIcon />}
          />
        </S.FormItem>
        <Button htmlType='submit'>{t('buttons.inspect')}</Button>
      </S.FormRow>
    </Form>
  );
};
export default SearchBox;
