import { TFunction } from 'i18next';

import { ColumnsType, Table } from '@oxygen/ui-kit';
import { getValueOrDash } from '@oxygen/utils';
import * as S from '../components/second-tab/modals/info-service-modal/info-service-modal.style';

type Props = {
  t: TFunction;
};

export function getDesktopColumns(props: Props): ColumnsType<any> {
  const { t } = props;

  return [
    {
      title: t('table.index'),
      align: 'center',
      key: 'id',
      width: '2.8rem',
      render: (_val, _record, index) => {
        return getValueOrDash(index + 1);
      },
    },
    {
      title: t('modal.english_name'),
      align: 'center',
      key: 'ssoScopeId',
      width: '2.8rem',
      render: (value) => {
        return getValueOrDash(value?.name);
      },
    },
    {
      title: t('modal.persian_name'),
      align: 'center',
      key: 'description',
      width: '2.8rem',
      render: (value) => {
        return getValueOrDash(value?.description);
      },
    },
  ];
}

export function getMobileColumns(props: Props): ColumnsType<any> {
  const { t } = props;
  return [
    {
      title: '',
      key: 'mobile-columns',
      render: ({ name, description }) => {
        const data = [
          { title: t('first_tab.english_scope_name'), value: getValueOrDash(name) },
          {
            title: t('first_tab.farsi_scope_name'),
            value: getValueOrDash(description),
          },
        ];
        return (
          <S.TableRow>
            {data.map((item, idx) => (
              <Table.MobileColumn minHeight={'40px'} key={idx} {...item} />
            ))}
          </S.TableRow>
        );
      },
    },
  ];
}
