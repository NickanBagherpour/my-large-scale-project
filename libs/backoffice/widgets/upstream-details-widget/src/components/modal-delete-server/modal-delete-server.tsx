import { useTr } from '@oxygen/translation';
import * as S from './modal-delete-server.style';
import { useAppTheme } from '@oxygen/hooks';
import { Table } from '@oxygen/ui-kit';
import { uuid } from '@oxygen/utils';
import {
  getDesktopColumnsDeleteServerModal,
  getMobileColumnsDeleteServerModal,
} from '../../utils/upstream-details-list-util';
import { UpstreamDetailsType } from '../../types';

type Props = {
  title: string;
  open: boolean;
  onOk: () => void;
  confirmLoading: boolean;
  onCancel: () => void;
  headerDivider: boolean;
  centered: boolean;
  cancelText: string;
  okText: string;
  okButtonProps: any;
  cancelButtonProps: any;
  data?: UpstreamDetailsType[];
};

export default function ServerDeleteModal(props: Props) {
  const [t] = useTr();
  const theme = useAppTheme();
  const {
    title,
    open,
    onOk,
    confirmLoading,
    onCancel,
    headerDivider,
    centered,
    cancelText,
    okText,
    okButtonProps,
    cancelButtonProps,
    data,
  } = props;
  const desktopColumns = getDesktopColumnsDeleteServerModal({ t });
  const mobileColumns = getMobileColumnsDeleteServerModal({ t });

  const tableData = data?.map((item, index) => ({ ...item, index: index + 1 }));

  return (
    <S.ModalContainer
      centered={centered}
      title={title}
      open={open}
      onOk={onOk}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      headerDivider={headerDivider}
      cancelText={cancelText}
      okText={okText}
      // closable={false}
      keyboard={false}
      // footer={[]}
      okButtonProps={okButtonProps}
      cancelButtonProps={cancelButtonProps}
    >
      <S.ModalMessage>
        {t('are_you_sure_delete_server_question')}
        {/* <S.ServiceName
          text={selectedServerName}
          highlightColor={theme.error.main}
          wordToHighlight={selectedServerName}
        /> */}
        {/* {t('are_you_sure')} */}
      </S.ModalMessage>
      <S.TableContainer>
        <Table
          // loading={isFetching}
          // current={pagination.page}
          // total={total}
          dataSource={tableData}
          columns={desktopColumns}
          mobileColumns={mobileColumns}
          hasContainer={false}
          pagination={false}
          // pagination={{ pageSize: pagination.rowsPerPage }}
          // onChange={handlePageChange}
          rowKey={() => uuid()}
          showHeader
        />
      </S.TableContainer>
    </S.ModalContainer>
  );
}
