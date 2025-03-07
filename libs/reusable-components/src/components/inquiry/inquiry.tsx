import { LottieRefCurrentProps } from 'lottie-react';
import { Form, InputRef } from 'antd';
import { ReactElement, useEffect, useRef } from 'react';
import searchAnimation from '../../assets/media/searching-Services.json';
import LazyLottie from '../animation-loader/lazy-lottie';
import { InquiryItemNameType } from './inquiry.schema';
import SearchBox from './search-box';
import { InquiryStatus } from './consts';
import ItemNotFound, { ItemNotFoundProps } from './item-not-found';
import ItemExists from './item-exists';
import ItemExistsInBAAM from './item-exists-in-BAAM';
import ItemIsDraft from './item-is-draft';
import * as S from './inquiry.style';

type Props = {
  refetch?: any;
  dataLoading?: boolean;
  draftData: { itemName: string; progress: number };
  operationalData: any[];
  content?: ContentType | null;
  resetContent: () => void;
  searchValue: string;
  changeSearchValue: (val?: string) => void;
  modalTitle: string;
  toggle: () => void;
  dispatch: (string | number | undefined)[];
  notFoundComponentProps: any;
  ItemExistsComponentProps: any;
  existsInBamComponentProps: any;
  draftComponentProps: any;
  searchBoxProps: any;
  searchboxForm?: any;
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

const Inquiry: React.FC<Props> = ({
  refetch,
  toggle,
  dispatch,
  content,
  resetContent,
  draftData,
  operationalData,
  dataLoading,
  changeSearchValue,
  searchValue,
  notFoundComponentProps,
  ItemExistsComponentProps,
  existsInBamComponentProps,
  draftComponentProps,
  searchBoxProps,
  searchboxForm,
  modalTitle,
}) => {
  const [form] = Form.useForm<InquiryItemNameType>();
  const finalForm = searchboxForm ?? form;
  const inputRef = useRef<InputRef | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  const name = draftData?.itemName ?? searchValue;

  const handleFormSubmit = async (values: { name: string }) => {
    resetContent();
    // lottieRef.current?.play();
    const val = values?.name?.trim();
    if (val === searchValue) {
      refetch?.();
    } else {
      changeSearchValue(val);
    }
  };
  const resetSearchResult = () => {
    if (content) {
      resetContent();
    }
  };
  useEffect(() => {
    if (!dataLoading) {
      lottieRef?.current?.stop();
    } else {
      lottieRef?.current?.play();
    }
  }, [dataLoading]);

  const contentDictionary: { [key in ContentType]: ReactElement } = {
    NOT_FOUND: <ItemNotFound {...(notFoundComponentProps as ItemNotFoundProps)} />,
    IS_OPERATIONAL: (
      <ItemExists
        data={operationalData}
        form={finalForm}
        inputRef={inputRef}
        changeShowSearching={resetContent}
        {...ItemExistsComponentProps}
      />
    ),
    IS_DRAFT: <ItemIsDraft data={draftData} {...draftComponentProps} />,
    EXISTS_IN_BAM: <ItemExistsInBAAM dispatch={dispatch} itemName={name} {...existsInBamComponentProps} />,
    searching: <></>,
  };
  return (
    <S.ResponsiveModal
      width={'42vw'}
      open={true}
      centered={true}
      title={modalTitle}
      footer={null}
      onClose={toggle}
      onCancel={toggle}
    >
      <SearchBox
        form={finalForm}
        isLoading={dataLoading}
        inputRef={inputRef}
        onFinish={handleFormSubmit}
        onFormValueChange={resetSearchResult}
        {...searchBoxProps}
      />
      <S.MainContainer $showSearch={!content}>
        <div style={{ display: !content ? '' : 'none' }}>
          <LazyLottie lottieRef={lottieRef} height={'20rem'} width={'18rem'} {...defaultOptions} />
        </div>
        {content && contentDictionary[content]}
      </S.MainContainer>
    </S.ResponsiveModal>
  );
};
export default Inquiry;
