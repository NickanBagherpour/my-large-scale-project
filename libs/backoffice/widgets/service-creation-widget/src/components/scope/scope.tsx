import { Form, RadioChangeEvent } from 'antd';
import * as S from './scope.style';
import { useTr } from '@oxygen/translation';
import Footer from '../footer/footer';
import Box from '../box/box';
import ImportFromSso from '../import-from-sso/import-from-sso';
import CreateScope from '../create-scope/create-scope';
import type { CreateScopeFormType } from '../../types';
import { useAppDispatch, useAppState, updateScopeMode, previousStep } from '../../context';
import { type Scope } from '@oxygen/types';
import { Button, type ColumnsType } from '@oxygen/ui-kit';
import { useState } from 'react';
import { Container } from '../container/container.style';

export default function Scope() {
  const [t] = useTr();
  const [form] = Form.useForm<CreateScopeFormType>();
  const { scopeMode /* scope: addScope */ } = useAppState();
  const dispatch = useAppDispatch();
  const [selectedScope, setSelectedScope] = useState<Scope | null>(null);

  const chooseScope = (scope: Scope) => {
    setSelectedScope(scope);
  };

  const removeSelectedScope = () => {
    setSelectedScope(null);
  };

  const onChange = (e: RadioChangeEvent) => {
    updateScopeMode(dispatch, e.target.value);
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
    <Container>
      <Box>
        <S.Radios onChange={onChange} value={scopeMode}>
          <S.Radio value={'importFromSso'}>{t('import_from_sso')}</S.Radio>
          <S.Radio value={'createScope'}>{t('create_scope')}</S.Radio>
        </S.Radios>
        {scopeMode === 'importFromSso' ? (
          <ImportFromSso selectedScope={selectedScope} chooseScope={chooseScope} />
        ) : (
          <CreateScope selectedScope={selectedScope} chooseScope={chooseScope} />
        )}
      </Box>

      {selectedScope && (
        <S.Table columns={desktopColumns} dataSource={[selectedScope]} rowKey={(row) => row.idx} pagination={false} />
      )}

      <Footer onRegister={() => form.submit()} onReturn={onReturn} />
    </Container>
  );
}
