import { RadioChangeEvent } from 'antd';
import * as S from './scope-list.style';
import { useTr } from '@oxygen/translation';
import Footer from './footer/footer';
import Box from './box/box';
import ImportFromSso from './import-from-sso/import-from-sso';
import { useAppDispatch, useAppState, updateScopeMode } from '../../context';
import { type Scope } from '@oxygen/types';
import { Box as UiKitBox, Button, type ColumnsType, Table } from '@oxygen/ui-kit';
import { useState } from 'react';
import { Container } from './container/container.style';

export default function Scope({ updateData }) {
  const [t] = useTr();
  const { scopeMode /* scope: addScope */ } = useAppState();
  const dispatch = useAppDispatch();
  const [selectedScope, setSelectedScope] = useState<Scope | null>(null);

  const chooseScope = (scope: Scope) => {
    setSelectedScope(scope);
  };

  const handleInputChange = (e) => {
    const formData = { [e.target.name]: e.target.value };
    updateData(formData);
  };

  const removeSelectedScope = () => {
    setSelectedScope(null);
  };

  const onChange = (e: RadioChangeEvent) => {
    updateScopeMode(dispatch, e.target.value);
  };

  const onReturn = () => {
    // previousStep(dispatch);
  };

  // const handleSubmit = () => {
  //   const formData = { scopeName: 'Example Scope' }; // Gather data
  //   if (onSubmit) {
  //     onSubmit(formData); // Pass data to parent
  //   }
  // };

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

  const mobileColumns: ColumnsType<Scope> = [
    {
      title: null,
      key: 'mobileColumn',
      render: () => {
        return (
          <UiKitBox flexDirection='column'>
            <Table.MobileColumn minHeight={'40px'} title={t('scope_english_name')} value={selectedScope?.scopeName} />
            {/* Use 'px' units for min-height to ensure consistency with the 22px height of the first row, as 'rem' units vary across screen sizes */}
            <Table.MobileColumn minHeight={'40px'} title={t('persian_name')} value={selectedScope?.persianName} />
            <Table.MobileColumn
              minHeight={'40px'}
              title={t('remove')}
              value={
                <Button className='item__btn' variant='link' color='error' onClick={removeSelectedScope}>
                  <S.TrashIcon className='icon-trash' />
                </Button>
              }
            />
          </UiKitBox>
        );
      },
    },
  ];

  return (
    <Container>
      <ImportFromSso selectedScope={selectedScope} chooseScope={chooseScope} />

      {/* <button onClick={handleSubmit}>Submit Scope</button> */}

      {selectedScope && (
        <S.Table
          columns={desktopColumns}
          mobileColumns={mobileColumns}
          dataSource={[selectedScope]}
          rowKey={(row) => row.idx}
          pagination={false}
        />
      )}

      {/* <input type='text' name='scopeName' placeholder='Enter Scope Name' onChange={handleInputChange} /> */}
      {/* 
      <Footer
        registerButtonProps={{ disabled: !selectedScope }}
        onRegister={() => console.log('hh')}
        onReturn={onReturn}
      /> */}
    </Container>
  );
}
