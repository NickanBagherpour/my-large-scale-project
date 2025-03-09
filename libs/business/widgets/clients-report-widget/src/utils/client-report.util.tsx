import { TFunction } from 'i18next';

import { Tooltip } from 'antd';
import { ColumnsType, MobileColumnType, Table, Box } from '@oxygen/ui-kit';
import { CONSTANTS, getValueOrDash, ROUTES, widthByButtonCount } from '@oxygen/utils';
import { ITheme } from '@oxygen/types';

import { PaginationType } from '../context/types';
import { ClientReportDto } from '../types';

import * as S from '../components/client-report/client-report.style';

type Props = {
  t: TFunction;
  pagination: Omit<PaginationType, 'sort'>;
  theme: ITheme;
  wordToHighlight: string;
  addClientDetailsToView: (client: ClientReportDto | null) => void;
};

export function getDesktopColumns(props: Props): ColumnsType<any> {
  const { t, pagination, theme, wordToHighlight, addClientDetailsToView } = props;
  const highlightColor = theme.secondary.main;

  const { page, rowsPerPage } = pagination;

  return [
    {
      title: t('row'),
      align: 'center',
      key: 'index',
      width: CONSTANTS.ROW_INDEX_WIDTH,
      render: (_val, _record, index) => {
        const start = (page - 1) * rowsPerPage + 1;
        return start + index;
      },
    },
    {
      title: `${t('name')}`,
      dataIndex: 'clientEnName',
      key: 'clientEnName',
      align: 'center',
      render: (clientEnName) => (
        <Tooltip placement='top' title={getValueOrDash(clientEnName)} arrow={true}>
          <S.Name
            text={getValueOrDash(clientEnName)}
            highlightColor={highlightColor}
            wordToHighlight={wordToHighlight}
          />
        </Tooltip>
      ),
    },
    {
      title: `${t('persianName')}`,
      dataIndex: 'clientPersianName',
      key: 'clientPersianName',
      align: 'center',
      render: (clientPersianName) => (
        <Tooltip placement='top' title={getValueOrDash(clientPersianName)} arrow={true}>
          <S.Name
            text={getValueOrDash(clientPersianName)}
            highlightColor={highlightColor}
            wordToHighlight={wordToHighlight}
          />
        </Tooltip>
      ),
    },
    {
      title: '',
      dataIndex: 'clientEnName',
      key: 'clientEnName',
      align: 'left',
      width: widthByButtonCount(2.5),
      render: (clientEnName, record) => (
        <Box gap='1.6rem' display={'flex'} alignItems={'center'} justifyContent={'end'}>
          <S.Details
            variant={'link'}
            size={'small'}
            href={`${ROUTES.BUSINESS.META_CLIENTS_REPORT}?id=${record?.gateWayId}`}
          >
            {t('services_report')}
          </S.Details>
          <S.Details variant={'link'} onClick={() => addClientDetailsToView(record)} size={'small'}>
            {t('details')}
          </S.Details>
        </Box>
      ),
    },
  ];
}

export function getMobileColumns(props: Props): any {
  const { t, theme, wordToHighlight, addClientDetailsToView } = props;
  const highlightColor = theme.secondary.main;
  return [
    {
      title: '',
      dataIndex: '',
      render: (value, record, index) => {
        const columns: MobileColumnType[] = [
          {
            title: t('name'),
            value: (
              <S.Name
                text={getValueOrDash(value?.clientEnName)}
                highlightColor={highlightColor}
                wordToHighlight={wordToHighlight}
              />
            ),
          },
          {
            title: t('persianName'),
            value: getValueOrDash(value?.clientPersianName),
          },
          {
            title: '',
            value: (
              <Box display={'flex'} alignItems={'center'}>
                <S.Details variant={'link'} href={`${ROUTES.BUSINESS.META_CLIENTS_REPORT}?id=${record?.gateWayId}`}>
                  <S.ServicesReportOnMobile>{t('services_report')}</S.ServicesReportOnMobile>
                </S.Details>
                <S.Details variant={'link'} onClick={() => addClientDetailsToView(record)}>
                  {t('details')}
                </S.Details>
              </Box>
            ),
            colon: false,
          },
        ];
        return <Table.MobileColumns columns={columns} minHeight={'4rem'} />;
      },
    },
  ];
}
