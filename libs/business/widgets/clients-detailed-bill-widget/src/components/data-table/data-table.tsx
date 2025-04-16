import { useTr } from '@oxygen/translation';
import type { TablePaginationConfig } from 'antd';
import * as S from './data-table.style';
import { updatePaginationAction, useAppDispatch, useAppState } from '../../context';
import { Reports } from '../../types';
import { getDesktopColumns, getMobileColumns } from '../../utils';

type Props = {
  data: Reports | undefined;
  isFetching: boolean;
};

export default function DataTable(props: Props) {
  const { data, isFetching } = props;
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const { page, size } = useAppState();

  const changePage = async (currentPagination: TablePaginationConfig) => {
    const { pageSize, current } = currentPagination;
    if (pageSize && current) {
      updatePaginationAction(dispatch, {
        page: pageSize === size ? current : 1,
        size: pageSize,
      });
    }
  };

  const desktopColumns = getDesktopColumns({
    t,
    size,
    page,
    dispatch,
  });

  const mobileColumns = getMobileColumns({ t });

  return (
    <S.Table
      current={page}
      total={data?.totalElements}
      dataSource={data?.content}
      pagination={{ pageSize: size }}
      columns={desktopColumns}
      loading={isFetching}
      mobileColumns={mobileColumns}
      onChange={changePage}
      rowKey={(row) => row.id}
    />
  );
}
