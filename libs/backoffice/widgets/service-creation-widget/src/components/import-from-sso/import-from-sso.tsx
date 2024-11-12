import { useTr } from '@oxygen/translation';
import * as S from './import-from-sso.style';
import { Button, Input } from '@oxygen/ui-kit';
import { createSchemaFieldRule } from 'antd-zod';
import { importFromSso } from '../../types';
import ScopeLibrary from '../scope-library/scope-library';
import { useToggle } from '@oxygen/hooks';

export default function ImportFromSso() {
  const [t] = useTr();
  const rule = createSchemaFieldRule(importFromSso(t));
  const [isScopeLibraryOpen, toggleIsScopeLibraryOpen] = useToggle(false);

  return (
    <>
      <S.Sso>
        <S.FormItem name={'scopeName'} label={t('scope_name')} rules={[rule]}>
          <Input placeholder={t('scope_name_from_o2_or_scope')} />
        </S.FormItem>
        <Button color='secondary' onClick={toggleIsScopeLibraryOpen}>
          <S.PlusIcon className='icon-plus' />
          {t('scope_library')}
        </Button>
      </S.Sso>

      <S.Drawer
        title={t('scope_library')}
        placement={'left'}
        width={768}
        onClose={toggleIsScopeLibraryOpen}
        open={isScopeLibraryOpen}
        closeIcon={<S.CloseIcon className='icon-close-square' />}
      >
        <ScopeLibrary closeDrawer={toggleIsScopeLibraryOpen} />
      </S.Drawer>
    </>
  );
}
