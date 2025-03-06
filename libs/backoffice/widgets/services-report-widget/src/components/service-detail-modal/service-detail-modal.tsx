import { type Dispatch } from 'react';

import { Button, Chip, InfoBox, Loading, Modal, type InfoBoxProps } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { getValueOrDash } from '@oxygen/utils';

import { useGetServiceDetails } from '../../services';

import * as S from './service-detail-modal.style';

type Props = {
  isOpen: boolean;
  close: () => void;
  serviceName: string;
  dispatch: Dispatch<any>;
};

export default function DetailsModal(props: Props) {
  const { isOpen, close, serviceName, dispatch } = props;
  const [t] = useTr();
  const { data: service, isFetching } = useGetServiceDetails(serviceName, dispatch);

  let generalData: InfoBoxProps['data'] = [];

  if (service) {
    const {
      throughput,
      tags,
      ownerName,
      serviceVersion,
      serviceLatinName,
      authenticationType,
      servicePersianName,
      serviceCategoryTitle,
    } = service;

    generalData = [
      { key: t('common.english_name'), value: serviceLatinName },
      { key: t('common.persian_name'), value: servicePersianName },
      { key: t('uikit.access'), value: authenticationType.title },
      { key: t('uikit.category'), value: getValueOrDash(serviceCategoryTitle) },
      { key: t('uikit.throughout'), value: throughput.title },
      { key: t('uikit.version'), value: serviceVersion },
      { key: t('uikit.owner'), value: ownerName },

      {
        key: t('uikit.tag'),
        value:
          tags.map((tag) => (
            <Chip tooltipTitle={tag.title} key={tag.id} type='active'>
              {tag.title}
            </Chip>
          )) ?? [],
        fullwidth: true,
      },
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
      {isFetching ? (
        <Loading />
      ) : (
        <S.Container>
          <div>
            <S.Title>{t('uikit.general_info')}</S.Title>
            <InfoBox margin={0} data={generalData} />
          </div>
        </S.Container>
      )}
    </Modal>
  );
}
