import { Button, ColumnsType, MobileColumnType, Table } from '@oxygen/ui-kit';
import type { Service } from '@oxygen/types';
import { TFunction } from 'i18next';
import Link from 'next/link';
import * as S from '../components/scope-list/scope-list.style';
import { getValueOrDash } from '@oxygen/utils';

export type Modal = {
  details: boolean;
  removeService: boolean;
};

type Props = {
  t: TFunction;
  toggleModal: (modal: keyof Modal) => void;
};

export function getDesktopColumns(props: Props): ColumnsType<Service> {
  const { t, toggleModal } = props;

  return [
    {
      title: t('field.row'),
      dataIndex: 'row',
      key: 'index',
      width: 'min-content',
      render: (value) => value,
    },
    {
      title: t('field.scope_latin_name'),
      dataIndex: 'latin_name',
      key: 'index',
      align: 'center',
      render: (value) => value,
    },
    {
      title: t('field.scope_persian_name'),
      dataIndex: 'persian_name',
      key: 'id',
      align: 'center',
      render: (value) => value,
    },
    {
      title: t('field.status'),
      dataIndex: 'status',
      key: 'id',
      align: 'center',
      render: (value) => {
        return (
          <Button className='item__btn' variant='link' color='error' onClick={() => toggleModal('removeService')}>
            <S.TrashIcon className='icon-trash' />
          </Button>
        );
        // disabled={disabled} defaultChecked={defaultChecked}
      },
    },
  ];
}

export function getMobileColumns(props: Props) {
  const { t, toggleModal } = props;

  const mobileColumns = [
    {
      title: '',
      key: 'mobile-columns',
      render: (value) => {
        const columns: MobileColumnType[] = [
          {
            title: t('field.row'),
            value: getValueOrDash(value?.row),
          },
          {
            title: t('field.scope_latin_name'),
            value: getValueOrDash(value?.latin_name),
          },
          {
            title: t('field.scope_persian_name'),
            value: getValueOrDash(value?.persian_name),
          },
          {
            title: t('field.status'),
            value: (
              <Button className='item__btn' variant='link' color='error' onClick={() => toggleModal('removeService')}>
                <S.TrashIcon className='icon-trash' />
              </Button>
            ),
          },
        ];

        return (
          <Table.MobileColumns
            columns={columns.map((column) => ({
              title: column.title,
              // Render value for each mobile column
              value: column.value,
            }))}
          />
        );
      },
    },
  ];

  return mobileColumns;
}
