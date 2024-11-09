import { useTr } from '@oxygen/translation';
import { ColumnsType, Input } from '@oxygen/ui-kit';
import * as S from './scope-library.style';
import { useGetScopes } from '../../services';
import { Scope } from '@oxygen/types';
import { useState } from 'react';

type Props = {
  closeDrawer: () => void;
};

export default function ScopeLibrary(props: Props) {
  const { closeDrawer } = props;
  const [t] = useTr();
  const { data, isFetching } = useGetScopes();
  const [scope, setScope] = useState<Scope | null>(null);

  const addScope = () => {
    closeDrawer();
  };

  const desktopColumns: ColumnsType<Scope> = [
    {
      title: t('choose'),
      key: 'choose',
      align: 'center',
      render: (record) => <S.Radio checked={scope?.idx === record.idx} onChange={() => setScope(record)} />,
    },
    {
      title: t('scope_name'),
      dataIndex: 'scopeName',
      align: 'center',
    },
    {
      title: t('persian_name'),
      dataIndex: 'persianName',
      align: 'center',
    },
  ];

  const mobileColumns: ColumnsType<Scope> = [
    {
      title: null,
      key: 'mobileColumn',
      render: (scope: Scope) => {
        const { persianName, scopeName, idx } = scope;
        return (
          <S.TableCell>
            <S.TableRow>
              <strong>{t('choose')}</strong>
              <S.Radio checked={scope?.idx === idx} onChange={() => setScope(scope)} />
            </S.TableRow>
            <S.TableRow>
              <strong>{t('persian_name')}</strong>
              <span>{persianName}</span>
            </S.TableRow>
            <S.TableRow>
              <strong>{t('scope_name')}</strong>
              <span>{scopeName}</span>
            </S.TableRow>
          </S.TableCell>
        );
      },
    },
  ];

  return (
    <S.Form layout={'vertical'}>
      <S.Divider />
      <S.FormItem label={t('search')}>
        <Input placeholder={t('persian_or_english_name')} prefix={<i className='icon-search-normal' />} />
      </S.FormItem>
      <S.Table
        scroll={{ x: 'max-content' }}
        dataSource={data}
        loading={isFetching}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
      />
      <S.Button onClick={addScope} disabled={!scope} color='primary'>
        {t('add')}
      </S.Button>
    </S.Form>
  );
}
