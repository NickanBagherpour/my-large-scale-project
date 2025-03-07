import { ContentType, Inquiry } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
import { useEffect, useState } from 'react';
import { useServiceFeeInquiry } from '../../services/inquire-service-fee.api';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@oxygen/utils';

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
  const { data, isSuccess, refetch, isFetching, isFetched } = useServiceFeeInquiry(
    { 'service-name': searchValue ?? '' },
    dispatch
  );
  useEffect(() => {
    if (isSuccess && !isFetching && isFetched) {
      if (data.serviceName) {
        setContent('IS_OPERATIONAL');
      } else {
        setContent('NOT_FOUND');
      }
    }
  }, [isFetching, isFetched, data]);

  const itemTranslation = { element: t(`element.service`) };
  const searchboxProps = {
    buttonText: t('button.inquire_item', itemTranslation),
    placeholderText: t('placeholder.search_by_english_name', itemTranslation),
  };
  return (
    <Inquiry
      refetch={refetch}
      content={content}
      operationalData={[data?.serviceName, data?.servicePersianName, data?.bankingShare]}
      resetContent={resetContent}
      searchValue={searchValue}
      changeSearchValue={changeSearchValue}
      modalTitle={t('add_tariff')}
      toggle={toggle}
      dispatch={dispatch}
      notFoundComponentProps={{
        buttonText: t('add_tarrif_settings'),
        title: t('allowed_creation'),
        buttonHref: ROUTES.BUSINESS.TARIFF_DETAILS,
      }}
      ItemExistsComponentProps={{
        titles: [t('en_name'), t('fa_name'), t('banking_share')],
        buttonInfo: { title: t('see_details'), action: () => router.push(ROUTES.BUSINESS.TARIFF_DETAILS) },
      }}
      searchBoxProps={searchboxProps}
    />
  );
};
export default ServiceFeeInquiry;
