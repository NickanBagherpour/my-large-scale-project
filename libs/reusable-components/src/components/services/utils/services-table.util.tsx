import { Button, ColumnsType, Table, Tooltip } from '@oxygen/ui-kit';
import * as S from '../components/services/services.style';
import { TFunction } from 'i18next';
import WithBadge from '../../with-badge/with-badge';
import { CONSTANTS, widthByButtonCount, getValueOrDash } from '@oxygen/utils';
import { Service } from '../types/services';

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
      title: t('uikit.index'),
      key: 'index',
      width: CONSTANTS.ROW_INDEX_WIDTH,
      render: (_val, _record, index) => {
        const start = (page - 1) * size + 1;
        return start + index;
      },
    },
    {
      title: t('uikit.service_name'),
      dataIndex: 'name',
      render: (name) => <Tooltip title={getValueOrDash(name)}>{getValueOrDash(name)}</Tooltip>,
    },
    {
      title: t('uikit.persian_name'),
      dataIndex: 'persianName',
      render: (persianName) => <Tooltip title={getValueOrDash(persianName)}>{getValueOrDash(persianName)}</Tooltip>,
    },
    {
      title: t('uikit.scope'),
      dataIndex: 'scopes',
      render: (scopes) => <WithBadge items={scopes} />,
    },
    {
      title: t('uikit.url'),
      dataIndex: 'paths',
      render: (paths) => <WithBadge items={paths} />,
    },
    {
      title: t('uikit.version'),
      dataIndex: 'version',
    },
    {
      width: widthByButtonCount(2),
      key: 'action',
      ellipsis: false,
      render: (_, service) => (
        <S.Btns>
          <S.DetailsBtn variant='link' color='primary' onClick={() => addServiceToView(service)}>
            {t('uikit.details')}
          </S.DetailsBtn>
          <Button variant='link' color='error' onClick={() => addServiceToRemove(service)}>
            <S.TrashIcon className='icon-trash' />
          </Button>
        </S.Btns>
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
          { title: t('uikit.service_name'), value: name },
          { title: t('uikit.persian_name'), value: persianName },
          { title: t('uikit.scope'), value: <WithBadge items={scopes} /> },
          {
            title: t('uikit.url'),
            value: <WithBadge items={paths} />,
          },
          { title: t('uikit.version'), value: version },
          {
            title: t('uikit.details'),
            value: (
              <S.DetailsBtn
                variant='link'
                color='primary'
                className='item__btn'
                onClick={() => addServiceToView(service)}
              >
                {t('uikit.details')}
              </S.DetailsBtn>
            ),
          },
          {
            title: t('uikit.remove'),
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
