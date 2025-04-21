import { useTr } from '@oxygen/translation';
import { SearchItemsContainer } from '@oxygen/ui-kit';

import { FormItem } from '../../form-item/form-item';
import { FORM_ITEMS_NAME } from '../../../utils/consts';
import { FormSection } from '../../form-section/form-section';

export const RepresentativeInfoSection = (props) => {
  const { rule } = props;
  const [t] = useTr();
  return (
    <FormSection title={'representative_information'} tooltip={'tooltip.representative_name'}>
      <SearchItemsContainer $columnNumber='3'>
        <FormItem.InputField
          name={FORM_ITEMS_NAME.REPRESENTATIVE.FIRST_AND_LAST_NAME}
          label={t('organization_form_label.first_and_last_name')}
          rules={[rule]}
          placeholder={t('organization_form_placeholder.first_and_last_name')}
        />
        <FormItem.InputField
          name={FORM_ITEMS_NAME.REPRESENTATIVE.MOBILE_NUMBER}
          label={t('organization_form_label.mobile_number')}
          rules={[rule]}
          placeholder={t('organization_form_placeholder.mobile_number')}
        />
        <FormItem.InputField
          name={FORM_ITEMS_NAME.REPRESENTATIVE.LANDLINE_NUMBER}
          label={t('organization_form_label.landline_number')}
          rules={[rule]}
          placeholder={t('organization_form_placeholder.landline_number')}
        />
      </SearchItemsContainer>
    </FormSection>
  );
};
