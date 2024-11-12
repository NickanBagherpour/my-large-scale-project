import { Box, Button, ColumnsType, Switch, Table } from '@oxygen/ui-kit';
import * as S from '../components/services/services.style';
import type { Pagination, Service } from '@oxygen/types';
import { TFunction } from 'i18next';
import Link from 'next/link';
import { Modals } from '../types';

type Props = {
  t: TFunction;
  pagination: Pagination;
  toggleModal: (modal: keyof Modals) => void;
};

export function getDesktopColumns(props: Props): ColumnsType<Service> {
  const {
    t,
    pagination: { page, rowsPerPage },
    toggleModal,
  } = props;

  return [
    {
      title: t('index'),
      align: 'center',
      key: 'index',
      width: '5rem',
      render: (_val, _record, index) => {
        const start = (page - 1) * rowsPerPage + 1;
        return start + index;
      },
    },
    {
      title: t('service_name'),
      dataIndex: 'serviceName',
      align: 'center',
    },
    {
      title: t('persian_name'),
      dataIndex: 'persianName',
      align: 'center',
    },
    {
      title: t('scope'),
      dataIndex: 'scope',
      align: 'center',
    },
    {
      title: t('url'),
      dataIndex: 'url',
      align: 'center',
      render: (url) => <Link href={url}> {url} </Link>,
    },
    {
      title: t('version'),
      dataIndex: 'version',
      align: 'center',
      width: '7rem',
    },
    {
      title: t('status'),
      align: 'center',
      key: 'status',
      render: () => (
        <S.Status>
          <S.StatusTxt>{t('stop')} </S.StatusTxt>
          <Switch
            onChange={(checked) => {
              checked ? toggleModal('startService') : toggleModal('stopService');
            }}
          />
          <S.StatusTxt> {t('operational')} </S.StatusTxt>
        </S.Status>
      ),
    },
    {
      width: '7rem',
      key: 'action',
      render: () => (
        <Box>
          <S.DetailsBtn variant='link' color='primary' onClick={() => toggleModal('details')}>
            {t('details')}
          </S.DetailsBtn>
          <Button variant='link' color='error' onClick={() => toggleModal('removeService')}>
            <S.TrashIcon className='icon-trash' />
          </Button>
        </Box>
      ),
    },
  ];
}

export function getMobileColumns(props: Props) {
  const { t, toggleModal } = props;
  return [
    {
      title: '',
      key: 'mobile-columns',
      render({ scope, url, version, persianName, serviceName }: Service) {
        const data = [
          { title: t('service_name'), value: serviceName },
          { title: t('persian_name'), value: persianName },
          { title: t('scope'), value: scope },
          {
            title: t('url'),
            value: <Link href={url}>{url}</Link>,
          },
          { title: t('version'), value: version },
          {
            title: t('status'),
            value: (
              <S.Status>
                <S.StatusTxt>{t('stop')} </S.StatusTxt>
                <Switch
                  size='small'
                  onChange={(checked) => {
                    checked ? toggleModal('startService') : toggleModal('stopService');
                  }}
                />
                <S.StatusTxt> {t('operational')} </S.StatusTxt>
              </S.Status>
            ),
          },
          {
            title: t('details'),
            value: (
              <S.DetailsBtn className='item__btn' variant='link' color='primary' onClick={() => toggleModal('details')}>
                {t('details')}
              </S.DetailsBtn>
            ),
          },
          {
            title: t('remove'),
            value: (
              <Button className='item__btn' variant='link' color='error' onClick={() => toggleModal('removeService')}>
                <S.TrashIcon className='icon-trash' />
              </Button>
            ),
          },
        ];

        return (
          <Box flexDirection='column'>
            {data.map((item, idx) => (
              <Table.MobileColumn minHeight={'4rem'} key={idx} {...item} />
            ))}
          </Box>
        );
      },
    },
  ];
}
