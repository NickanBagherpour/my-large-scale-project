import { TFunction } from 'i18next';

import { ColumnsType } from '@oxygen/ui-kit';
import { getValueOrDash } from '@oxygen/utils';
import { ClientHistoryData , ITheme} from '@oxygen/types';

type Props = {
  t: TFunction;
  theme: ITheme;
};

export function getDesktopColumns(props: Props): ColumnsType<ClientHistoryData> {
  const { t } = props;

  return [
    {
      title: t('field.modify_date'),
      dataIndex: 'modify_date',
      key: 'id',
      align: 'center',
      render: (value) => value,
    },
    {
      title: t('field.admin_name'),
      dataIndex: 'admin_name',
      key: 'id',
      align: 'center',
      render: (value) => value,
    },
    {
      title: t('field.english_name'),
      dataIndex: 'english_name',
      key: 'index',
      align: 'center',
      render: (value) => value,
    },
    {
      title: t('field.farsi_name'),
      dataIndex: 'farsi_name',
      key: 'index',
      width: 'min-content',
      render: (value) => value,
    },
  ];
}
