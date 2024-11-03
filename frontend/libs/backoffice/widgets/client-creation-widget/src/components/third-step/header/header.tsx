import { useTr } from '@oxygen/translation';
import { Box, Button } from '@oxygen/ui-kit';
import { useToggle } from '@oxygen/hooks';
import * as S from './header.style';
import LimitsModal from '../modal/limits-modal';

export default function PluginHeader() {
  const [t] = useTr();
  const [isModalOpen, toggleModalOpen] = useToggle(false);

  return (
    <Box>
      <S.Header>
        <S.Actions>
          <S.Title>{t('step_three.header_title')}</S.Title>
          <Button color='secondary' variant='text' onClick={toggleModalOpen}>
            <S.SettingsIcon className='icon-setting-linear' />
            {t('step_three.header_button')}
          </Button>
        </S.Actions>
      </S.Header>

      <LimitsModal toggle={toggleModalOpen} isOpen={isModalOpen} />
    </Box>
  );
}
