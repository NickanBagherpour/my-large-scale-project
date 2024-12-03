import { Form, RadioChangeEvent, type FormProps } from 'antd';
import * as S from './scope.style';
import { useTr } from '@oxygen/translation';
import Footer from '../footer/footer';
import Box from '../box/box';
import ImportFromSso from '../import-from-sso/import-from-sso';
import CreateScope from '../create-scope/create-scope';
import type { ScopeFormType } from '../../types';
import { updateScopeStep, nextStep, useAppDispatch, useAppState, updateScopeMode, previousStep } from '../../context';
import { type Scope } from '@oxygen/types';
import { Button, type ColumnsType } from '@oxygen/ui-kit';

export default function Scope() {
  const [t] = useTr();
  const [form] = Form.useForm<ScopeFormType>();
  const { scopeMode, scope: addScope } = useAppState();
  const dispatch = useAppDispatch();
  const existingSelectedScope = Form.useWatch('existingScopeName', form);

  const selectScope = (scope: Scope) => {
    form.setFieldValue('existingScopeName', scope);
  };

  const removeSelectedScope = () => {
    form.setFieldValue('existingScopeName', null);
  };

  const onChange = (e: RadioChangeEvent) => {
    updateScopeMode(dispatch, e.target.value);
  };

  const onFinish: FormProps<ScopeFormType>['onFinish'] = (values) => {
    updateScopeStep(dispatch, values);
    nextStep(dispatch);
  };

  const onReturn = () => {
    previousStep(dispatch);
  };

  const desktopColumns: ColumnsType<Scope> = [
    {
      title: t('common.row_number'),
      key: 'rowNumber',
      align: 'center',
      render: (_val, _record, idx) => idx + 1,
    },
    {
      title: t('scope_english_name'),
      dataIndex: 'scopeName',
      align: 'center',
    },
    {
      title: t('scope_persian_name'),
      dataIndex: 'persianName',
      align: 'center',
    },
    {
      key: 'remove',
      align: 'center',
      render: () => (
        <Button variant='link' color='error' onClick={removeSelectedScope}>
          <S.TrashIcon className='icon-trash' />
        </Button>
      ),
    },
  ];

  return (
    <S.Form layout='vertical' onFinish={onFinish} form={form} initialValues={addScope}>
      <Box>
        <S.Radios onChange={onChange} value={scopeMode}>
          <S.Radio value={'importFromSso'}>{t('import_from_sso')}</S.Radio>
          <S.Radio value={'createScope'}>{t('create_scope')}</S.Radio>
        </S.Radios>
        {scopeMode === 'importFromSso' ? <ImportFromSso form={form} selectScope={selectScope} /> : <CreateScope />}
      </Box>

      {existingSelectedScope && (
        <S.Table
          columns={desktopColumns}
          dataSource={[existingSelectedScope]}
          rowKey={(row) => row.idx}
          pagination={false}
        />
      )}

      <Footer onRegister={() => form.submit()} onReturn={onReturn} />
    </S.Form>
  );
}
