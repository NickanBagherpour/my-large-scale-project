import { Form, RadioChangeEvent } from 'antd';
import * as S from './add-scope.style';
import { useState } from 'react';
import { useTr } from '@oxygen/translation';
import Footer from '../footer/footer';
import Box from '../box/box';
import ImportFromSso from '../import-from-sso/import-from-sso';
import CreateScope from '../create-scope/create-scope';

type Mode = 'importFromSso' | 'createScope';

export default function AddScope() {
  const [mode, setMode] = useState<Mode>('importFromSso');
  const [t] = useTr();
  const [form] = Form.useForm();

  const onChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
  };

  const onFinish = (values) => {
    console.log(':)', 'onFinish', values);
  };

  return (
    <S.Form layout='vertical' onFinish={onFinish} form={form}>
      <Box>
        <S.Radios onChange={onChange} value={mode}>
          <S.Radio value={'importFromSso'}>{t('import_from_sso')}</S.Radio>
          <S.Radio value={'createScope'}>{t('create_scope')}</S.Radio>
        </S.Radios>
        {mode === 'importFromSso' ? <ImportFromSso /> : <CreateScope />}
      </Box>
      <Footer onRegister={() => form.submit()} onReturn={() => void 1} />
    </S.Form>
  );
}
