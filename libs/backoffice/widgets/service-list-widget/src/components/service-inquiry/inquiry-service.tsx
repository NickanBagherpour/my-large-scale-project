import { Form, InputRef } from 'antd';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { LottieRefCurrentProps } from 'lottie-react';
import LazyLottie from 'libs/reusable-components/src/components/animation-loader/lazy-lottie';

import { useTr } from '@oxygen/translation';

import searchAnimation from '../../assets/media/searching-Services.json';
import SearchBox from './search-box';
import ServiceExists from './service-exists';
import { InquiryInfo } from '../../types/get-Inquiry-info.type';
import ServiceExistsInBAAM from './service-exists-in-BAAM';
import { useInquireService } from '../../services/get-inquiry.api';
import { ServiceNameType } from '../../types';
import { InquiryStatus } from '../../utils/consts';
import ServiceIncomplete from './service-incomplete';
import ServiceNotFound from './service-not-found';
import * as S from './inquiry-service.style';

const defaultOptions = {
  autoplay: false,
  loop: true,
  animationData: searchAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
export type ContentType = 'searching' | keyof typeof InquiryStatus;
type Props = {
  isOpen: boolean;
  toggle: () => void;
};

const InquiryService: React.FC<Props> = ({ isOpen, toggle }) => {
  const [t] = useTr();
  const [form] = Form.useForm<ServiceNameType>();
  const inputRef = useRef<InputRef>(null);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const [content, setContent] = useState<ContentType>('searching');
  const [fromSubmission, setFormSubmission] = useState(false);
  const [serviceName, setServiceName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const changeContent = (c: ContentType) => setContent(c);
  const { data, refetch } = useInquireService({ 'service-name': serviceName });
  let mappedData: InquiryInfo | undefined;
  const code = data?.serviceInquiryStatus.code;
  if (code) {
    mappedData = {
      ...data,
      serviceInquiryStatus: { ...data?.serviceInquiryStatus, code: InquiryStatus[code] as keyof typeof InquiryStatus },
    };
  }
  // coz i cant send parameters to refetch
  const handleFormSubmit = async (values: any) => {
    setLoading(true);
    setContent('searching');
    lottieRef.current?.play();
    setServiceName(values?.serviceName.trim());
    setFormSubmission(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      if (fromSubmission) {
        const res = await refetch(); // Refetch data based on form submission
        const status = res?.data?.serviceInquiryStatus?.code;
        if (status) {
          setContent(InquiryStatus[status] as ContentType);
        } else {
          setContent('searching');
        }
        lottieRef.current?.stop();
        setLoading(false);
      }
    };
    fetchData();
    return () => setFormSubmission(false);
  }, [fromSubmission]);

  const contentDictionary: { [key in ContentType]: ReactElement } = {
    SERVICE_NOT_FOUND: <ServiceNotFound serviceName={serviceName} />,
    SERVICE_ALREADY_EXISTS: (
      <ServiceExists data={mappedData} form={form} inputRef={inputRef} changeContent={changeContent} />
    ),
    SERVICE_IS_DRAFT: <ServiceIncomplete data={mappedData} />,
    SERVICE_EXISTS_IN_BAAM: <ServiceExistsInBAAM serviceName={mappedData?.serviceName ?? serviceName} />,
    searching: <></>,
  };
  return (
    <S.ResponsiveModal
      width={'42vw'}
      open={isOpen}
      centered={true}
      title={t('create_new_service')}
      footer={null}
      onClose={toggle}
      onCancel={toggle}
    >
      <SearchBox form={form} isLoading={loading} inputRef={inputRef} onFinish={handleFormSubmit} />
      <S.MainContainer $content={content}>
        <div style={{ display: content === 'searching' ? '' : 'none' }}>
          <LazyLottie lottieRef={lottieRef} height={'20rem'} width={'18rem'} {...defaultOptions} />
        </div>
        {contentDictionary[content]}
      </S.MainContainer>
    </S.ResponsiveModal>
  );
};
export default InquiryService;
