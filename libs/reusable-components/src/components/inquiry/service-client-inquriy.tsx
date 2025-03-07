import { useEffect, useState } from 'react';
import { useTr } from '@oxygen/translation';
import { InquiryType } from './types';
import { useInquiry } from './get-inquiry.api';
import { InquiryStatus, NAVIGATION_URLS } from './consts';
import { extractSpecificData } from './utils';
import Inquiry from './inquiry';
import { ROUTES } from '@oxygen/utils';
import Router from 'next/router';
import { ItemNotFoundProps } from './item-not-found';
import { SearchBoxProps } from './search-box';
import { useRouter } from 'next/navigation';
import { useUploadItemMutation } from './upload-item.api';
import { ExistsInBamProps } from './item-exists-in-BAAM';
import { IsDraftProps } from './item-is-draft';

type Props = {
  type: InquiryType;
  toggle: () => void;
  dispatch: any;
};
export type ContentType = keyof typeof InquiryStatus;

const ServiceClientInquiry: React.FC<Props> = ({ toggle, dispatch, type }) => {
  const [t] = useTr();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [content, setContent] = useState<ContentType | null>();
  const { data, isSuccess, refetch, isFetching, isFetched, isStale } = useInquiry(
    type,
    { name: searchValue },
    dispatch
  );
  const resetContent = () => setContent(null);
  const changeSearchValue = (val?: string) => setSearchValue(val ?? '');
  let draftData;
  const statusCode = data?.[`${type}InquiryStatus`]?.code;
  if (statusCode) {
    draftData = {
      itemName: data?.[`${type}Name`],
      progress: data?.[`${type}Progress`]?.percent,
    };
  }
  const itemTranslation = { element: t(`element.${type}`) };
  const name = data?.[`${type}Name`] ?? searchValue;

  const operationalData = extractSpecificData(t, data);
  const navigateToItemCreation = () => router.push(NAVIGATION_URLS[type] + `${name}`);
  const { mutate: uploadService, isPending: uploadPending } = useUploadItemMutation(navigateToItemCreation, dispatch);
  const handleExistsInBamAction = () => (type === 'service' ? uploadService(name) : navigateToItemCreation());
  useEffect(() => {
    if (isSuccess && !isFetching && isFetched) {
      const status = data?.[`${type}InquiryStatus`]?.title;
      if (status) {
        const mappedStatus = status?.slice(status.indexOf('_') + 1);
        setContent(mappedStatus);
      }
    }
  }, [isFetching, isFetched, data]);

  const buttonInfo = {
    service: {
      title: t('button.inspect_another_service'),
      icon: <i className='icon-reload' />,
    },
    client: {
      title: t('button.observe_client_detail'),
      icon: <i className='icon-document' />,
      action: () => {
        Router.push(ROUTES.BACKOFFICE.CLIENT_DETAILS + `?client-name=${name}`);
      },
    },
  };
  const currentButtonInfo = buttonInfo[type];
  const titles: Record<InquiryType, string[]> = {
    service: [t('uikit.en_service_name'), t('uikit.desc'), t('uikit.element_en_name', { element: t('element.scope') })],
    client: [
      t('uikit.organization_name'),
      t('uikit.organization_id'),
      t('uikit.aggrigator_status'),
      t('uikit.representative_name'),
    ],
  };
  const itemExistsProps = {
    buttonInfo: currentButtonInfo,
    titles: titles[type],
    message: t('uikit.item_already_exists', itemTranslation),
  };
  const searchboxProps = {
    buttonText: t('button.inquire_item', itemTranslation),
    placeholderText: t('placeholder.search_by_english_name', itemTranslation),
  } satisfies Partial<SearchBoxProps>;
  const existsInBamComponentProps = {
    message: t('uikit.allowed_creation_BAAM', itemTranslation),
    buttonAction: handleExistsInBamAction,
    buttonLoading: uploadPending,
    buttonText: t('button.upload_item', itemTranslation),
  } satisfies Partial<ExistsInBamProps>;
  const draftComponentProps = {
    buttonText: t('button.complete_item_info', itemTranslation),
    message: t('uikit.complete_item_info', itemTranslation),
    buttonHref: `${NAVIGATION_URLS[type]}${name}`,
  } satisfies Partial<IsDraftProps>;
  const notFoundProps = {
    buttonText: t('button.create_new_item', itemTranslation),
    title: t('uikit.allowed_creation', itemTranslation),
    buttonHref: NAVIGATION_URLS[type] + `${name}`,
  } satisfies Partial<ItemNotFoundProps>;
  return (
    <Inquiry
      refetch={refetch}
      resetContent={resetContent}
      modalTitle={t('button.create_new_item', itemTranslation)}
      notFoundComponentProps={notFoundProps}
      content={content}
      searchValue={searchValue}
      changeSearchValue={changeSearchValue}
      existsInBamComponentProps={existsInBamComponentProps}
      draftComponentProps={draftComponentProps}
      toggle={toggle}
      dispatch={dispatch}
      draftData={draftData}
      operationalData={operationalData}
      ItemExistsComponentProps={itemExistsProps}
      searchBoxProps={searchboxProps}
      dataLoading={isFetching}
    />
  );
};
export default ServiceClientInquiry;
