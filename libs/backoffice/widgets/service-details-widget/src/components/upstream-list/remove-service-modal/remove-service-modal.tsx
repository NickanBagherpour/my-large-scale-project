import { useEffect, useState } from 'react';

import { Nullable } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { Button } from '@oxygen/ui-kit';
import { useAppTheme } from '@oxygen/hooks';

import { FallbackSelect } from '../fallback-select/fallback-select';

import { useAppState } from '../../../context';

import * as S from './remove-service-modal.style';

type Props = {
  isOpen: boolean;
  id: Nullable<string>;
  cancelToggle: () => void;
  deleteToggle: () => void;
};

export default function RemoveServiceModal(props: Props) {
  const [t] = useTr();
  const { isOpen, cancelToggle, deleteToggle, id } = props;
  const theme = useAppTheme();
  const state = useAppState();

  const [Query, setQuery] = useState({ page: 1, searchTerm: '' });

  useEffect(() => {
    setQuery((prev) => ({ ...prev, page: 1 }));
  }, [isOpen]);

  return (
    <S.Modal
      centered
      title={
        <S.MarkText
          text={t('upstream_tab.description', { id })}
          wordToHighlight={id ?? ''}
          highlightColor={theme.error.main}
        />
      }
      open={isOpen}
      closeIcon={false}
      footer={[
        <Button key={'cancelButton'} onClick={cancelToggle} color='primary' variant='outlined'>
          {t('button.cancel')}
        </Button>,
        <Button
          key={'deleteButton'}
          disabled={Boolean(!state.upstreamTab.activeSelect.cardId)}
          onClick={deleteToggle}
          color='error'
        >
          {t('upstream_tab.replace_upstream')}
        </Button>,
      ]}
    >
      <FallbackSelect isOpenModal={isOpen} setQuery={setQuery} Query={Query} />
    </S.Modal>
  );
}
