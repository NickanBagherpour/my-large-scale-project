import { Form, InputRef } from 'antd';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { LottieRefCurrentProps } from 'lottie-react';
import LazyLottie from 'libs/reusable-components/src/components/animation-loader/lazy-lottie';

import { useTr } from '@oxygen/translation';
import { Modal } from '@oxygen/ui-kit';

import searchAnimation from '../../assets/media/searching-Services.json';
import SearchBox from './search-box';
import ServiceExists from './service-exists';
import ServiceCreationAllowed from './service-creation-allowed';
import CompleteService from './complete-service';
import { InquiryInfo, InquiryParams, InquiryStatus } from '../../types/get-Inquiry-info.type';
import ServiceExistsInBAAM from './service-exists-in-BAAM';
import { useInquireService } from '../../services/get-inquiry.api';
import { ServiceNameType } from '../../types';
import { INQUIRY_STATUS } from '../../utils/consts';
import * as S from './inquiry-service.style';

type Props = {
  isOpen: boolean;
  toggle: () => void;
};
const defaultOptions = {
  autoplay: false,
  loop: true,
  animationData: searchAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
export type ContentType = 'searching' | InquiryStatus;
const InquiryService: React.FC<Props> = ({ isOpen, toggle }) => {
  const [t] = useTr();
  const [form] = Form.useForm<ServiceNameType>();
  const inputRef = useRef<InputRef>(null);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const [content, setContent] = useState<ContentType>('searching');
  const [fromSubmission, setFormSubmission] = useState(false);
  const [params, setParams] = useState<InquiryParams>({ 'service-name': '' });
  const [loading, setLoading] = useState(false);

  const formSubmitted = () => setFormSubmission(true);
  const startLoading = () => setLoading(true);
  const changeContent = (c: ContentType) => setContent(c);
  const changeParams = (v: InquiryParams) => setParams(v);
  const { data, refetch } = useInquireService(params);
  let mappedData: InquiryInfo | undefined;
  const code = data?.serviceInquiryStatus.code;
  if (code) {
    mappedData = {
      ...data,
      serviceInquiryStatus: { ...data?.serviceInquiryStatus, code: INQUIRY_STATUS[code] },
    };
  }

  useEffect(() => {
    const fetchData = async () => {
      if (fromSubmission) {
        const res = await refetch(); // Refetch data based on form submission
        const status = res?.data?.serviceInquiryStatus?.code;
        if (status) {
          setContent(INQUIRY_STATUS[status]);
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
    SERVICE_NOT_FOUND: <ServiceCreationAllowed />,
    SERVICE_ALREADY_EXISTS: (
      <ServiceExists data={mappedData} form={form} inputRef={inputRef} changeContent={changeContent} />
    ),
    SERVICE_IS_DRAFT: <CompleteService data={mappedData} />,
    SERVICE_EXISTS_IN_BAAM: <ServiceExistsInBAAM serviceName={mappedData?.serviceName} />,
    searching: <></>,
  };
  return (
    <Modal
      width={'42vw'}
      open={isOpen}
      centered={true}
      title={t('create_new_service')}
      footer={null}
      onClose={toggle}
      onCancel={toggle}
    >
      <SearchBox
        changeContent={changeContent}
        changeParams={changeParams}
        form={form}
        isLoading={loading}
        formSubmitted={formSubmitted}
        startLoading={startLoading}
        loadingAnimationRef={lottieRef}
        inputRef={inputRef}
      />
      <S.MainContainer $content={content}>
        <div style={{ display: content === 'searching' ? '' : 'none' }}>
          <LazyLottie lottieRef={lottieRef} height={'20rem'} width={'18rem'} {...defaultOptions} />
        </div>
        {contentDictionary[content]}
      </S.MainContainer>
    </Modal>
  );
};
export default InquiryService;
