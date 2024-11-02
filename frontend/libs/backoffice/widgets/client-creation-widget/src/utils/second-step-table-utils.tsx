import { Button, ColumnsType } from '@oxygen/ui-kit';
import * as S from '../components/second-step/second-step.style';
import type { Service } from '@oxygen/types';
import Link from 'next/link';

export function getDesktopColumns(props): ColumnsType<Service> {
  const { t } = props;

  return [
    {
      title: t('step_two.row'),
      align: 'center',
      key: 'index',
      width: '5rem',
      render: (_val, _record, index) => {
        const start = 1;
        return start + index;
      },
    },
    {
      title: t('step_two.service_name'),
      dataIndex: 'serviceName',
      align: 'center',
    },
    {
      title: t('step_two.persian_name'),
      dataIndex: 'persianName',
      align: 'center',
    },
    {
      title: t('step_two.scope'),
      dataIndex: 'scope',
      align: 'center',
    },
    {
      title: t('step_two.url'),
      dataIndex: 'url',
      align: 'center',
      render: (url) => <Link href={url}> {url} </Link>,
    },
    {
      title: t('step_two.version'),
      dataIndex: 'version',
      align: 'center',
      width: '7rem',
    },
    {
      width: '7rem',
      key: 'status',
      render: () => (
        <S.DetailsBtn variant='link' color='primary' onClick={(p) => console.log(p)}>
          {t('details')}
        </S.DetailsBtn>
      ),
    },
    {
      width: '7rem',
      key: 'remove',
      render: (p) => (
        <Button variant='link' color='error' onClick={() => console.log(p)}>
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
          { title: t('step_two.service_name'), value: serviceName },
          { title: t('step_two.persian_name'), value: persianName },
          { title: t('step_two.scope'), value: scope },
          {
            title: t('step_two.url'),
            value: <Link href={url}>{url}</Link>,
          },
          { title: t('step_two.version'), value: version },
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
