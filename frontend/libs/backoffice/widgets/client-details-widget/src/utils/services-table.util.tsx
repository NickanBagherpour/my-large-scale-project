import { Button, ColumnsType, Switch } from '@oxygen/ui-kit';
import * as S from '../components/services/services.style';
import type { Service } from '@oxygen/types';
import { TFunction } from 'i18next';
import Link from 'next/link';

type Props = {
  t: TFunction;
  page: number;
  rowsPerPage: number;
  toggleIsStartModalOpen: () => void;
  toggleIsStopModalOpen: () => void;
  toggleIsDetailsModalOpen: () => void;
  toggleIsRemoveModalOpen: () => void;
};

export function getDesktopColumns(props: Props): ColumnsType<Service> {
  const {
    t,
    page,
    rowsPerPage,
    toggleIsStopModalOpen,
    toggleIsStartModalOpen,
    toggleIsRemoveModalOpen,
    toggleIsDetailsModalOpen,
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
              checked ? toggleIsStartModalOpen() : toggleIsStopModalOpen();
            }}
          />
          <S.StatusTxt> {t('operational')} </S.StatusTxt>
        </S.Status>
      ),
    },
    {
      width: '7rem',
      key: 'status',
      render: () => (
        <S.DetailsBtn variant='link' color='primary' onClick={toggleIsDetailsModalOpen}>
          {t('details')}
        </S.DetailsBtn>
      ),
    },
    {
      width: '7rem',
      key: 'remove',
      render: () => (
        <Button variant='link' color='error' onClick={toggleIsRemoveModalOpen}>
          <S.TrashIcon className='icon-trash' />
        </Button>
      ),
    },
  ];
}

export function getMobileColumns(props: Props) {
  const { t, toggleIsStopModalOpen, toggleIsStartModalOpen, toggleIsRemoveModalOpen, toggleIsDetailsModalOpen } = props;
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
                  onChange={(checked) => {
                    checked ? toggleIsStartModalOpen() : toggleIsStopModalOpen();
                  }}
                />
                <S.StatusTxt> {t('operational')} </S.StatusTxt>
              </S.Status>
            ),
          },
          {
            title: t('details'),
            value: (
              <S.DetailsBtn variant='link' color='primary' onClick={toggleIsDetailsModalOpen}>
                {t('details')}
              </S.DetailsBtn>
            ),
          },
          {
            title: t('remove'),
            value: (
              <Button variant='link' color='error' onClick={toggleIsRemoveModalOpen}>
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
