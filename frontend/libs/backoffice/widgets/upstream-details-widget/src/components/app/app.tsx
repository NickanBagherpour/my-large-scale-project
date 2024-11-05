import { useRouter, useSearchParams } from 'next/navigation';
import { useAppState, resetErrorMessageAction, useAppDispatch } from '../../context';
import { useGetUpstreamDetailsQuery } from '../../services';
import UpstreamDetails from '../upstream-details-list/upstream-details-list';
import UpstreamInfo from '../upstream-info/upstream-info';
import * as S from './app.style';
import { Loading, Modal, Box, Button } from '@oxygen/ui-kit';
import { useState } from 'react';

import { useTr } from '@oxygen/translation';
import { NoResult } from '@oxygen/reusable-components';
import { GlobalMessageContainer } from '@oxygen/reusable-components';
import { useTheme } from 'styled-components';
import { ParamsType, UpstreamDetailsType, UpstreamDetailsTypeQuery } from '../../types';
import { useQueryClient } from '@tanstack/react-query';
import { RQKEYS } from '@oxygen/utils';

const App = () => {
  const theme = useTheme();
  const { errorMessage, ...fetchState } = useAppState();

  const { data: services, isFetching: isClientsFetching } = useGetUpstreamDetailsQuery(fetchState);

  const dispatch = useAppDispatch();
  const state = useAppState();
  const [t] = useTr();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedServerName, setSelectedServerName] = useState('');

  const queryClient = useQueryClient();

  const router = useRouter();
  const handleReturn = () => {
    router.back();
  };

  const handleSubmit = () => {
    console.log('submit');
  };

  const deleteHandler = (domain: string, weight: ParamsType) => {
    setOpenDeleteModal(true);
    setSelectedServerName(domain);
  };

  const handleDeleteOk = (domain: string) => {
    setConfirmLoading(true);
    setTimeout(() => {
      queryClient.setQueryData([RQKEYS.UPSTREAM_DETAILS.GET_LIST, fetchState], (oldData: UpstreamDetailsTypeQuery) => {
        if (!oldData) return;
        return {
          ...oldData,
          list: oldData.list.filter((item) => item.domain !== domain),
        };
      });

      setOpenDeleteModal(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleDeleteCancel = () => {
    console.log('Clicked cancel button');
    setOpenDeleteModal(false);
  };

  return (
    <>
      <Modal
        title={t('delete_server')}
        open={openDeleteModal}
        onOk={() => handleDeleteOk(selectedServerName)}
        confirmLoading={confirmLoading}
        onCancel={handleDeleteCancel}
        headerDivider={true}
        centered
        cancelText={t('button.cancel')}
        okText={t('button.delete')}
        okButtonProps={{ style: { backgroundColor: theme.error.main } }}
        cancelButtonProps={{ style: { color: theme.primary.main } }}
      >
        <S.ModalMessage>
          {t('delete_server_question')}
          <S.ServiceName
            text={selectedServerName}
            highlightColor={theme.error.main}
            wordToHighlight={selectedServerName}
          />
          {t('are_you_sure')}
        </S.ModalMessage>
      </Modal>

      <S.UpstreamDetailsContainer title={t('widget_name')}>
        <GlobalMessageContainer
          containerProps={{ marginBottom: '2.4rem' }}
          message={state.errorMessage}
          onClose={() => {
            resetErrorMessageAction(dispatch);
          }}
        />
        <UpstreamInfo />
        <Box className={'table-container'}>
          <Loading spinning={isClientsFetching} size='large'>
            {services?.list.length ? (
              <UpstreamDetails
                isFetching={isClientsFetching}
                data={services.list}
                total={services.total}
                isLoading={isClientsFetching}
                deleteUpstream={(domain, weight) => deleteHandler(domain, weight)}
              />
            ) : (
              <NoResult isLoading={false} />
            )}
          </Loading>
        </Box>
        <S.FooterContainer>
          <Button
            className={'register-button'}
            // variant={'outlined'}
            color={'primary'}
            size={'large'}
            onClick={handleReturn}
          >
            {t('button.return')}
          </Button>
          <Button
            className={'return-button'}
            variant={'outlined'}
            color={'primary'}
            size={'large'}
            onClick={handleSubmit}
          >
            {t('button.register')}
          </Button>
        </S.FooterContainer>
      </S.UpstreamDetailsContainer>
    </>
  );
};

export default App;
