import { TFunction } from 'i18next';

import { ColumnsType, MobileColumnType, Table, Box, Tooltip } from '@oxygen/ui-kit';
import { CONSTANTS, getValueOrDash, ROUTES, widthByButtonCount } from '@oxygen/utils';
import { ITheme } from '@oxygen/types';

import { PaginationType } from '../context/types';

import * as S from '../components/client-report/client-report.style';

type Props = {
  t: TFunction;

  pagination: Omit<PaginationType, 'sort'>;
  theme: ITheme;
  wordToHighlight: string;
};

export function getDesktopColumns(props: Props): ColumnsType<any> {
  const {
    t,

    pagination,
    theme,
    wordToHighlight,
  } = props;
  const highlightColor = theme.secondary.main;

  const { page, rowsPerPage } = pagination;

  return [
    {
      title: t('row'),
      key: 'index',
      width: CONSTANTS.ROW_INDEX_WIDTH,
      render: (_val, _record, index) => {
        const start = (page - 1) * rowsPerPage + 1;
        return start + index;
      },
    },
    {
      title: `${t('name')}`,
      dataIndex: 'clientName',
      key: 'clientName',
      render: (clientName) => (
        <Tooltip title={getValueOrDash(clientName)}>
          <S.Name text={getValueOrDash(clientName)} highlightColor={highlightColor} wordToHighlight={wordToHighlight} />
        </Tooltip>
      ),
    },
    {
      title: `${t('persianName')}`,
      dataIndex: 'organizationName',
      key: 'organizationName',
      render: (organizationName) => (
        <Tooltip title={getValueOrDash(organizationName)}>
          <S.Name
            text={getValueOrDash(organizationName)}
            highlightColor={highlightColor}
            wordToHighlight={wordToHighlight}
          />
        </Tooltip>
      ),
    },
    {
      title: '',
      dataIndex: 'clientsReport',
      key: 'clientsReport',
      align: 'left',
      ellipsis: false,
      width: widthByButtonCount(2),
      render: (value, record) => (
        <Box gap='1.6rem' display={'flex'} alignItems={'center'} justifyContent={'end'}>
          <S.Details
            variant={'link'}
            href={`${ROUTES.BACKOFFICE.CLIENT_DETAILS}?name=${record.clientName ?? ''}`}
            size={'small'}
            disabled
          >
            {t('services_report')}
          </S.Details>
          <S.Details
            variant={'link'}
            href={`${ROUTES.BACKOFFICE.CLIENT_DETAILS}?name=${record.clientName ?? ''}`}
            size={'small'}
          >
            {t('details')}
          </S.Details>
        </Box>
      ),
    },
  ];
}

export function getMobileColumns(props: Props): any {
  const { t, theme, wordToHighlight } = props;
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
                text={getValueOrDash(value?.clientName)}
                highlightColor={highlightColor}
                wordToHighlight={wordToHighlight}
              />
            ),
          },
          {
            title: t('persianName'),
            value: (
              <S.Name
                text={getValueOrDash(value?.organizationName)}
                highlightColor={highlightColor}
                wordToHighlight={wordToHighlight}
              />
            ),
          },
          {
            title: '',
            value: (
              <Box display={'flex'} alignItems={'center'}>
                <S.Details
                  variant={'link'}
                  href={`${ROUTES.BACKOFFICE.CLIENT_DETAILS}?name=${value?.clientName ?? ''}`}
                  disabled
                >
                  <S.ServicesReportOnMobile>{t('services_report')}</S.ServicesReportOnMobile>
                </S.Details>
                <S.Details
                  variant={'link'}
                  href={`${ROUTES.BACKOFFICE.CLIENT_DETAILS}?name=${value?.clientName ?? ''}`}
                >
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
