import { MutableRefObject, RefObject } from 'react';
import { Flex, FormInstance, InputRef } from 'antd';
import { Text } from 'libs/ui-kit/src/typography/typography.style';

import { useTr } from '@oxygen/translation';
import { Button } from '@oxygen/ui-kit';

import { BoxSearch, ButtonLoading } from '../../assets';
import { ContentType } from './inspect-service';
import * as S from './service-exists.style';
import { LottieRefCurrentProps } from 'lottie-react';

type Props = {
  form: FormInstance<{
    [x: string]: string;
  }>;
  changeContent: (c: ContentType) => void;
  inputRef: RefObject<InputRef>;
  loadingAnimationRef: MutableRefObject<LottieRefCurrentProps | null>;
};

const ServiceExists: React.FC<Props> = ({ form, changeContent, inputRef, loadingAnimationRef }) => {
  const [t] = useTr();

  const inspectAnother = () => {
    form.resetFields();
    changeContent('searching');
    loadingAnimationRef.current?.play();
    inputRef.current?.focus();
  };
  return (
    <Flex vertical gap={'3rem'} justify='center' align='center'>
      <S.TitleContainer>
        <BoxSearch />
        <S.StyledText>{t('already_exists')}</S.StyledText>
      </S.TitleContainer>
      <Flex gap={'1rem'}>
        <S.Partition>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <S.InfoTitle>{t('en_name')}</S.InfoTitle>
            <Text>svc-gfg-bhhj-ngdc-zxzxc-zxc</Text>
          </div>
          <div>
            <S.InfoTitle>{t('desc')}</S.InfoTitle>
            <Text> دریافت کد‌های ملی متعلق به یک شماره موبایل</Text>
          </div>
        </S.Partition>
        <S.StyledDivider orientation='center' type='vertical' variant='solid' />
        <S.Partition>
          <div>
            <S.InfoTitle>{t('scope_en_name')}</S.InfoTitle>
            <Text>samat-lc-gutr-del</Text>
          </div>
          <div>
            <S.InfoTitle>{t('scope_fa_name')}</S.InfoTitle>
            <Text> سمات آی تی</Text>
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
