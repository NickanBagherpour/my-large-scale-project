import React from 'react';

import { Table } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';

import CustomInfobox from '../custom-infobox/custom-infobox';
import { getDesktopColumns, getMobileColumns } from '../../../utils/upstream-tab/table';

import * as S from './upstream-details.style';

export const UpstreamDetails = (props) => {
  const { tableLoading, tableData, handleDeleteButton, infoBoxData, infoBoxLoading } = props;

  const [t] = useTr();

  const desktopColumns = getDesktopColumns({ t });
  const mobileColumns = getMobileColumns({ t });

  return (
    <S.BorderBoxContainer>
      <CustomInfobox handleDeleteButton={handleDeleteButton} data={infoBoxData} loading={infoBoxLoading} />
      <S.Table>
        <S.Title>{t('upstream_tab.upstream_servers')}</S.Title>
        <Table
          dataSource={tableData}
          columns={desktopColumns}
          mobileColumns={mobileColumns}
          pagination={false}
          loading={tableLoading}
        />
      </S.Table>
    </S.BorderBoxContainer>
  );
};
