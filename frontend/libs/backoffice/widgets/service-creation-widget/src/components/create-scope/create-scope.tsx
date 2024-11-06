import { Input } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { createSchemaFieldRule } from 'antd-zod';
import { createScopeSchema } from '../../types';
import * as S from './create-scope.style';

export default function CreateScope() {
  const [t] = useTr();
  const rule = createSchemaFieldRule(createScopeSchema(t));
  return (
    <S.Create>
      <S.FormItem name={'scopeName'} label={t('scope_name')} rules={[rule]}>
        <Input />
      </S.FormItem>
      <S.FormItem name={'persianScopeName'} label={t('persian_scope_name')} rules={[rule]}>
        <Input />
      </S.FormItem>
    </S.Create>
  );
}
