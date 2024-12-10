import { useTr } from '@oxygen/translation';
import * as S from './import-from-sso.style';
import { Button } from '@oxygen/ui-kit';
import ScopeLibrary from '../scope-library/scope-library';
import { useToggle } from '@oxygen/hooks';
import ScopeSelector from '../scope-selector/scope-selector';
import { type Scope } from '@oxygen/types';

type Props = {
  chooseScope: (scope: Scope) => void;
  selectedScope: Scope | null;
};

export default function ImportFromSso(props: Props) {
  const { chooseScope: selectScope, selectedScope } = props;
  const [t] = useTr();
  const [isScopeLibraryOpen, toggleIsScopeLibraryOpen] = useToggle(false);

  return (
    <>
      <S.Container>
        <ScopeSelector style={{ flex: 1 }} onSelect={selectScope} />
        <Button color='secondary' onClick={toggleIsScopeLibraryOpen} disabled={!!selectedScope}>
          <S.PlusIcon className='icon-plus' />
          {t('scope_library')}
        </Button>
      </S.Container>

      {isScopeLibraryOpen && (
        <S.Drawer
          title={t('scope_library')}
          placement={'left'}
          width={768}
          onClose={toggleIsScopeLibraryOpen}
          open={isScopeLibraryOpen}
          closeIcon={<S.CloseIcon className='icon-close-square' />}
        >
          <ScopeLibrary selectScope={selectScope} closeDrawer={toggleIsScopeLibraryOpen} />
        </S.Drawer>
      )}
    </>
  );
}
