import { useTr } from '@oxygen/translation';
import { ColumnsType, Input } from '@oxygen/ui-kit';
import { Radio } from 'antd';
import * as S from './scope-library.style';
import FormItem from '../form-item/form-item';

const items = Array.from({ length: 20 }).map(() => ({
  scopeName: 'svc-gfg-bhhj-ngdc-zxzxc-zxc',
  persianName: 'دریافت کد‌های ملی متعلق به یک شماره موبایل',
}));

export default function ScopeLibrary() {
  const [t] = useTr();

  const desktopColumns: ColumnsType<(typeof items)[number]> = [
    {
      title: t('choose'),
      key: 'choose',
      align: 'center',
      render: () => <Radio name='scope' />,
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

  return (
    <S.Form>
      <FormItem>
        <Input placeholder={t('persian_scope_name')} prefix={<i className='icon-search-normal' />} />
      </FormItem>
      <S.Table dataSource={items} columns={desktopColumns} />
      <S.Button color='primary'>{t('add')}</S.Button>
    </S.Form>
  );
}
