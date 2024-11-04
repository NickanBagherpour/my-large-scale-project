import { Form, Radio, RadioChangeEvent } from 'antd';
import * as S from './add-scope.style';
import { useState } from 'react';
import { useTr } from '@oxygen/translation';
import { Button, Input } from '@oxygen/ui-kit';
import Footer from '../footer/footer';
import { useToggle } from '@oxygen/hooks';
import ScopeLibrary from '../scope-library/scope-library';
import Box from '../box/box';

type Mode = 'importFromSso' | 'createScope';

export default function AddScope() {
  const [mode, setMode] = useState<Mode>('importFromSso');
  const [t] = useTr();
  const [form] = Form.useForm();
  const [isScopeLibraryOpen, toggleIsScopeLibraryOpen] = useToggle(false);

  const onChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
  };

  return (
    <>
      <S.Form layout='vertical'>
        <Box>
          <S.Radios onChange={onChange} value={mode}>
            <Radio value={'importFromSso'}>{t('import_from_sso')}</Radio>
            <Radio value={'createScope'}>{t('create_scope')}</Radio>
          </S.Radios>

          {mode === 'importFromSso' ? (
            <S.Sso>
              <S.FormItem label={t('scope_name')}>
                <Input placeholder={t('scope_name_from_o2_or_scope')} />
              </S.FormItem>
              <Button color='secondary' onClick={toggleIsScopeLibraryOpen}>
                <S.PlusIcon className='icon-plus' />
                {t('scope_library')}
              </Button>
            </S.Sso>
          ) : (
            <S.Create>
              <S.FormItem label={t('scope_name')}>
                <Input />
              </S.FormItem>
              <S.FormItem label={t('persian_scope_name')}>
                <Input />
              </S.FormItem>
            </S.Create>
          )}
        </Box>

        <Footer onRegister={() => form.submit()} onReturn={() => void 1} />
      </S.Form>

      <S.Drawer
        title={t('scope_library')}
        placement={'left'}
        width={768}
        onClose={toggleIsScopeLibraryOpen}
        open={isScopeLibraryOpen}
        closeIcon={<S.CloseIcon className='icon-close-square' />}
      >
        <ScopeLibrary />
      </S.Drawer>
    </>
  );
}
