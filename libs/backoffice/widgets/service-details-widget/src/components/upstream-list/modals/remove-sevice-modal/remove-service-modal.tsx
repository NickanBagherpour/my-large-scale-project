import { Nullable } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { Button } from '@oxygen/ui-kit';
import { useAppTheme } from '@oxygen/hooks';

import { FallbackSelect } from '../../fallback-select/fallback-select';

import { useAppState } from '../../../../context';

import * as S from './remove-service-modal.style';

type Props = {
  isOpen: boolean;
  id: Nullable<string>;
  cancelToggle: () => void;
  deleteToggle: () => void;
  loading: boolean;
};

export default function RemoveServiceModal(props: Props) {
  const [t] = useTr();
  const { isOpen, cancelToggle, deleteToggle, id } = props;
  const theme = useAppTheme();
  const state = useAppState();

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
        <Button key={'first'} onClick={cancelToggle} color='primary' variant='outlined'>
          {t('button.cancel')}
        </Button>,
        <Button
          key={'second'}
          disabled={Boolean(!state.upstreamTab.activeSelect.cardId)}
          onClick={deleteToggle}
          color='error'
        >
          {t('upstream_tab.replace_upstream')}
        </Button>,
      ]}
    >
      <FallbackSelect />
    </S.Modal>
  );
}
