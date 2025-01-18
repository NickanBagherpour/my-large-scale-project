import React, { useState } from 'react';
import { useTr } from '@oxygen/translation';
import * as S from './upstream-details-info.style';
import { PageProps } from '@oxygen/types';
import { Button, InfoBox } from '@oxygen/ui-kit';
import { ROUTES, RQKEYS } from '@oxygen/utils';
import { queryClient } from '@oxygen/client';
import { AddUpstreamModal } from '@oxygen/reusable-components';
import { useEditUpstreamMutation } from '../../services/get-upstream-details.api';
import { updateMessageAction, useAppDispatch } from '../../context';

type UpstreamDetailsInfoProps = PageProps & {
  infoData?: { name: string; description: string; id: number };
  loading?: boolean;
};
const UpstreamDetailsInfo: React.FC<UpstreamDetailsInfoProps> = (props) => {
  const { infoData } = props;
  const [t] = useTr();

  const upstreamInfoData = [
    { key: t('english_upstream_name'), value: infoData?.name },
    { key: t('persian_upstream_name'), value: infoData?.description },
  ];
  const [openEditModal, setOpenEditModal] = useState(false);

  const { mutate, status } = useEditUpstreamMutation();
  const dispatch = useAppDispatch();

  const handleEditUpstream = async (values) => {
    try {
      const params = {
        name: values.name,
        description: values.description,
      };

      await mutate(params, {
        onSuccess: () => {
          updateMessageAction(dispatch, {
            description: t('edit_upstream_success'),
            type: 'success',
            shouldTranslate: false,
          });
          queryClient.invalidateQueries({ queryKey: [RQKEYS.UPSTREAM_DETAILS.GET_LIST] });
        },
      });
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };
  return (
    <S.Container>
      <AddUpstreamModal
        title={t('edit_upstream')}
        open={openEditModal}
        setOpen={setOpenEditModal}
        onConfirm={handleEditUpstream}
        status={status}
        initialData={{
          name: infoData?.name || '',
          description: infoData?.description || '',
        }}
        successMsg='edit_upstream_successfully'
      />
      <section>
        <S.Header>
          <S.TabName>{t('upstream_global_info')}</S.TabName>
          <S.Btns>
            <Button
              href={`${ROUTES.BACKOFFICE.UPSTREAM_HISTORY}?servicename=service-19`}
              color='primary'
              variant='filled'
            >
              <S.Icon className='icon-clock' />
              {t('display_change_history')}
            </Button>
            <Button onClick={() => setOpenEditModal(!openEditModal)} color='primary' variant='solid'>
              <S.Icon className='icon-edit' />
              {t('edit')}
            </Button>
          </S.Btns>
        </S.Header>

        <InfoBox margin={0} data={upstreamInfoData} minColumnCount={2} />
      </section>
    </S.Container>
  );
};

export default UpstreamDetailsInfo;
