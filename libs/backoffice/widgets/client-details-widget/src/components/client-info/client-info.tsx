import { useTr } from '@oxygen/translation';
import { Button, Chip, InfoBox, Loading, Status } from '@oxygen/ui-kit';
import * as S from './client-info.style';
import { useGetClientInfoQuery } from '../../services';
import { Space } from 'antd';
import { ROUTES } from '@oxygen/utils';
import Footer from '../footer/footer';

export default function ClientInfo() {
  const [t] = useTr();
  const { data, isFetching, isLoading } = useGetClientInfoQuery();

  if (!data) return <Loading />;

  const {
    grantType,
    tags,
    clientStatus,
    englishClientName,
    persianClientName,
    clientType,
    clientId,
    authenticationId,
    websiteAddress,
    inputAddress,
    clientReturnAddress,
    aggregator,
    applicantInfo,
    username,
    nationalCode,
    organizationName,
    mobile,
    phone,
    email,
  } = data;
  console.log('data', data);
  const clientInfoData = [
    {
      fullwidth: true,
      key: t('grant_type'),
      value: (
        <S.Chips>
          {grantType.map((t, idx) => (
            <Chip ellipsis tooltipOnEllipsis tooltipTitle={t} key={idx} type='active'>
              {t}
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
          {tags.map((t, idx) => (
            <Chip ellipsis tooltipOnEllipsis tooltipTitle={t} key={idx} type='active'>
              {t}
            </Chip>
          ))}
        </S.Chips>
      ),
    },
    {
      key: t('client_status'),
      value: (
        <Space>
          <Status status='active' />
          {clientStatus}
        </Space>
      ),
    },
    { key: t('english_client_name'), value: englishClientName },
    { key: t('persian_client_name'), value: persianClientName },
    { key: t('client_type'), value: clientType },
    { key: t('client_id'), value: clientId },
    { key: t('authentication_id'), value: authenticationId },
    { key: t('website_address'), value: websiteAddress },
    { key: t('input_address'), value: inputAddress },
    { key: t('client_return_address'), value: clientReturnAddress },
    { key: t('aggregator'), value: aggregator },
    { key: t('applicant_info'), value: applicantInfo },
  ];

  const applicantInfoData = [
    { key: t('username'), value: username },
    { key: t('national_code'), value: nationalCode },
    { key: t('organization_name'), value: organizationName },
    { key: t('mobile'), value: mobile },
    { key: t('phone'), value: phone },
    { key: t('email'), value: email },
  ];

  return (
    <Loading spinning={isFetching}>
      <S.Container>
        <section>
          <S.Header>
            <S.TabName>{t('client_info')}</S.TabName>
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
            <S.TabName>{t('applicant_info')}</S.TabName>
            <S.Btns>
              <Button href={`${ROUTES.BACKOFFICE.APPLICANT_HISTORY}?applicantId=321`} color='primary' variant='filled'>
                <S.Icon className='icon-clock' />
                {t('display_change_history')}
              </Button>
              <Button
                href={`${ROUTES.BACKOFFICE.EDIT_APPLICANT_INFO}?requestId=123456789`}
                color='primary'
                variant='solid'
              >
                <S.Icon className='icon-edit' />
                {t('edit')}
              </Button>
            </S.Btns>
          </S.Header>

          <InfoBox margin={0} data={applicantInfoData} />
        </section>
      </S.Container>

      <Footer isLoading={isLoading} />
    </Loading>
  );
}
