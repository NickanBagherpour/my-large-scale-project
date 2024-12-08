import { Form } from 'antd';

import { Input, SearchItemsContainer } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';

import * as S from './name-inputs.style';

export type NameInputsProps = {
  //
};
export const NameInputs: React.FC<NameInputsProps> = (props) => {
  const { t } = useTr();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  return (
    <S.NameInputContainer>
      <Form form={form} name='advanced_search' onFinish={onFinish}>
        <SearchItemsContainer style={{ '--grid-column-count': '2' } as React.CSSProperties}>
          <Form.Item>
            <S.NameInputLabel>{t('english_name')}</S.NameInputLabel>
            <S.Input />
          </Form.Item>
          <Form.Item>
            <S.NameInputLabel>{t('persian_name')}</S.NameInputLabel>
            <S.Input />
          </Form.Item>
        </SearchItemsContainer>
      </Form>
    </S.NameInputContainer>
  );
};
