import { useTr } from '@oxygen/translation';
import { Button, type ColumnsType, Input, Switch, Table } from '@oxygen/ui-kit';
import * as S from './services.style';
import Link from 'next/link';

const dataSource = Array.from({ length: 7 }).map(() => ({
  serviceName: 'samat-lc-gutr-del',
  persianName: 'دریافت کد‌های ملی متعلق به یک شماره موبایل',
  scope: 'svc-mgmt-iban-inq',
  url: '/services',
  version: 'V 1.1',
  status: 'status',
  details: 'details',
  remove: 'remove',
}));

export default function Services() {
  const [t] = useTr();

  const columns: ColumnsType<(typeof dataSource)[number]> = [
    {
      title: t('service_name'),
      dataIndex: 'serviceName',
      key: 'serviceName',
      align: 'center',
    },
    {
      title: t('persian_name'),
      dataIndex: 'persianName',
      key: 'persianName',
      align: 'center',
    },
    {
      title: t('scope'),
      dataIndex: 'scope',
      key: 'scope',
      align: 'center',
    },

    {
      title: t('url'),
      dataIndex: 'url',
      key: 'url',
      align: 'center',
      render: (url) => <Link href={url}>{url}</Link>,
    },

    {
      title: t('version'),
      dataIndex: 'version',
      key: 'version',
      align: 'center',
    },

    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: () => (
        <S.Status>
          <S.StatusTxt>{t('operational')}</S.StatusTxt>
          <Switch />
          <S.StatusTxt>{t('stop')}</S.StatusTxt>
        </S.Status>
      ),
    },

    {
      title: '',
      dataIndex: 'details',
      key: 'details',
      render: () => (
        <Button variant='text' color='primary'>
          {t('details')}
        </Button>
      ),
    },

    {
      title: '',
      dataIndex: 'remove',
      key: 'remove',
      render: () => (
        <Button variant='text' color='error'>
          <S.TrashIcon className='icon-trash' />
        </Button>
      ),
    },
  ];

  return (
    <section>
      <S.Header>
        <S.Title>{t('client_services')}</S.Title>
        <Input size='large' placeholder={t('searchByNames')} prefix={<i className='icon-search-normal' />} />
      </S.Header>

      <Table dataSource={dataSource} columns={columns} pagination={{ position: ['bottomCenter'] }} />
    </section>
  );
}
