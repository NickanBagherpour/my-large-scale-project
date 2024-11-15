import { useTr } from '@oxygen/translation';
import * as S from './import-from-sso.style';
import { Button, Input } from '@oxygen/ui-kit';
import { createSchemaFieldRule } from 'antd-zod';
import { importFromSso } from '../../types';
import ScopeLibrary from '../scope-library/scope-library';
import { useToggle } from '@oxygen/hooks';
import { ChangeEvent } from 'react';

type ItemProps = {
  toggle: () => void;
  value?: string;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
};

/* this component was created to align button and input fields consistently, regardless of error state. */
function Item(props: ItemProps) {
  const { toggle, value, onChange, id } = props;
  const [t] = useTr();
  return (
    <>
      <Input value={value} onChange={onChange} id={id} placeholder={t('scope_name_from_o2_or_scope')} />
      <Button color='secondary' onClick={toggle}>
        <S.PlusIcon className='icon-plus' />
        {t('scope_library')}
      </Button>
    </>
  );
}

export default function ImportFromSso() {
  const [t] = useTr();
  const rule = createSchemaFieldRule(importFromSso(t));
  const [isScopeLibraryOpen, toggleIsScopeLibraryOpen] = useToggle(false);

  return (
    <>
      <S.FormItem name={'scopeName'} label={t('scope_name')} rules={[rule]}>
        <Item toggle={toggleIsScopeLibraryOpen} />
      </S.FormItem>

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
