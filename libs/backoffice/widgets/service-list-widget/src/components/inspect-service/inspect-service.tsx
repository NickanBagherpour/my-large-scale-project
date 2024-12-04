import { useTr } from '@oxygen/translation';
import { Button, Divider, Input, Modal } from '@oxygen/ui-kit';
import { SearchService, SearchServiceType } from '../../types';
import { Form, InputRef } from 'antd';
import { Search_SERVICE_NAMES } from '../../utils/consts';
import { createSchemaFieldRule } from 'antd-zod';
import searchAnimation from '../../assets/media/searching-Services.json';
import LazyLottie from 'libs/reusable-components/src/components/animation-loader/lazy-lottie';
import { useRef, useState } from 'react';
import { LottieRefCurrentProps } from 'lottie-react';
import { BoxSearch, ButtonLoading, SearchInputIcon } from '../../assets';
import * as S from './inspect-service.style';
type Props = {
  isOpen: boolean;
  toggle: () => void;
};
export type ContentType = 'searching' | 'addService' | 'completeService' | 'alreadyExists';
const InspectService: React.FC<Props> = ({ isOpen, toggle }) => {
  const [t] = useTr();
  const [form] = Form.useForm<SearchServiceType>();
  const inputRef = useRef<InputRef>(null);
  const rule = createSchemaFieldRule(SearchService(t));
  const onFinish = () => {
    setContent('searching');
    lottieRef.current?.play();
    //get data then stop animation
    setTimeout(() => {
      lottieRef.current?.pause();
      setContent('alreadyExists');
    }, 3000);
  };
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const [content, setContent] = useState<ContentType>('searching');

  // Lottie options
  const defaultOptions = {
    autoplay: false,
    loop: true, // Make it play once (you can set it to true if you want it to loop)
    animationData: searchAnimation, // Imported animation JSON
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const inspectAnother = () => {
    form.resetFields();
    setContent('searching');
    inputRef.current?.focus();
  };
  return (
    <Modal
      width={'40vw'}
      open={isOpen}
      centered={true}
      title={t('create_new_service')}
      footer={null}
      onClose={toggle}
      onCancel={toggle}
    >
      <Form layout={'vertical'} onFinish={onFinish} form={form}>
        <S.FormRow style={{ padding: 0 }}>
          <S.FormItem name={Search_SERVICE_NAMES.SearchService} rules={[rule]}>
            <Input
              allowClear
              autoFocus={true}
              ref={inputRef}
              placeholder={t('placeholders.search_service_inspection')}
              prefix={<SearchInputIcon />}
            />
          </S.FormItem>
          <Button htmlType='submit'>{t('buttons.inspect')}</Button>
        </S.FormRow>
      </Form>
      <S.MainContainer $content={content}>
        {content === 'searching' && (
          <LazyLottie lottieRef={lottieRef} height={'15rem'} width={'18rem'} {...defaultOptions} />
        )}
        {content === 'alreadyExists' && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '3rem',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <S.TitleContainer>
              <BoxSearch />
              <div>{t('already_exists')}</div>
            </S.TitleContainer>
            <S.TextContainer>
              <S.Partition>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <S.InfoTitle>{t('en_name')}</S.InfoTitle>
                  svc-gfg-bhhj-ngdc-zxzxc-zxc
                </div>
                <div>
                  <S.InfoTitle>{t('desc')}</S.InfoTitle>
                  دریافت کد‌های ملی متعلق به یک شماره موبایل
                </div>
              </S.Partition>
              <S.StyledDivider orientation='center' type='vertical' variant='solid' />
              <S.Partition>
                <div>
                  <S.InfoTitle>{t('scope_en_name')}</S.InfoTitle>
                  samat-lc-gutr-del
                </div>
                <div>
                  <S.InfoTitle>{t('scope_fa_name')}</S.InfoTitle>
                  سمات آی تی
                </div>
              </S.Partition>
            </S.TextContainer>
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
          </div>
        )}
      </S.MainContainer>
    </Modal>
  );
};
export default InspectService;
