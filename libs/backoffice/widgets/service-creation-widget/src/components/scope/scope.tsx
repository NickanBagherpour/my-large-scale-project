import { Form, RadioChangeEvent, type FormProps } from 'antd';
import * as S from './scope.style';
import { useTr } from '@oxygen/translation';
import Footer from '../footer/footer';
import Box from '../box/box';
import ImportFromSso from '../import-from-sso/import-from-sso';
import CreateScope from '../create-scope/create-scope';
import type { ScopeType } from '../../types';
import { updateScopeStep, nextStep, useAppDispatch, useAppState, updateScopeMode, previousStep } from '../../context';

export default function Scope() {
  const [t] = useTr();
  const [form] = Form.useForm<ScopeType>();
  const { scopeMode, scope: addScope } = useAppState();
  const dispatch = useAppDispatch();

  const onChange = (e: RadioChangeEvent) => {
    updateScopeMode(dispatch, e.target.value);
  };

  const onFinish: FormProps<ScopeType>['onFinish'] = (values) => {
    updateScopeStep(dispatch, values);
    nextStep(dispatch);
  };

  const onReturn = () => {
    previousStep(dispatch);
  };

  return (
    <S.Form layout='vertical' onFinish={onFinish} form={form} initialValues={addScope}>
      <Box>
        <S.Radios onChange={onChange} value={scopeMode}>
          <S.Radio value={'importFromSso'}>{t('import_from_sso')}</S.Radio>
          <S.Radio value={'createScope'}>{t('create_scope')}</S.Radio>
        </S.Radios>
        {scopeMode === 'importFromSso' ? <ImportFromSso /> : <CreateScope />}
      </Box>
      <Footer onRegister={() => form.submit()} onReturn={onReturn} />
    </S.Form>
  );
}
