import React from 'react';

import { Table } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';

import CustomInfobox from '../custom-infobox/custom-infobox';

import * as S from './upstream-details.style';
export const UpstreamDetails = (props) => {
  const { tableLoading, tableData, handleDeleteButton, infoBoxData, infoBoxLoading } = props;

  const [t] = useTr();

  return (
    <S.BorderBoxContainer>
      <CustomInfobox handleDeleteButton={handleDeleteButton} data={infoBoxData} loading={infoBoxLoading} />
      <S.Table>
        <S.Title>{t('upstream_tab.upstream_servers')}</S.Title>
        <Table dataSource={tableData} columns={[]} mobileColumns={[]} pagination={false} loading={tableLoading} />
      </S.Table>
    </S.BorderBoxContainer>
  );
};
