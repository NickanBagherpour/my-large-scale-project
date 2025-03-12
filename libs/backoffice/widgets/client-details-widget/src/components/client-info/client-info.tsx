import { useTr } from '@oxygen/translation';
import { Button, Chip, InfoBox, Loading } from '@oxygen/ui-kit';
import * as S from './client-info.style';
import { useGetClientInfoQuery } from '../../services';
import { aggregatorStatusDisplay, ROUTES } from '@oxygen/utils';
import { useClientName } from '../../utils/use-client-name';
import { NoResult } from '@oxygen/reusable-components';
import { useEffect } from 'react';
import { PageTitle } from '../../types';
import type { InfoItemType } from '@oxygen/types';
import { repTypeMap } from '../../utils/const';

type Props = {
  updateTitle: ({ persian, english }: PageTitle) => void;
};

export default function ClientInfo(props: Props) {
  const { updateTitle } = props;
  const [t] = useTr();
  const clientName = useClientName();
  const { data: clientInfo, isError } = useGetClientInfoQuery(clientName);

  useEffect(() => {
    if (clientInfo?.clientPersianName) {
      const { clientPersianName, clientEnglishName } = clientInfo;
      updateTitle({ english: clientEnglishName, persian: clientPersianName });
    }
  }, [clientInfo, updateTitle]);

  if (isError) return <NoResult />;
  if (!clientInfo) return <Loading />;

  const {
    clientKey,
    tagIds,
    websiteUrl,
    redirectUrl,
    clientTypeName,
    inboundAddress,
    isClientFlow,
    isImplicitFlow,
    isPasswordFlow,
    isAuthorizationFlow,
    isRefreshToken,
    authorizationKey,
    organizationInfo,
    clientEnglishName,
    clientPersianName,
    description,
  } = clientInfo;

  const grantType = [
    {
      name: t('authorization_flow'),
      isActive: isAuthorizationFlow,
    },
    {
      name: t('client_flow'),
      isActive: isClientFlow,
    },
    {
      name: t('implicit_flow'),
      isActive: isImplicitFlow,
    },
    {
      name: t('password_flow'),
      isActive: isPasswordFlow,
    },
    {
      name: t('refresh_token'),
      isActive: isRefreshToken,
    },
  ].reduce((acc, type) => (type.isActive ? acc.concat(type.name) : acc), [] as string[]);

  const clientInfoData = [
    { key: t('english_client_name'), value: clientEnglishName },
    { key: t('persian_client_name'), value: clientPersianName },
    { key: t('client_type'), value: clientTypeName },
    { key: t('client_id'), value: clientKey },
    { key: t('authentication_id'), value: authorizationKey },
    { key: t('website_address'), value: websiteUrl },
    { key: t('input_address'), value: inboundAddress },
    { key: t('client_return_address'), value: redirectUrl },
    { key: t('description'), value: description },
    {
      fullwidth: true,
      key: t('grant_type'),
      value: (
        <S.Chips>
          {grantType?.length
            ? grantType.map((name) => (
                <Chip key={name} type='active'>
                  {name}
                </Chip>
              ))
            : '-'}
        </S.Chips>
      ),
    },
    {
      fullwidth: true,
      key: t('tags'),
      value: (
        <S.Chips>
          {tagIds?.length
            ? tagIds?.map((t, idx) => (
                <Chip key={idx} type='active'>
                  {t.title}
                </Chip>
              ))
            : '-'}
        </S.Chips>
      ),
    },
  ];

  let orgInfoData: InfoItemType[] = [];
  if (organizationInfo) {
    const { organizationName, organizationNationalId, representative } = organizationInfo;

    const aggregator = aggregatorStatusDisplay(t, organizationInfo);

    orgInfoData = [
      { key: t('organization_name'), value: organizationName },
      { key: t('organization_id'), value: organizationNationalId },
      { key: t('aggregator_status'), value: aggregator, doubleWidth: true },

      { key: '', value: '', type: 'divider', fullwidth: true },

      ...representative.reduce(
        (acc, { nameAndLastName, mobileNumber, fixedPhoneNumber, representativeType }) => [
          ...acc,
          { key: t('representative_name'), value: nameAndLastName },
          { key: t('mobile'), value: mobileNumber },
          { key: t('phone'), value: fixedPhoneNumber },
          { key: t('representative_type'), value: t(repTypeMap[representativeType]) },
        ],
        [] as InfoItemType[]
      ),
    ];
  }

  return (
    <S.Container>
      <section>
        <S.Header>
          <S.TabName>{t('technical_information')}</S.TabName>
          <S.Btns>
            <Button
              color='primary'
              variant='filled'
              href={`${ROUTES.BACKOFFICE.CLIENT_HISTORY}?clientName=${clientName}`}
            >
              <S.Icon className='icon-clock' />
              {t('display_change_history')}
            </Button>
            <Button
              color='primary'
              variant='solid'
              href={`${ROUTES.BACKOFFICE.EDIT_CLIENT_INFO}?clientName=${clientName}`}
            >
              <S.Icon className='icon-edit' />
              {t('edit')}
            </Button>
          </S.Btns>
        </S.Header>

        <InfoBox margin={0} data={clientInfoData} />
      </section>

      <section>
        <S.Header>
          <S.TabName>{t('organization_info')}</S.TabName>
        </S.Header>
        {orgInfoData.length ? (
          <InfoBox margin={0} data={orgInfoData} />
        ) : (
          <S.Box>
            <NoResult isLoading={false} />
          </S.Box>
        )}
      </section>
    </S.Container>
  );
}
