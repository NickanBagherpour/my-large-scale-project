import {
  CircularProgress,
  IconButton,
  MenuItem,
  TableProps as MuiTableProps,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';

import { useTr } from '@oxygen-portal/translation';
import { Obj } from '@oxygen-portal/types';

import { Pagination, Select } from '../index';
import * as S from './table.style';
import { ColumnType } from './table.types';

export type TableProps = MuiTableProps & {
  hasContainer?: boolean;
  columns?: ColumnType[];
  dataSource?: any;
  pagination?: false | Obj;
  loading?: boolean;
  onPageChange?: (event, page: number, rowsPerPage?: number) => void;
  displayRowsPerPage?: boolean;
  onRowClick?: (row) => void;
  style?: any;
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  expandedRowRender?: (record: any) => React.ReactNode; // Function to render expandable row
  rowKey?: string | ((record: any, index?: number) => string);
  hasRowNumber?: boolean;
};

const DEFAULT_ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

const Table: React.FC<TableProps> = (props) => {
  const {
    children,
    hasContainer = true,
    columns = [],
    dataSource = [],
    pagination = true,
    loading = false,
    displayRowsPerPage = false,
    onPageChange,
    onRowClick,
    style,
    rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE_OPTIONS,
    defaultRowsPerPage = DEFAULT_ROWS_PER_PAGE_OPTIONS[0],
    expandedRowRender,
    rowKey = 'id', // Use 'id' by default or provide a custom row key
    hasRowNumber,
    ...rest
  } = props;

  const [t] = useTr();
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);
  //const [page, setPage] = React.useState(getPaginationObject()?.page ?? 1);
  const [expandedRowKey, setExpandedRowKey] = React.useState<string | number | undefined>(undefined);

  //console.log('table' , page , getPaginationObject());

  const getColumns = () => {
    const _columns: any = [...columns];

    if (hasRowNumber) {
      _columns.unshift({
        title: t('common.row_number'),
        dataIndex: '__rowNumber__',
        key: '__rowNumber__',
        width: 48, // Adjust width as needed
        render: (value, record, idx) => {
          return getPaginationObject()?.page * rowsPerPage - rowsPerPage + 1 + idx;
        },
      });
    }

    if (expandedRowRender) {
      _columns.push({
        title: '',
        dataIndex: '__expand__',
        key: '__expand__',
        width: 48, // Adjust width as needed
      });
    }

    return _columns;
  };

  const _columns = getColumns();

  const getRowKey = (record: any, index?: number): string => {
    if (typeof rowKey === 'string') {
      return record[rowKey];
    } else if (typeof rowKey === 'function') {
      return rowKey(record, index);
    } else {
      return ''; // Handle invalid rowKey prop
    }
  };

  function renderCols() {
    if (!columns) return <></>;

    return (
      <TableHead>
        <TableRow>
          {_columns.map((col) => (
            <TableCell key={col.key ?? col.dataIndex} align={col.align ?? 'center'} variant={'head'} width={col.width}>
              {col.title ?? ''}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  function handleRowClick(e, row) {
    if (props.onRowClick) {
      props.onRowClick(row);
    }
    if (props.expandedRowRender && props.rowKey) {
      handleExpandRow(row);
    }
  }

  function renderRowCell(row, col, index) {
    if (col.dataIndex === '__expand__') {
      // Render expand/collapse icon
      return (
        <IconButton onClick={() => handleExpandRow(row)} size='small' className={'expand-icon-btn'}>
          {expandedRowKey === getRowKey(row, index) ? (
            <i className={'icon-up-arrow'} />
          ) : (
            <i className={'icon-bottom-arrow'} />
          )}
        </IconButton>
      );
    }

    if (col.render) {
      return col.render(row[col.dataIndex], row, index); // Call the render function with correct arguments
    }

    return <>{row[col.dataIndex] ?? ''}</>;
  }

  function isExpandable() {
    return !!expandedRowRender;
  }

  function checkBorder(row, index): string {
    const rowKey = getRowKey(row, index);

    if (isExpandable() && expandedRowKey === rowKey) {
      return '';
    }

    return 'bordered';
  }

  function renderRows() {
    return (
      <TableBody>
        {dataSource.map((row, index) => {
          const _rowKey = getRowKey(row, index);

          return (
            <React.Fragment key={_rowKey}>
              {/* Render main row */}
              <TableRow
                key={_rowKey}
                style={style}
                onClick={(e) => handleRowClick(e, row)}
                className={`tr-normal ${isExpandable() ? 'tr-clickable' : ''} ${checkBorder(row, index)}`}
              >
                {/* Render table cells */}
                {_columns.map((col) => (
                  <S.TableCell
                    key={col.key ?? col.dataIndex}
                    align={col.align ?? 'center'}
                    variant={'body'}
                    width={col.width}
                  >
                    {renderRowCell(row, col, index)}
                  </S.TableCell>
                ))}
              </TableRow>
              {/* Render expanded row if it exists */}
              {isExpandable() && expandedRowKey === _rowKey && (
                <TableRow className={'tr-expandable'}>
                  <TableCell colSpan={_columns.length}>{expandedRowRender!(row)}</TableCell>
                </TableRow>
              )}
            </React.Fragment>
          );
        })}
      </TableBody>
    );
  }

  function getPaginationObject() {
    if (!pagination || typeof pagination !== 'object') {
      // throw new Error('Invalid pagination object: must be an object.');
      return {} as any;
    }
    return props?.pagination;
  }

  const handleExpandRow = (record: any, index?: number) => {
    const rowKey = getRowKey(record, index);

    if (rowKey === expandedRowKey) {
      setExpandedRowKey(undefined); // Collapse row if it's already expanded
    } else {
      setExpandedRowKey(rowKey); // Expand row
    }
  };

  function handlePageChange(
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
    newRowsPerPage?: number
  ) {
    const _page = newPage;
    const _rowsPerPage = newRowsPerPage ?? rowsPerPage;
    // setPage(newPage); // Update page state
    setRowsPerPage(_rowsPerPage);
    if (onPageChange) {
      onPageChange(event, _page, _rowsPerPage);
    }
  }

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    const pageNumber = 1;
    // setPage(pageNumber); // Reset page to 1 when rows per page changes
    handlePageChange(event, pageNumber, newRowsPerPage);
  };

  function mapToPaginationProps(pagination): any {
    // Ensure 'pagination' is an object before proceeding
    if (!pagination || typeof pagination !== 'object') {
      // throw new Error('Invalid pagination object: must be an object.');
      return {};
    }

    // Extract necessary properties and handle potential undefined values
    // const _page = pagination.page || 1;
    const count = /*pagination.pageCount ||*/ Math.ceil(pagination.total / pagination.limit) || 0;

    // Map to expected PaginationProps format
    return {
      count: count,
      page: getPaginationObject()?.page,
      // Consider adding these props if your Pagination component requires them:
      // pageSize: pagination.limit || 10, // Use limit if available, default to 10
      // defaultPage: pagination.defaultPage || 1, // Use defaultPage if available, default to 1
      disabled: /*pagination.lastPage ||*/ !!pagination.loading, // Handle last page/loading state
      onChange: handlePageChange, // Pass handlePageChange as onChange prop
    };
  }

  function renderRowsPerPageSelect() {
    if (!displayRowsPerPage) {
      return <div></div>;
    }

    return (
      <div className={'rows-per-page-select'}>
        <p className={'label'}>{`${t('uikit.rows_per_page')}: `}</p>
        <Select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
          {rowsPerPageOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  }

  const loadingTable = (
    <>
      {loading && (
        <S.LoadingOverlay>
          <CircularProgress color='primary' thickness={3} />
        </S.LoadingOverlay>
      )}
      <S.Table {...rest}>
        {renderCols()}
        {renderRows()}
        {children}
      </S.Table>

      {pagination && (
        <S.PaginationWrapper>
          {renderRowsPerPageSelect()}

          <Pagination
            onPageChange={(e, newPage) => handlePageChange(e, newPage)}
            {...mapToPaginationProps(pagination)}
          />
        </S.PaginationWrapper>
      )}
    </>
  );

  const table = hasContainer ? <S.TableContainer>{loadingTable}</S.TableContainer> : loadingTable;

  return <S.Wrapper>{table}</S.Wrapper>;
};

export default Table;
