import { Button, ColumnsType, Switch } from '@oxygen/ui-kit';
import type { Pagination, Service } from '@oxygen/types';
import { TFunction } from 'i18next';
import Link from 'next/link';
import * as S from '../components/app/app.style';

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

// export function getMobileColumns(props: Props) {
//   const {
//     t,
//     //  toggleModal
//   } = props;
//   return [
//     {
//       title: '',
//       key: 'mobile-columns',
//       render({ scope, url, version, persianName, serviceName }: Service) {
//         const data = [
//           { title: t('service_name'), value: serviceName },
//           { title: t('persian_name'), value: persianName },
//           { title: t('scope'), value: scope },
//           {
//             title: t('url'),
//             value: <Link href={url}>{url}</Link>,
//           },
//           { title: t('version'), value: version },
//           {
//             title: t('status'),
//             value: (
//               <S.Status>
//                 <S.StatusTxt>{t('stop')} </S.StatusTxt>
//                 <Switch
//                   onChange={(checked) => {
//                     checked ? toggleModal('startService') : toggleModal('stopService');
//                   }}
//                 />
//                 <S.StatusTxt> {t('operational')} </S.StatusTxt>
//               </S.Status>
//             ),
//           },
//           {
//             title: t('details'),
//             value: (
//               <S.DetailsBtn variant='link' color='primary' onClick={() => toggleModal('details')}>
//                 {t('details')}
//               </S.DetailsBtn>
//             ),
//           },
//           {
//             title: t('remove'),
//             value: (
//               <Button variant='link' color='error' onClick={() => toggleModal('removeService')}>
//                 <S.TrashIcon className='icon-trash' />
//               </Button>
//             ),
//           },
//         ];
//         return (
//           <S.TableRow>
//             {data.map(({ title, value }) => (
//               <S.RowItem>
//                 <strong>{title}</strong>
//                 {value}
//               </S.RowItem>
//             ))}
//           </S.TableRow>
//         );
//       },
//     },
//   ];
// }
