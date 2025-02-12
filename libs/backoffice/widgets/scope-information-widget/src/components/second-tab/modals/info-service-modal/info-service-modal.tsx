import { useTr } from '@oxygen/translation';
import { Button, Chip, InfoBox, Modal } from '@oxygen/ui-kit';

import { useModalInfoQuery } from '../../../../services/second-tab/get-modal-data.api';
import { Nullable } from '@oxygen/types';

import * as S from './info-service-modal.style';
import { getValueOrDash } from '@oxygen/utils';
import React from 'react';
import { getDesktopColumns, getMobileColumns } from '../../../../utils/scope-information-table.utils';

type Props = {
  isOpen: boolean;
  toggle: () => void;
  name: Nullable<string>;
};

export default function DetailsModal(props: Props) {
  const { isOpen, toggle, name } = props;
  const [t] = useTr();

  const { data: modalDataQuery, isFetching: modalIsFetching } = useModalInfoQuery(name);

  const renderChip = (tag) => (
    <Chip key={tag} tooltipTitle={tag.label} ellipsis={true} tooltipOnEllipsis={true} type='active'>
      <span>{tag}</span>
    </Chip>
  );

  const firstInfoBoxData = [
    { key: t('modal.english_name'), value: getValueOrDash(modalDataQuery?.serviceLatinName) },
    { key: t('modal.persian_name'), value: getValueOrDash(modalDataQuery?.servicePersianName) },
    { key: t('modal.access'), value: getValueOrDash(modalDataQuery?.authenticationType?.title) },
    { key: t('modal.category'), value: getValueOrDash(modalDataQuery?.serviceCategoryTitle) },
    { key: t('modal.throughput'), value: getValueOrDash(modalDataQuery?.throughput?.title) },
    { key: t('modal.version'), value: getValueOrDash(modalDataQuery?.serviceVersion) },
    { key: t('modal.owner'), value: getValueOrDash(modalDataQuery?.ownerName) },
    {
      key: t('modal.tag'),
      value: modalDataQuery?.tags?.length && modalDataQuery?.tags.map((item) => renderChip(item?.title)),
      fullwidth: true,
    },
  ];

  const SecondInfoBoxData = [
    {
      key: t('modal.action'),
      value: modalDataQuery?.routes[0]?.routeMethod?.map((item) => renderChip(item)),
      fullwidth: true,
    },
    {
      key: t('modal.protocol'),
      value: modalDataQuery?.routes[0]?.routeProtocol?.map((item) => renderChip(item)),
      fullwidth: true,
    },
    { key: t('modal.path'), value: getValueOrDash(modalDataQuery?.routes[0]?.routePath), fullwidth: true },
    { key: t('modal.host'), value: getValueOrDash(modalDataQuery?.routes[0]?.routeHosts), fullwidth: true },
  ];

  const desktopColumns = getDesktopColumns({ t });
  const mobileColumns = getMobileColumns({ t });

  return (
    <Modal
      centered
      title={t('modal.service_detail')}
      open={isOpen}
      onCancel={toggle}
      width={1000}
      footer={[
        <Button size='large' color='primary' variant='outlined' onClick={toggle}>
          {t('register_data')}
        </Button>,
      ]}
    >
      <S.ItemWrapper>
        <S.CaptionInfoBox>{t('table.general_info')}</S.CaptionInfoBox>
        <InfoBox margin={'0 3.2rem'} data={firstInfoBoxData} loading={modalIsFetching} />
        <S.CaptionInfoBox>{t('table.route')}</S.CaptionInfoBox>
        <InfoBox margin={'0 3.2rem'} data={SecondInfoBoxData} loading={modalIsFetching} />
        <S.CaptionInfoBox>{t('table.scopes')}</S.CaptionInfoBox>
        <S.Table
          loading={modalIsFetching}
          total={modalDataQuery?.scopes?.length}
          dataSource={modalDataQuery?.scopes}
          pagination={false}
          columns={desktopColumns}
          mobileColumns={mobileColumns}
          rowKey={(row) => row.index}
        />
      </S.ItemWrapper>
    </Modal>
  );
}
