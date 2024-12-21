import { Form, InputRef } from 'antd';
import { useRef, useState } from 'react';
import { LottieRefCurrentProps } from 'lottie-react';
import LazyLottie from 'libs/reusable-components/src/components/animation-loader/lazy-lottie';

import { useTr } from '@oxygen/translation';
import { Modal } from '@oxygen/ui-kit';

import { SearchServiceType } from '../../types';
import searchAnimation from '../../assets/media/searching-Services.json';
import SearchBox from './search-box';
import ServiceExists from './service-exists';
import ServiceCreationAllowed from './service-creation-allowed';
import CompleteService from './complete-service';

import * as S from './inquiry-service.style';

type Props = {
  isOpen: boolean;
  toggle: () => void;
};
export type ContentType = 'searching' | 'addService' | 'completeService' | 'alreadyExists';
const InquiryService: React.FC<Props> = ({ isOpen, toggle }) => {
  const [t] = useTr();
  const [form] = Form.useForm<SearchServiceType>();
  const inputRef = useRef<InputRef>(null);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const [content, setContent] = useState<ContentType>('searching');

  const changeContent = (c: ContentType) => setContent(c);

  const defaultOptions = {
    autoplay: false,
    loop: true,
    animationData: searchAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const contentDictionary = {
    addService: <ServiceCreationAllowed />,
    alreadyExists: (
      <ServiceExists form={form} inputRef={inputRef} changeContent={changeContent} loadingAnimationRef={lottieRef} />
    ),
    completeService: <CompleteService id='111' />,
    searching: <LazyLottie lottieRef={lottieRef} height={'15rem'} width={'18rem'} {...defaultOptions} />,
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
      <SearchBox form={form} changeContent={changeContent} loadingAnimationRef={lottieRef} inputRef={inputRef} />
      <S.MainContainer $content={content}>{contentDictionary[content]}</S.MainContainer>
    </Modal>
  );
};
export default InquiryService;
