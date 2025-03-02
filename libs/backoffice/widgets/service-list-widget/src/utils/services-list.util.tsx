import React from 'react';
import { TFunction } from 'i18next';

import { Tooltip } from 'antd';
import { ColumnsType, MobileColumnType, Table, Switch } from '@oxygen/ui-kit';
import { CONSTANTS, getValueOrDash, ROUTES, widthByButtonCount } from '@oxygen/utils';
import { ITheme } from '@oxygen/types';
import { WithBadge } from '@oxygen/reusable-components';

import { ParamsType } from '../types';
import { ToggleActivationInfo } from '../types/toggle-status.type';

import * as S from '../components/services-list/services.style';

type Props = {
  t: TFunction;
  changeStatus?: (status: boolean, name: string) => void;
  deleteService?: (name: string, status: ParamsType) => void;
  theme: ITheme;
  wordToHighlight: string;
  onToggleActivationSwitchClick: (info: ToggleActivationInfo) => void;
};

export function getDesktopColumns(props: Props): ColumnsType<any> {
  const { t, changeStatus, deleteService, theme, wordToHighlight } = props;
  const highlightColor = theme.secondary.main;
  return [
    {
      title: `${t('row')}`,
      width: CONSTANTS.ROW_INDEX_WIDTH,
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      className: 'row-number',
    },
    {
      title: `${t('name')}`,
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      ellipsis: true,
      render: (name) => (
        <Tooltip placement='top' title={getValueOrDash(name)} arrow={true}>
          <S.Name text={getValueOrDash(name)} highlightColor={highlightColor} wordToHighlight={wordToHighlight} />
        </Tooltip>
      ),
    },
    {
      title: `${t('persian_name')}`,
      dataIndex: 'persianName',
      key: 'persianName',
      align: 'center',
      ellipsis: true,
      render: (persian_name) => (
        <Tooltip placement='top' title={getValueOrDash(persian_name)} arrow={true}>
          {getValueOrDash(persian_name)}
        </Tooltip>
      ),
    },
    {
      title: `${t('scope')}`,
      dataIndex: 'scopes',
      key: 'scopes',
      align: 'center',
      ellipsis: true,
      render: (scopes) => (
        <WithBadge
          items={scopes}
          onRender={(value) => (
            <S.Name text={getValueOrDash(value)} highlightColor={highlightColor} wordToHighlight={wordToHighlight} />
          )}
        />
      ),
    },
    {
      title: 'url',
      dataIndex: 'paths',
      key: 'paths',
      align: 'center',
      ellipsis: true,
      render: (paths) => (
        <WithBadge
          items={[...paths, ...paths, ...paths]}
          onRender={(value) => <S.Url>{getValueOrDash(value)}</S.Url>}
        />
      ),
    },
    {
      title: `${t('version')}`,
      dataIndex: 'version',
      key: 'version',
      align: 'center',
      render: (version) => getValueOrDash(version),
    },
    {
      title: `${t('status')}`,
      dataIndex: 'isActive',
      key: 'isActive',
      align: 'center',
      render: (isActive, record) => (
        <S.SwitchContainer>
          <S.DesktopSpan>{t('operational')}</S.DesktopSpan>
          <span style={{ margin: '0 1rem' }}>
            <S.DesktopSwitch
              checked={isActive}
              onClick={() => props.onToggleActivationSwitchClick({ isActive, serviceName: record?.name })}
            />
            <S.MiniDesktopSwitch
              checkedChildren={t('stopped')}
              unCheckedChildren={t('operational')}
              checked={isActive}
              onClick={() => props.onToggleActivationSwitchClick({ isActive, serviceName: record?.name })}
            />
          </span>
          <S.DesktopSpan>{t('stopped')}</S.DesktopSpan>
        </S.SwitchContainer>
      ),
    },
    {
      title: '',
      dataIndex: 'details',
      key: 'details',
      align: 'left',
      width: widthByButtonCount(1),
      render: (value, record) => (
        <S.Details
          variant={'link'}
          size={'small'}
          href={`${ROUTES.BACKOFFICE.SERVICE_DETAILS}?servicename=${record.name ?? ''}`}
        >
          {t('detailed')}
        </S.Details>
      ),
    },
  ];
}

export function getMobileColumns(props: Props): any {
  const { t, changeStatus, deleteService, theme, wordToHighlight } = props;
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
                text={getValueOrDash(value?.name)}
                highlightColor={highlightColor}
                wordToHighlight={wordToHighlight}
              />
            ),
          },
          {
            title: t('persian_name'),
            value: getValueOrDash(value?.persianName),
          },
          {
            title: t('scope'),
            value: (
              <WithBadge
                items={value.scopes}
                onRender={(value) => (
                  <S.Name
                    text={getValueOrDash(value)}
                    highlightColor={highlightColor}
                    wordToHighlight={wordToHighlight}
                  />
                )}
              />
            ),
          },
          {
            title: t('url'),
            value: <WithBadge items={value?.paths} onRender={(value) => <S.Url>{getValueOrDash(value)}</S.Url>} />,
          },
          {
            title: t('status'),
            value: (
              <span>
                {t('operational')}
                <span style={{ margin: '0 1.2rem' }}>
                  <Switch
                    checked={value?.isActive}
                    onClick={() =>
                      props.onToggleActivationSwitchClick({ isActive: value?.isActive, serviceName: value?.name })
                    }
                  />
                </span>
                {t('stopped')}
              </span>
            ),
          },
          {
            title: '',
            value: (
              <S.Details
                variant={'link'}
                size={'small'}
                href={`${ROUTES.BACKOFFICE.SERVICE_DETAILS}?servicename=${value?.name ?? ''}`}
              >
                {t('detailed')}
              </S.Details>
            ),
            colon: false,
          },
        ];
        return <Table.MobileColumns columns={columns} minHeight={'4rem'} />;
      },
    },
  ];
}
