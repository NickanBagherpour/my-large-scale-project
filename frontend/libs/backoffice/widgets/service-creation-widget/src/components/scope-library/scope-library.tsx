import { useTr } from '@oxygen/translation';
import { ColumnsType, Input } from '@oxygen/ui-kit';
import * as S from './scope-library.style';

type Scope = {
  scopeName: string;
  persianName: string;
};

const items: Scope[] = Array.from({ length: 20 }).map(() => ({
  scopeName: 'svc-gfg-bhhj-ngdc-zxzxc-zxc',
  persianName: 'دریافت کد‌های ملی متعلق به یک شماره موبایل',
}));

export default function ScopeLibrary() {
  const [t] = useTr();

  const desktopColumns: ColumnsType<Scope> = [
    {
      title: t('choose'),
      key: 'choose',
      align: 'center',
      render: () => <S.Radio name='scope' />,
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
      render: ({ persianName, scopeName }: Scope) => (
        <S.TableCell>
          <S.TableRow>
            <strong>{t('choose')}</strong>
            <S.Radio name='scope' />
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
      ),
    },
  ];

  return (
    <S.Form layout={'vertical'}>
      <S.FormItem label={t('search')}>
        <Input placeholder={t('persian_or_english_name')} prefix={<i className='icon-search-normal' />} />
      </S.FormItem>
      <S.Table
        scroll={{ x: 'max-content' }}
        dataSource={items}
        columns={desktopColumns}
        mobileColumns={mobileColumns}
      />
      <S.Button color='primary'>{t('add')}</S.Button>
    </S.Form>
  );
}
