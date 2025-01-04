import { ColumnsType, Table } from '@oxygen/ui-kit';
import Link from 'next/link';
import { TFunction } from 'i18next';

import { getValueOrDash } from '@oxygen/utils';
import { ScopeInformationService } from '@oxygen/types';

import * as S from './second-tab-table-util.style';

export type Modal = {
  details: boolean;
  removeService: boolean;
};

type Props = {
  t: TFunction;
  toggleModal: (modal: keyof Modal) => void;
};
export function getDesktopColumns(props: Props): ColumnsType<ScopeInformationService> {
  const { t, toggleModal } = props;

  return [
    {
      title: t('second_tab.row'),
      align: 'center',
      key: 'index',
      width: '5rem',
      render: (_val, _record, index) => {
        const start = 1;
        return start + index;
      },
    },
    {
      title: t('second_tab.service_name'),
      dataIndex: 'name',
      align: 'center',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('second_tab.persian_name'),
      dataIndex: 'persianName',
      align: 'center',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('second_tab.scope'),
      dataIndex: 'scope',
      align: 'center',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      title: t('second_tab.url'),
      dataIndex: 'path',
      align: 'center',
      render: (value) =>
        value ? (
          <Link href={value} target='_blank' rel='noopener noreferrer'>
            {value}
          </Link>
        ) : (
          '-'
        ),
    },
    {
      title: t('second_tab.version'),
      dataIndex: 'version',
      align: 'center',
      width: '7rem',
      render: (value) => {
        return getValueOrDash(value);
      },
    },
    {
      width: '7rem',
      key: 'status',
      render: () => (
        <S.DetailsBtn variant='link' color='primary' onClick={() => toggleModal('details')}>
          {t('details')}
        </S.DetailsBtn>
      ),
    },
    //uncomment when remove service is needed

    // {
    //   width: '7rem',
    //   key: 'remove',
    //   render: (p) => (
    //     <Button variant='link' color='error' onClick={() => toggleModal('removeService')}>
    //       <S.TrashIcon className='icon-trash' />
    //     </Button>
    //   ),
    // },
  ];
}

export function getMobileColumns(props) {
  const { t, toggleModal } = props;

  return [
    {
      title: '',
      key: 'mobile-columns',
      render({ scope, path, version, persianName, name }: ScopeInformationService) {
        const data = [
          { title: t('second_tab.service_name'), value: getValueOrDash(name) },
          { title: t('second_tab.persian_name'), value: getValueOrDash(persianName) },
          { title: t('second_tab.scope'), value: getValueOrDash(scope) },
          {
            title: t('second_tab.url'),
            value: path ? (
              <Link href={path} target='_blank' rel='noopener noreferrer'>
                {path}
              </Link>
            ) : (
              '-'
            ),
          },
          { title: t('second_tab.version'), value: getValueOrDash(version) },
          {
            title: t('details'),
            value: (
              <S.DetailsBtn className='item__btn' variant='link' color='primary' onClick={() => toggleModal('details')}>
                {t('details')}
              </S.DetailsBtn>
            ),
          },
          //uncomment when remove service is needed

          // {
          //   title: t('remove'),
          //   value: (
          //     <Button className='item__btn' variant='link' color='error' onClick={() => toggleModal('removeService')}>
          //       <S.TrashIcon className='icon-trash' />
          //     </Button>
          //   ),
          // },
        ];

        return <Table.MobileColumns columns={data} minHeight={'44px'}></Table.MobileColumns>;
      },
    },
  ];
}
