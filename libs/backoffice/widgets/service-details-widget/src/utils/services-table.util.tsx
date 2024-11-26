import { Button, ColumnsType, Switch, MobileColumnType, Table } from '@oxygen/ui-kit';
import type { Pagination, Service } from '@oxygen/types';
import { TFunction } from 'i18next';
import Link from 'next/link';
import * as S from '../components/app/app.style';
import { getValueOrDash } from '@oxygen/utils';
import { Badge } from 'antd';

type Props = {
  t: TFunction;
  pagination: Pagination;
  // toggleModal: (modal: keyof Modals) => void;
};

export function getDesktopColumns(props: Props): ColumnsType<Service> {
  const {
    t,
    // pagination: { page, rowsPerPage },
    // toggleModal,
  } = props;

  return [
    {
      title: t('field.row'),
      dataIndex: 'row',
      key: 'index',
      width: 'min-content',
      render: (value) => value,
    },
    {
      title: t('field.client_latin_name'),
      dataIndex: 'latin_name',
      key: 'index',
      align: 'center',
      render: (value) => value,
    },
    {
      title: t('field.client_persian_name'),
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
          <S.SwitchContainer>
            <span>{t('operational')}</span>
            <Switch />
            <span>{t('stop')}</span>
          </S.SwitchContainer>
        );
        // disabled={disabled} defaultChecked={defaultChecked}
      },
    },
  ];
}

export function getMobileColumns(props: Props) {
  const { t } = props;

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
            title: t('field.client_latin_name'),
            value: getValueOrDash(value?.latin_name),
          },
          {
            title: t('field.client_persian_name'),
            value: getValueOrDash(value?.persian_name),
          },
          {
            title: t('field.status'),
            value: (
              <S.SwitchContainer>
                <span>{t('operational')}</span>
                <Switch />
                <span>{t('stop')}</span>
              </S.SwitchContainer>
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
