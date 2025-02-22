import { useTr } from '@oxygen/translation';
import { Loading, MarkText } from '@oxygen/ui-kit';
import { useAppTheme } from '@oxygen/hooks';

import { ToggleActivationInfo } from '../../types/toggle-status.type';
import { useGetClientsQuery } from '../../services/get-clients.api';

import { useToggleServiceAtivationMutation } from '../../services/toggle-service-activation.api';
import * as S from './toggle-status.style';
type Props = {
  toggleModal: () => void;
  service?: ToggleActivationInfo;
};
const ToggleStatusComponent: React.FC<Props> = ({ toggleModal, service }) => {
  const serviceName = service?.serviceName;
  const isActive = service?.isActive;
  const { isPending, mutate } = useToggleServiceAtivationMutation(toggleModal);
  const { isFetching, data } = useGetClientsQuery(serviceName);
  const [t] = useTr();
  const theme = useAppTheme();
  if (!service || !serviceName) {
    return null;
  }
  const clients = data?.content;
  const clientCount = data?.totalElements;
  const wordToHighlight = clientCount + ' ' + t('element.client');
  const handleToggleStatus = () => {
    mutate({ serviceName, enabled: !isActive });
  };
  return (
    <S.ResponsiveModal
      width={'32vw'}
      open={true}
      centered={true}
      title={t('common.warning') + '!'}
      okText={isActive ? t('stop_service') : t('service_activation')}
      cancelText={t('button.cancel')}
      onClose={toggleModal}
      onOk={handleToggleStatus}
      okButtonProps={{
        style: { backgroundColor: isActive ? theme.error.main : theme.secondary.main },
        disabled: isFetching,
      }}
      confirmLoading={isPending}
      onCancel={toggleModal}
      cancelButtonProps={{ style: { color: theme.primary.main } }}
    >
      {isFetching ? (
        <Loading spinning={isFetching} style={{ margin: '2rem 0' }} />
      ) : (
        <>
          {isActive && (
            <>
              {!!clientCount && (
                <MarkText
                  text={
                    t('element.service') +
                    ' ' +
                    serviceName +
                    t('to') +
                    wordToHighlight +
                    t('is_connected') +
                    t('deactivation_question')
                  }
                  wordToHighlight={wordToHighlight}
                  highlightColor={'error'}
                ></MarkText>
              )}
              {!clientCount && <p>{t('deactivation_confirm') + serviceName + t('are_u_sure')}</p>}
            </>
          )}
          {!isActive && (
            <>
              {!!clientCount && (
                <>
                  <MarkText
                    text={
                      t('element.service') +
                      ' ' +
                      serviceName +
                      t('to') +
                      wordToHighlight +
                      t('is_connected') +
                      t('with_activation')
                    }
                    wordToHighlight={wordToHighlight}
                    highlightColor={'success'}
                  />
                  <span>{wordToHighlight + t('activation_question')}</span>
                </>
              )}
              {!clientCount && <p>{t('activation_confirm') + serviceName + t('are_u_sure')}</p>}
            </>
          )}
          <S.ClientsContainer>
            {clients?.length > 0 && (
              <S.ClientList>
                {clients.map((client) => (
                  <li key={client.id}>{client.name}</li>
                ))}
              </S.ClientList>
            )}
          </S.ClientsContainer>
        </>
      )}
    </S.ResponsiveModal>
  );
};
export default ToggleStatusComponent;
