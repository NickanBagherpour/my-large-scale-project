import { TFunction } from 'i18next';
import { LottieRefCurrentProps } from 'lottie-react';
import { Form, InputRef } from 'antd';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { useTr } from '@oxygen/translation';
import searchAnimation from '../../assets/media/searching-Services.json';
import { InquiryDto, InquiryType } from './types';
import LazyLottie from '../animation-loader/lazy-lottie';
import { useInquiry } from './get-inquiry.api';
import { InquiryItemNameType } from './inquiry.schema';
import SearchBox from './search-box';
import { InquiryStatus } from './consts';
import ItemNotFound from './item-not-found';
import ItemExists from './item-exists';
import ItemIncomplete from './item-incomplete';
import ItemExistsInBAAM from './item-exists-in-BAAM';
import { isServiceInquiryDto } from './utils';
import * as S from './inquiry-component.style';

type Props = {
  type: InquiryType;
  toggle: () => void;
  dispatch: any;
};
const defaultOptions = {
  autoplay: false,
  loop: true,
  animationData: searchAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
export type ContentType = 'searching' | keyof typeof InquiryStatus;

const InquiryComponent: React.FC<Props> = ({ toggle, dispatch, type }) => {
  const [t] = useTr();
  const [form] = Form.useForm<InquiryItemNameType>();
  const inputRef = useRef<InputRef | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const [content, setContent] = useState<ContentType>('searching');
  const [fromSubmission, setFormSubmission] = useState({ isSubmitted: false, itemName: '' });
  // const [itemName, setItemName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const changeContent = (c: ContentType) => setContent(c);
  const { data, refetch } = useInquiry(type, { name: fromSubmission.itemName }, dispatch);
  let generalData;
  const name = generalData?.itemName ?? fromSubmission.itemName;
  const statusCode = data?.[`${type}InquiryStatus`]?.code;
  if (statusCode) {
    generalData = {
      itemName: data?.[`${type}Name`],
      progress: data?.[`${type}Progress`]?.percent,
    };
  }

  const specificData = extractSpecificData(t, data);
  // coz i cant send parameters to refetch
  const handleFormSubmit = async (values: { name: string }) => {
    setLoading(true);
    setContent('searching');
    lottieRef.current?.play();
    setFormSubmission({ isSubmitted: true, itemName: values?.name?.trim() });
  };
  const resetSearchResult = () => {
    if (content !== 'searching') {
      setContent('searching');
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (fromSubmission.isSubmitted) {
        const res = await refetch(); // Refetch data based on form submission
        const status = res?.data?.[`${type}InquiryStatus`]?.title;
        if (status) {
          const mappedStatus = status?.slice(status.indexOf('_') + 1);
          setContent(mappedStatus);
        } else {
          setContent('searching');
        }
        lottieRef.current?.stop();
        setLoading(false);
      }
    };
    fetchData();
    return () => setFormSubmission({ ...fromSubmission, isSubmitted: false });
  }, [fromSubmission.isSubmitted]);

  const contentDictionary: { [key in ContentType]: ReactElement } = {
    NOT_FOUND: <ItemNotFound type={type} itemName={fromSubmission.itemName} />,
    IS_OPERATIONAL: (
      <ItemExists
        itemName={name}
        type={type}
        data={specificData as any}
        form={form}
        inputRef={inputRef}
        changeContent={changeContent}
      />
    ),
    IS_DRAFT: <ItemIncomplete type={type} data={generalData} />,
    EXISTS_IN_BAM: <ItemExistsInBAAM type={type} dispatch={dispatch} itemName={name} />,
    searching: <></>,
  };
  return (
    <S.ResponsiveModal
      width={'42vw'}
      open={true}
      centered={true}
      title={t('button.create_new_item', { element: t(`element.${type}`) })}
      footer={null}
      onClose={toggle}
      onCancel={toggle}
    >
      <SearchBox
        type={type}
        form={form}
        isLoading={loading}
        inputRef={inputRef}
        onFinish={handleFormSubmit}
        onFormValueChange={resetSearchResult}
      />
      <S.MainContainer $content={content}>
        <div style={{ display: content === 'searching' ? '' : 'none' }}>
          <LazyLottie lottieRef={lottieRef} height={'20rem'} width={'18rem'} {...defaultOptions} />
        </div>
        {contentDictionary[content]}
      </S.MainContainer>
    </S.ResponsiveModal>
  );
};
export default InquiryComponent;

function extractSpecificData(t: TFunction, data?: InquiryDto) {
  if (data) {
    return isServiceInquiryDto(data)
      ? [data.serviceName, data.servicePersianName, data.scopes?.map((s) => s.name)]
      : [
          data.organizationInfo?.organizationName,
          data.organizationInfo?.organizationId,
          data.organizationInfo?.isAggregator
            ? t('common.has') +
              (data?.organizationInfo?.aggregatorName ? '-' + data?.organizationInfo?.aggregatorName : '')
            : t('common.doesnt_have'),
          data.organizationInfo?.representative?.nameAndLastName,
        ];
  } else return [];
}
