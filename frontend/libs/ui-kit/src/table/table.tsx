'use client';

import { Table as AntTable, TableProps as AntTableProps } from 'antd';
import { ColumnsType as AntColumnsType } from 'antd/lib/table';
import React from 'react';

import { useTr } from '@oxygen/translation';
import { Nullable } from '@oxygen/types';

import { useResponsive } from '@oxygen/hooks';
import { Button } from '../button/button';

import { Box } from '../box/box';
import { MobileColumn } from './mobile-column';
import * as S from './table.style';
import { ExpandButton } from '../button/expand-button';

export type ColumnsType<T> = AntColumnsType<T> & {
  //
};

export enum PaginationType {
  PAGINATED = 'paginated',
  INCREMENTAL = 'incremental',
}

export type TableProps = Omit<AntTableProps<any>, 'title'> & {
  // Custom props specific to your component
  // isExpandable?: boolean;
  // hidePagination?: boolean;
  simpleTables?: boolean;
  total?: number;
  current?: number;
  title?: Nullable<string>;
  hasContainer?: boolean;
  captionChildren?: React.ReactNode;
  mobileColumns?: ColumnsType<any>;
  isLastPage?: boolean;
  paginationType?: PaginationType;
  scroll_x?: number;
};

const ExpandIcon = ({ expanded, onExpand, record }) => (
  <ExpandButton open={expanded} marginX={'1rem'} onClick={(e) => onExpand(record, e)} />
);

export const Table = (props: TableProps) => {
  const {
    // dataSource,
    columns,
    mobileColumns,
    // isExpandable = false,
    simpleTables = false,
    expandable,
    pagination,
    total,
    current = 1,
    title,
    hasContainer = true,
    captionChildren = null,
    paginationType = PaginationType.PAGINATED,
    showHeader,
    scroll_x,
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

  const _showHeader = showHeader ?? (isMobileOrTablet ? false : !!(props.dataSource && props.dataSource.length));

  const _columns: ColumnsType<any> = [...(columns ?? []), ...(expandable ? [AntTable.EXPAND_COLUMN] : [])];

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

  const _pagination =
    pagination === false || paginationType === PaginationType.INCREMENTAL
      ? false
      : {
          // onChange: onPaginationUpdate,
          pageSizeOptions: [5, 10, 20, 50, 100],
          showTotal: (total, range) => `${range[0]} - ${range[1]} ${t('common.of')} ${total}`,
          // pageSize: paginationInfo.limit,
          // current: paginationInfo.current,
          total,
          current: current < 1 ? 1 : current,
          // size: 'small',
          responsive: true,
          showSizeChanger: true,
          // hideOnSinglePage: true,
          // showQuickJumper:true,
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

  function handleClickMoreItems() {
    if (props?.onChange) {
      props.onChange({}, {}, {}, {} as any);
    }
  }

  const table = (
    <>
      <S.Table
        caption={caption}
        simpleTables={simpleTables}
        // dataSource={dataSource}
        columns={isMobileOrTablet && _mcolumns && _mcolumns.length > 0 ? _mcolumns : _columns}
        rowClassName={rowClassName}
        expandable={_expandable}
        pagination={_pagination}
        showHeader={_showHeader}
        scroll={scroll_x ? { x: scroll_x } : { x: 'fit-content' }}
        {...restProps}
      />

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
// export default Table;
