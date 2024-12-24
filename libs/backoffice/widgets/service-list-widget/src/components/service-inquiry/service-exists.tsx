import { RefObject } from 'react';
import { Flex, FormInstance, InputRef } from 'antd';

import { useTr } from '@oxygen/translation';
import { Button } from '@oxygen/ui-kit';
import { getValueOrDash } from '@oxygen/utils';

import { BoxSearch, ButtonLoading } from '../../assets';
import { ContentType } from './inquiry-service';
import { InquiryInfo } from '../../types/get-Inquiry-info.type';
import * as S from './service-exists.style';

type Props = {
  form: FormInstance<{
    [x: string]: string;
  }>;
  changeContent: (c: ContentType) => void;
  inputRef: RefObject<InputRef>;
  data?: InquiryInfo;
};

const ServiceExists: React.FC<Props> = ({ form, changeContent, inputRef, data }) => {
  const [t] = useTr();
  const info = data?.serviceGeneralInfo;
  const scopeInfo = info?.scopes?.[0];
  const inspectAnother = () => {
    form.resetFields();
    changeContent('searching');
    inputRef.current?.focus();
  };
  return (
    <Flex vertical gap={'3rem'} justify='center' align='center'>
      <S.TitleContainer>
        <BoxSearch />
        <S.StyledText>{t('already_exists')}</S.StyledText>
      </S.TitleContainer>
      <Flex align='center' justify='center' gap={'1rem'} style={{ width: '100%' }}>
        <S.Partition style={{ justifyContent: 'end' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <S.InfoTitle>{t('en_name')}</S.InfoTitle>
            <S.CenteredText>{getValueOrDash(info?.name)}</S.CenteredText>
          </div>
          <div>
            <S.InfoTitle>{t('desc')}</S.InfoTitle>
            <S.CenteredText> {getValueOrDash(info?.serviceInfoDescription)}</S.CenteredText>
          </div>
        </S.Partition>
        <S.StyledDivider orientation='center' type='vertical' variant='solid' />
        <S.Partition>
          <div>
            <S.InfoTitle>{t('scope_en_name')}</S.InfoTitle>
            <S.CenteredText>{getValueOrDash(scopeInfo?.description)}</S.CenteredText>
          </div>
          <div>
            <S.InfoTitle>{t('scope_fa_name')}</S.InfoTitle>
            <S.CenteredText> {getValueOrDash(scopeInfo?.name)}</S.CenteredText>
          </div>
        </S.Partition>
      </Flex>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          style={{ width: 'fit-content' }}
          block={false}
          icon={<ButtonLoading />}
          variant='outlined'
          onClick={inspectAnother}
        >
          {t('inspect_another')}
        </Button>
      </div>
    </Flex>
  );
};
export default ServiceExists;
