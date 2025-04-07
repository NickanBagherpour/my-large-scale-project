import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ROUTES } from '@oxygen/utils';
import { ContentType, Inquiry } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
import { useServiceFeeInquiry } from '../../services/inquire-service-fee.api';

type Props = {
  toggle: () => void;
  dispatch: any;
};
const ServiceFeeInquiry: React.FC<Props> = ({ toggle, dispatch }) => {
  const [searchValue, setSearchValue] = useState<string>();
  const changeSearchValue = (val?: string) => setSearchValue(val ?? '');
  const [content, setContent] = useState<ContentType | null>(null);
  const resetContent = () => setContent(null);
  const [t] = useTr();
  const router = useRouter();
  const { data, isSuccess, refetch, isFetching, isFetched, isPending, isRefetching, isLoading } = useServiceFeeInquiry(
    { 'service-name': searchValue ?? '' },
    dispatch
  );
  const name = data?.serviceName ?? searchValue;
  useEffect(() => {
    if (isSuccess && !isFetching && isFetched) {
      if (data.feeType) {
        setContent('IS_OPERATIONAL');
      } else {
        setContent('NOT_FOUND');
      }
    }
  }, [isFetching, isFetched, data]);
  const searchboxProps = {
    buttonText: t('service_search'),
    placeholderText: t('placeholder.search_by_english_name', { element: t(`element.service`) }),
  };
  const ItemExistsComponentProps = {
    titles: [t('en_name'), t('fa_name'), t('banking_share')],
    buttonInfo: {
      title: t('see_details'),
      action: () => router.push(ROUTES.BUSINESS.TARIFF_DETAILS + `?service-name=${name}`),
    },
    message: t('operational_message'),
  };
  const notFoundComponentProps = {
    buttonText: t('add_tarrif_settings'),
    title: t('allowed_creation'),
    buttonHref: ROUTES.BUSINESS.UPSERT_TARIFF + `?service-name=${name}`,
  };
  const operationalData = [
    data?.serviceName,
    data?.servicePersianName,
    data?.bankingShare ? data.bankingShare + '%' : null,
  ];
  return (
    <Inquiry
      dataLoading={isFetching || isRefetching || isLoading}
      refetch={refetch}
      content={content}
      operationalData={operationalData}
      resetContent={resetContent}
      searchValue={searchValue}
      changeSearchValue={changeSearchValue}
      modalTitle={t('add_tariff')}
      toggle={toggle}
      dispatch={dispatch}
      notFoundComponentProps={notFoundComponentProps}
      ItemExistsComponentProps={ItemExistsComponentProps}
      searchBoxProps={searchboxProps}
    />
  );
};
export default ServiceFeeInquiry;
