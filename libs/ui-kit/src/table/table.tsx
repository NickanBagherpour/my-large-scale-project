'use client';

import { Table as AntTable, TableProps as AntTableProps, ConfigProvider, TablePaginationConfig, Tooltip } from 'antd';
import { ColumnsType as AntColumnsType } from 'antd/lib/table';
import React from 'react';

import { useTr } from '@oxygen/translation';
import { Nullable } from '@oxygen/types';
import { useAppTheme, useResponsive } from '@oxygen/hooks';

import { Button } from '../button/button';
import { Box } from '../box/box';
import { MobileColumn } from './mobile-column';
import { MobileColumns } from './mobile-columns';
import { ExpandButton } from '../button/expand-button';

import * as S from './table.style';
import { getValueOrDash } from '@oxygen/utils';

export type ColumnsType<T> = AntColumnsType<T> & {
  //
};

export enum PaginationType {
  PAGINATED = 'paginated',
  INCREMENTAL = 'incremental',
}

type TableVariant = 'simple' | 'complex';

export type TableProps = Omit<AntTableProps<any>, 'title'> & {
  // Custom props specific to your component
  // isExpandable?: boolean;
  // hidePagination?: boolean;
  variant?: TableVariant;
  total?: number;
  current?: number;
  title?: Nullable<string>;
  hasContainer?: boolean;
  captionChildren?: React.ReactNode;
  mobileColumns?: ColumnsType<any>;
  isLastPage?: boolean;
  paginationType?: PaginationType;
  minHeight?: string;
};

const ExpandIcon = ({ expanded, onExpand, record }) => (
  <ExpandButton shape='circle' open={expanded} marginX={'1rem'} onClick={(e) => onExpand(record, e)} />
);
export const Table = (props: TableProps) => {
  const {
    // dataSource,
    columns,
    mobileColumns,
    variant = 'simple',
    expandable,
    pagination,
    total,
    current = 1,
    title,
    hasContainer = false,
    captionChildren = null,
    paginationType = PaginationType.PAGINATED,
    showHeader,
    size,
    minHeight = '20rem',
    ...restProps
  } = props;

  const [t] = useTr();
  const { isMobileOrTablet } = useResponsive();

  const rowClassName = (record, index) => {
    if (index % 2 === 0) {
      return 'even-row';
    } else {
      return 'odd-row';
    }
  };
  const _showHeader = showHeader ?? (isMobileOrTablet ? false : true);

  const editedColumns = (columns ?? []).map((column) => {
    return {
      align: column.align ?? 'center',
      ellipsis: column.ellipsis ?? { showTitle: false },
      ...column,
    };
  });

  const _columns: ColumnsType<any> = [...(editedColumns ?? []), ...(expandable ? [AntTable.EXPAND_COLUMN] : [])];

  const _mcolumns: ColumnsType<any> = [...(mobileColumns ?? []), ...(expandable ? [AntTable.EXPAND_COLUMN] : [])];
  const _expandable = expandable
    ? {
        // expandedRowRender,
        expandIcon: ExpandIcon,
        rowExpandable: () => true,
        expandRowByClick: true,
        ...expandable,
      }
    : undefined;
  const pageSizeList = pagination && pagination.pageSizeOptions ? pagination.pageSizeOptions : [5, 10, 20, 50, 100];
  const pageSizeOptions = pageSizeList.map((s: string | number) => ({ value: s, label: s }));

  const _pagination: object | false =
    pagination === false || paginationType === PaginationType.INCREMENTAL
      ? false
      : {
          total,
          current: current < 1 ? 1 : current,
          responsive: true,
          showSizeChanger: {
            variant: 'filled',
            size: 'default',
            options: pageSizeOptions,
          },
          hideOnSinglePage: false,
          // showQuickJumper:true,
          // showSizeChanger:false,
          showTitle: false,
          simple: isMobileOrTablet,
          ellipsis: {
            showTitle: false,
          },
          ...pagination,
        };
  const caption =
    title || captionChildren ? (
      <S.Caption>
        <span className={'caption-title'}>{title}</span>
        <span className={'caption-items'}>{captionChildren}</span>
      </S.Caption>
    ) : (
      <></>
    );

  function hasPaginationSizeChanger(): boolean {
    // Check if _pagination is an object and not null
    if (typeof _pagination === 'object' && _pagination !== null) {
      // If showSizeChanger is explicitly false, return false
      if (_pagination['showSizeChanger'] === false) {
        return false;
      }
      // Otherwise, return the truthy value of showSizeChanger, if it exists
      // return !!_pagination['showSizeChanger'];
      return true;
    }
    // If _pagination is not an object or is null, return false
    return false;
  }

  function handleClickMoreItems() {
    if (props?.onChange) {
      props.onChange({}, {}, {}, {} as any);
    }
  }

  const table = (
    <>
      <ConfigProvider
        theme={{
          components: { Table: { borderColor: 'transparent', headerBorderRadius: variant === 'complex' ? 0 : 8 } },
        }}
      >
        <S.Table
          bordered={variant === 'simple'}
          caption={caption}
          $minHeight={minHeight}
          variant={variant}
          size={size}
          // dataSource={dataSource}
          columns={isMobileOrTablet && _mcolumns && _mcolumns.length > 0 ? _mcolumns : _columns}
          rowClassName={rowClassName}
          expandable={_expandable}
          pagination={_pagination}
          showHeader={_showHeader}
          // scroll={{ x: variant === 'simple' ? 'fit-content' : '100vw' }}
          scroll={{ x: variant === 'simple' ? 'fit-content' : 700 }}
          $paginationText={t('uikit.rows_count')}
          $hasPaginationSizeChanger={hasPaginationSizeChanger().toString()}
          {...restProps}
        />
      </ConfigProvider>

      {paginationType === PaginationType.INCREMENTAL && !props?.isLastPage && (
        <Box marginTop={'1.4rem'} marginBottom={'2.4rem'} fillChildren={false} justifyContent={'center'}>
          <Button
            size={'middle'}
            loading={restProps?.loading}
            icon={<i className={'ri-arrow-down-double-fill'} />}
            onClick={handleClickMoreItems}
          >
            {t('button.display_more_items')}
          </Button>
        </Box>
      )}
    </>
  );

  if (hasContainer) {
    return <S.Wrapper>{table}</S.Wrapper>;
  } else {
    return table;
  }
};

Table.EXPAND_COLUMN = AntTable.EXPAND_COLUMN;
Table.MobileColumn = MobileColumn;
Table.MobileColumns = MobileColumns;
// export default Table;
