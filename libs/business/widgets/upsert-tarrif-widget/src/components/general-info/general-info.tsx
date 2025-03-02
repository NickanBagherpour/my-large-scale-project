import { useTr } from '@oxygen/translation';
import Title from '../title/title';
import { BorderedSection } from '@oxygen/reusable-components';
import { Form, Input } from 'antd';
import { SearchItemsContainer } from '@oxygen/ui-kit';
import { GENERAL_INFO_NAMES } from '../../utils';
import { createSchemaFieldRule } from 'antd-zod';
import { createGeneralInfoSchema } from '../../types';
import * as S from './general-info.style';

export default function GeneralInfo() {
  const [t] = useTr();
  const rule = createSchemaFieldRule(createGeneralInfoSchema(t));

  return (
    <>
      <Title>{t('general_info')}</Title>
      <BorderedSection>
        <Form layout='vertical'>
          <SearchItemsContainer $columnNumber='3'>
            <S.FormItem name={GENERAL_INFO_NAMES.serviceName} label={t('service_name')} rules={[rule]}>
              <Input placeholder={t('enter_share_pct')} />
            </S.FormItem>

            <S.FormItem name={GENERAL_INFO_NAMES.bankingSharePct} label={t('banking_share_pct')} rules={[rule]}>
              <Input placeholder={t('enter_share_pct')} suffix={<S.Icon className='icon-percentage-circle' />} />
            </S.FormItem>

            <S.FormItem name={GENERAL_INFO_NAMES.opsTeamSharePct} label={t('ops_team_share_pct')} rules={[rule]}>
              <Input placeholder={t('enter_share_pct')} suffix={<S.Icon className='icon-percentage-circle' />} />
            </S.FormItem>
          </SearchItemsContainer>
        </Form>
      </BorderedSection>
    </>
  );
}
