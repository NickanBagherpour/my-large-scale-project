import { Box, Button, ColumnsType, Table } from '@oxygen/ui-kit';
import * as S from '../services.style';
import { TFunction } from 'i18next';
import Link from 'next/link';
import { Service } from './services.type';

type Props = {
  t: TFunction;
  pagination: { page: number; size: number };
  addServiceToRemove: (service: Service | null) => void;
  addServiceToView: (service: Service | null) => void;
};

export function getDesktopColumns(props: Props): ColumnsType<Service> {
  const {
    t,
    pagination: { page, size },
    addServiceToRemove,
    addServiceToView,
  } = props;

  return [
    {
      title: t('index'),
      align: 'center',
      key: 'index',
      width: '5rem',
      render: (_val, _record, index) => {
        const start = (page - 1) * size + 1;
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
      dataIndex: 'scopes',
      align: 'center',
      render: (scopes) => scopes.join(' , '),
    },
    {
      title: t('url'),
      dataIndex: 'paths',
      align: 'center',
      render: (paths) => paths.join(' , '),
    },
    {
      title: t('version'),
      dataIndex: 'version',
      align: 'center',
      width: '7rem',
    },
    {
      width: '7rem',
      key: 'action',
      render: (_, service) => (
        <Box>
          <S.DetailsBtn variant='link' color='primary' onClick={() => addServiceToView(service)}>
            {t('details')}
          </S.DetailsBtn>
          <Button variant='link' color='error' onClick={() => addServiceToRemove(service)}>
            <S.TrashIcon className='icon-trash' />
          </Button>
        </Box>
      ),
    },
  ];
}

export function getMobileColumns(props: Props) {
  const { t, addServiceToRemove, addServiceToView } = props;
  return [
    {
      title: '',
      key: 'mobile-columns',
      render(service: Service) {
        const { scopes, version, persianName, paths, name } = service;
        const data = [
          { title: t('service_name'), value: name },
          { title: t('persian_name'), value: persianName },
          { title: t('scope'), value: scopes.join(' , ') },
          {
            title: t('url'),
            value: paths.join(' , '),
          },
          { title: t('version'), value: version },
          {
            title: t('details'),
            value: (
              <S.DetailsBtn
                variant='link'
                color='primary'
                className='item__btn'
                onClick={() => addServiceToView(service)}
              >
                {t('details')}
              </S.DetailsBtn>
            ),
          },
          {
            title: t('remove'),
            value: (
              <Button className='item__btn' variant='link' color='error' onClick={() => addServiceToRemove(service)}>
                <S.TrashIcon className='icon-trash' />
              </Button>
            ),
          },
        ];

        /* using rem to have a constant height acorss all user devices */
        return <Table.MobileColumns columns={data} minHeight={'40px'} />;
      },
    },
  ];
}
