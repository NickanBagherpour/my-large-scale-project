import { useTr } from '@oxygen/translation';
import { Button, Chip, InfoBox, Status } from '@oxygen/ui-kit';
import * as S from './client-info.style';
import { useGetClientInfoQuery } from '../../services';
import { Space } from 'antd';

export default function ClientInfo() {
  const [t] = useTr();
  const { data } = useGetClientInfoQuery();

  if (!data) return null;

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

  const clientInfoData = [
    {
      fullwidth: true,
      key: t('grant_type'),
      value: grantType.map((t) => <Chip type='active'>{t}</Chip>),
    },
    {
      fullwidth: true,
      key: t('tags'),
      value: tags.map((t) => <Chip type='active'>{t}</Chip>),
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
    <Space direction='vertical' size={'large'}>
      <section>
        <S.Header>
          <S.TabName>{t('client_info')}</S.TabName>
          <Button color='primary' variant='filled'>
            <i className='icon-clock' />
            {t('display_change_history')}
          </Button>
          <Button href='/edit-client-info' color='primary' variant='solid'>
            <i className='icon-edit' />
            {t('edit')}
          </Button>
        </S.Header>

        <InfoBox margin={0} data={clientInfoData} />
      </section>
      <section>
        <S.Header>
          <S.TabName>{t('applicant_info')}</S.TabName>
          <Button color='primary' variant='filled'>
            <i className='icon-clock' />
            {t('display_change_history')}
          </Button>
          <Button href='/edit-applicant-info' color='primary' variant='solid'>
            <i className='icon-edit' />
            {t('edit')}
          </Button>
        </S.Header>

        <InfoBox margin={0} data={applicantInfoData} />
      </section>
    </Space>
  );
}
