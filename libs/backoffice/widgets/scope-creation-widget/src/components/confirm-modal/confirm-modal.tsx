import React from 'react';

import { useTr } from '@oxygen/translation';
import { PageProps } from '@oxygen/types';
import { Button, MarkText, Modal } from '@oxygen/ui-kit';
import { useAppTheme } from '@oxygen/hooks';

import { ModalStateType } from '../../types';

type AppProps = PageProps & {
  englishNameScope: string;
  isOpen: ModalStateType;
  setIsOpen: React.Dispatch<React.SetStateAction<ModalStateType>>;
  onSubmit: () => void;
  loading: boolean;
};

const ConfirmModal: React.FC<AppProps> = (props) => {
  const [t] = useTr();
  const theme = useAppTheme();
  const { englishNameScope, isOpen, setIsOpen, onSubmit, loading } = props;

  const handleCancel = () => {
    if (loading) {
      return;
    }
    setIsOpen(false);
  };

  return (
    <Modal
      centered
      title={t('create_scope')}
      open={isOpen}
      onCancel={handleCancel}
      footer={[
        <Button
          disabled={loading}
          key={'cancel'}
          onClick={() => setIsOpen(false)}
          size='large'
          color='primary'
          variant='outlined'
        >
          {t('button.cancel')}
        </Button>,
        <Button key={'add'} onClick={onSubmit} loading={loading} size='large' color='secondary'>
          {t('buttons.confirm')}
        </Button>,
      ]}
    >
      <MarkText
        text={t('modal_text', { scope_name: englishNameScope })}
        wordToHighlight={englishNameScope}
        highlightColor={theme.secondary.main}
      />
    </Modal>
  );
};

export default ConfirmModal;
