import { useTr } from '@oxygen/translation';
import { Button, Chip, InfoBox, Loading } from '@oxygen/ui-kit';
import * as S from './client-info.style';
import { useGetClientInfoQuery } from '../../services';
import { ROUTES } from '@oxygen/utils';
import Footer from '../footer/footer';
import { useClientName } from '../../utils/use-client-name';
import { useGetClientTypeQuery } from '../../services/get-client-types.api';
import { NoResult } from '@oxygen/reusable-components';

export default function ClientInfo() {
  const [t] = useTr();
  const clientName = useClientName();
  const { data: clientInfo } = useGetClientInfoQuery(clientName);
  const { data: clientTypes } = useGetClientTypeQuery();

  if (!clientInfo || !clientTypes) return <Loading />;

  const {
    clientId,
    tagIds,
    websiteUrl,
    redirectUrl,
    clientTypeName,
    inboundAddress,
    isClientFlow,
    isImplicitFlow,
    isPasswordFlow,
    isAuthorizationFlow,
    authorizationKey,
    organizationInfo,
    clientEnglishName,
    clientPersianName,
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
  ].reduce((acc, type) => (type.isActive ? acc.concat(type.name) : acc), [] as string[]);

  const tags = tagIds.reduce((acc, tag) => {
    const found = clientTypes.find((c) => c.code === tag);
    if (found) return acc.concat(found);
    else return acc;
  }, [] as { code: number; title: string }[]);

  const clientInfoData = [
    { key: t('english_client_name'), value: clientEnglishName },
    { key: t('persian_client_name'), value: clientPersianName },
    { key: t('client_type'), value: clientTypeName },
    { key: t('client_id'), value: clientId },
    { key: t('authentication_id'), value: authorizationKey },
    { key: t('website_address'), value: websiteUrl },
    { key: t('input_address'), value: inboundAddress },
    { key: t('client_return_address'), value: redirectUrl },
    {
      fullwidth: true,
      key: t('grant_type'),
      value: (
        <S.Chips>
          {grantType.map((name) => (
            <Chip ellipsis tooltipOnEllipsis tooltipTitle={name} key={name} type='active'>
              {name}
            </Chip>
          ))}
        </S.Chips>
      ),
    },
    {
      fullwidth: true,
      key: t('tags'),
      value: (
        <S.Chips>
          {tags?.map((t, idx) => (
            <Chip ellipsis tooltipOnEllipsis tooltipTitle={t + ''} key={idx} type='active'>
              {t.title}
            </Chip>
          ))}
        </S.Chips>
      ),
    },
  ];

  let orgInfoData: { key: string; value: string }[] = [];
  if (organizationInfo) {
    const {
      organizationName,
      isAggregator,
      aggregatorName,
      organizationNationalId,
      representative: { mobileNumber, nameAndLastName, fixedPhoneNumber },
    } = organizationInfo;

    const aggregatorStatus = isAggregator ? `${t('has')} - ${aggregatorName}` : t('has_not');

    orgInfoData = [
      { key: t('organization_name'), value: organizationName },
      { key: t('organization_id'), value: organizationNationalId },
      { key: t('aggregator_status'), value: aggregatorStatus },
      { key: t(' representative_name'), value: nameAndLastName },
      { key: t('mobile'), value: mobileNumber },
      { key: t('phone'), value: fixedPhoneNumber },
    ];
  }

  return (
    <>
      <S.Container>
        <section>
          <S.Header>
            <S.TabName>{t('technical_information')}</S.TabName>
            <S.Btns>
              <Button
                href={`${ROUTES.BACKOFFICE.CLIENT_HISTORY}?clientId=${clientId}`}
                color='primary'
                variant='filled'
              >
                <S.Icon className='icon-clock' />
                {t('display_change_history')}
              </Button>
              <Button
                href={`${ROUTES.BACKOFFICE.EDIT_CLIENT_INFO}?requestId=123456789`}
                color='primary'
                variant='solid'
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

      <Footer isLoading={false} />
    </>
  );
}
