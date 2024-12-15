import { Button, ColumnsType, Table } from '@oxygen/ui-kit';
import { getValueOrDash } from '@oxygen/utils';
import * as S from '../components/third-step/third-step.style';
import type { Service } from '@oxygen/types';
import Link from 'next/link';
import { TFunction } from 'i18next';
import { Modal } from '../types/modal.type';
type Props = {
  t: TFunction;
  toggleModal: (modal: keyof Modal, serviceId?: string) => void;
};
export function getDesktopColumns(props: Props): ColumnsType<Service> {
  const { t, toggleModal } = props;

  return [
    {
      title: t('table_header.row'),
      align: 'center',
      key: 'index',
      width: '5rem',
      render: (_val, _record, index) => {
        const start = 1;
        return start + index;
      },
    },
    {
      title: t('table_header.name'),
      dataIndex: 'serviceName',
      align: 'center',
      render: (serviceName) => getValueOrDash(serviceName),
    },
    {
      title: t('table_header.persian_name'),
      dataIndex: 'persianName',
      align: 'center',
      render: (persianName) => getValueOrDash(persianName),
    },
    {
      width: '7rem',
      key: 'remove',
      render: (p, service) => (
        <Button variant='link' color='error' onClick={() => toggleModal('removeService', service.serviceName)}>
          <S.TrashIcon className='icon-trash' />
        </Button>
      ),
    },
  ];
}

export function getMobileColumns(props) {
  const { t, toggleModal } = props;

  return [
    {
      title: '',
      key: 'mobile-columns',
      render({ scope, url, version, persianName, serviceName }: Service) {
        const data = [
          { title: t('table_header.name'), value: serviceName, render: (serviceName) => getValueOrDash(serviceName) },
          {
            title: t('table_header.persian_name'),
            value: persianName,
            render: (persianName) => getValueOrDash(persianName),
          },
          {
            title: t('remove_modal.remove'),
            value: (
              <Button className='item__btn' variant='link' color='error' onClick={() => toggleModal('removeService')}>
                <S.TrashIcon className='icon-trash' />
              </Button>
            ),
          },
        ];
        return <Table.MobileColumns columns={data} minHeight={'44px'}></Table.MobileColumns>;
      },
    },
  ];
}
