import * as S from './scope.style';
import { useTr } from '@oxygen/translation';
import Footer from '../footer/footer';
import { useAppDispatch, previousStep, nextStep } from '../../context';
import { Box as UiKitBox, Button, type ColumnsType, Table } from '@oxygen/ui-kit';
import { useEffect, useState } from 'react';
import { Container } from '../container/container.style';
import { type Scope as ScopeType } from '../../types';
import { getValueOrDash } from '@oxygen/utils';
import ScopeSelector from '../scope-selector/scope-selector';
import { useGetScope } from '../../services/get-scope.api';

export default function Scope() {
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const [selectedScope, setSelectedScope] = useState<ScopeType | null>(null);
  const { data: scope, isFetching: isFetchingScope } = useGetScope();

  useEffect(() => {
    if (scope?.data) setSelectedScope(scope.data);
  }, [scope]);

  const chooseScope = (scope: ScopeType) => {
    setSelectedScope(scope);
  };

  const removeSelectedScope = () => {
    setSelectedScope(null);
  };

  const onReturn = () => {
    previousStep(dispatch);
  };

  const desktopColumns: ColumnsType<ScopeType> = [
    {
      title: t('common.row_number'),
      key: 'rowNumber',
      align: 'center',
      render: (_val, _record, idx) => idx + 1,
    },
    {
      title: t('scope_english_name'),
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: t('scope_persian_name'),
      dataIndex: 'description',
      align: 'center',
      render: (value) => getValueOrDash(value),
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

  const mobileColumns: ColumnsType<ScopeType> = [
    {
      title: null,
      key: 'mobileColumn',
      render: () => {
        return (
          <UiKitBox flexDirection='column'>
            <Table.MobileColumn minHeight={'40px'} title={t('scope_english_name')} value={selectedScope?.name} />
            {/* Use 'px' units for min-height to ensure consistency with the 22px height of the first row, as 'rem' units vary across screen sizes */}
            <Table.MobileColumn minHeight={'40px'} title={t('persian_name')} value={selectedScope?.description} />
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
      <S.Label>
        <S.Title>{t('choose_scope')}</S.Title>
        <ScopeSelector isLoading={isFetchingScope} onSelect={chooseScope} disabled={!!selectedScope} />
      </S.Label>

      <S.Table
        columns={desktopColumns}
        mobileColumns={mobileColumns}
        dataSource={selectedScope ? [selectedScope] : []}
        rowKey={(row) => row.idx}
        pagination={false}
      />

      <Footer
        registerButtonProps={{ disabled: !selectedScope }}
        onRegister={() => nextStep(dispatch)}
        onReturn={onReturn}
      />
    </Container>
  );
}
