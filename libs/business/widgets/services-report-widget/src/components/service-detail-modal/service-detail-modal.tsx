import { type Dispatch } from 'react';

import { Button, Chip, InfoBox, Loading, Modal, type InfoBoxProps } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { getValueOrDash } from '@oxygen/utils';

import { useGetServiceClients } from '../../services';

import * as S from './service-detail-modal.style';
import { ServicesReportResponseType } from '../../types';

type Props = {
  isOpen: boolean;
  close: () => void;
  serviceName: string;
  dispatch: Dispatch<any>;
  data: ServicesReportResponseType['content'];
};

export default function DetailsModal(props: Props) {
  const { isOpen, close, serviceName, dispatch, data } = props;
  const [t] = useTr();

  const { data: clients, isFetching } = useGetServiceClients(serviceName, dispatch);

  const serviceInfo = data.find((v) => v.serviceName === serviceName) || null;

  let generalData: InfoBoxProps['data'] = [];

  if (serviceInfo) {
    const { category, isActive, owner, serviceName, servicePersianName } = serviceInfo;

    generalData = [
      { key: t('common.english_name'), value: getValueOrDash(serviceName) },
      { key: t('common.persian_name'), value: getValueOrDash(servicePersianName) },
      { key: t('uikit.category'), value: getValueOrDash(category) },
      { key: t('uikit.owner'), value: getValueOrDash(owner) },
    ];
  }

  return (
    <Modal
      centered
      title={t('uikit.service_detail')}
      open={isOpen}
      onCancel={close}
      width={1000}
      headerDivider
      footer={[
        <Button key='close' size='large' color='primary' variant='outlined' onClick={close}>
          {t('common.close')}
        </Button>,
      ]}
    >
      <S.Container>
        <div>
          <S.Title>{t('uikit.general_info')}</S.Title>
          <InfoBox margin={0} data={generalData} />
        </div>
      </S.Container>
      {isFetching ? <Loading /> : <span>fdgfdg</span>}
    </Modal>
  );
}
