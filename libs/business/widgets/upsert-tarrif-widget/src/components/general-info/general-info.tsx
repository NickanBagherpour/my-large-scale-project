import { useTr } from '@oxygen/translation';
import { BorderedSection } from '@oxygen/reusable-components';
import { SearchItemsContainer, Input, Select } from '@oxygen/ui-kit';
import { GENERAL_INFO_NAMES } from '../../utils';
import * as S from './general-info.style';

type Props = {
  rule: any;
};

export default function GeneralInfo(props: Props) {
  const { rule } = props;
  const [t] = useTr();

  const options = [
    { label: t('single'), value: 1 },
    { label: t('group'), value: 2 },
  ];

  return (
    <S.Section>
      <S.Title>{t('general_info')}</S.Title>
      <BorderedSection>
        <SearchItemsContainer $columnNumber='3'>
          <S.FormItem name={GENERAL_INFO_NAMES.serviceName} label={t('service_name')} rules={[rule]}>
            <Input disabled />
          </S.FormItem>

          <S.FormItem name={GENERAL_INFO_NAMES.bankingSharePct} label={t('banking_share_pct')} rules={[rule]}>
            <Input placeholder={t('enter_share_pct')} suffix={<S.Icon className='icon-percentage-circle' />} />
          </S.FormItem>

          <S.FormItem name={GENERAL_INFO_NAMES.opsTeamSharePct} label={t('ops_team_share_pct')} rules={[rule]}>
            <Input placeholder={t('enter_share_pct')} suffix={<S.Icon className='icon-percentage-circle' />} />
          </S.FormItem>

          <S.FormItem name={GENERAL_INFO_NAMES.serviceType} label={t('service_type')} rules={[rule]}>
            <Select id={'hello'} options={options} />
          </S.FormItem>

          <S.FormItem name={GENERAL_INFO_NAMES.fieldNameInElastic} label={t('field_name_in_elastic')} rules={[rule]}>
            <Input />
          </S.FormItem>

          <S.FormItem
            name={GENERAL_INFO_NAMES.transactionTypeInElastic}
            label={t('transaction_type_in_elastic')}
            rules={[rule]}
          >
            <Input />
          </S.FormItem>
        </SearchItemsContainer>
      </BorderedSection>
    </S.Section>
  );
}
