import { Button, ColumnsType } from '@oxygen/ui-kit';
import * as S from './second-tab-table-util.style';
import type { Service } from '@oxygen/types';
import Link from 'next/link';
import { TFunction } from 'i18next';
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
      dataIndex: 'serviceName',
      align: 'center',
    },
    {
      title: t('second_tab.persian_name'),
      dataIndex: 'persianName',
      align: 'center',
    },
    {
      title: t('second_tab.scope'),
      dataIndex: 'scope',
      align: 'center',
    },
    {
      title: t('second_tab.url'),
      dataIndex: 'url',
      align: 'center',
      render: (url) => <Link href={url}> {url} </Link>,
    },
    {
      title: t('second_tab.version'),
      dataIndex: 'version',
      align: 'center',
      width: '7rem',
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
    {
      width: '7rem',
      key: 'remove',
      render: (p) => (
        <Button variant='link' color='error' onClick={() => toggleModal('removeService')}>
          <S.TrashIcon className='icon-trash' />
        </Button>
      ),
    },
  ];
}

export function getMobileColumns(props) {
  const { t } = props;

  return [
    {
      title: '',
      key: 'mobile-columns',
      render({ scope, url, version, persianName, serviceName }: Service) {
        const data = [
          { title: t('second_tab.service_name'), value: serviceName },
          { title: t('second_tab.persian_name'), value: persianName },
          { title: t('second_tab.scope'), value: scope },
          {
            title: t('second_tab.url'),
            value: <Link href={url}>{url}</Link>,
          },
          { title: t('second_tab.version'), value: version },
          {
            title: t('details'),
            value: (
              <S.DetailsBtn variant='link' color='primary' onClick={(p) => console.log(p)}>
                {t('details')}
              </S.DetailsBtn>
            ),
          },
          {
            title: t('remove'),
            value: (
              <Button variant='link' color='error' onClick={(p) => console.log(p)}>
                <S.TrashIcon className='icon-trash' />
              </Button>
            ),
          },
        ];
        return (
          <S.TableRow>
            {data.map(({ title, value }) => (
              <S.RowItem>
                <strong>{title}</strong>
                {value}
              </S.RowItem>
            ))}
          </S.TableRow>
        );
      },
    },
  ];
}
