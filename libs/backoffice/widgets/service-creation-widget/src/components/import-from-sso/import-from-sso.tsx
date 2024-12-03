import { useTr } from '@oxygen/translation';
import * as S from './import-from-sso.style';
import { Button } from '@oxygen/ui-kit';
import { createSchemaFieldRule } from 'antd-zod';
import { importFromSso, type ScopeFormType } from '../../types';
import ScopeLibrary from '../scope-library/scope-library';
import { useToggle } from '@oxygen/hooks';
import ScopeSelector from '../scope-selector/scope-selector';
import { type Scope } from '@oxygen/types';
import { Form, FormInstance } from 'antd';

type Props = {
  form: FormInstance<ScopeFormType>;
  selectScope: (scope: Scope) => void;
};

export default function ImportFromSso(props: Props) {
  const { form, selectScope } = props;
  const [t] = useTr();
  const rule = createSchemaFieldRule(importFromSso(t));
  const [isScopeLibraryOpen, toggleIsScopeLibraryOpen] = useToggle(false);
  const selectedScope = Form.useWatch('existingScopeName', form);

  return (
    <>
      <S.FormItem name={'existingScopeName'} label={t('scope_name')} rules={[rule]}>
        <Item toggle={toggleIsScopeLibraryOpen} selectedScope={selectedScope} />
      </S.FormItem>
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

type ItemProps = {
  id?: string;
  toggle: () => void;
  selectedScope: Scope;
  onChange?: (value: Scope) => void;
};

/* this component was created to align button and input fields consistently, regardless of error state. */
function Item(props: ItemProps) {
  const { toggle, onChange, id, selectedScope } = props;
  const [t] = useTr();
  return (
    <>
      <ScopeSelector id={id} onSelect={onChange} />
      <Button color='secondary' onClick={toggle} disabled={!!selectedScope}>
        <S.PlusIcon className='icon-plus' />
        {t('scope_library')}
      </Button>
    </>
  );
}
