import React from 'react';
import { FormSection } from '../../form-section/form-section';
import { FormItem } from '../../form-item/form-item';
import { DatePicker, SearchItemsContainer, Select } from '@oxygen/ui-kit';
import { FORM_INPUT_VALIDATION, FORM_ITEMS_NAME } from '../../../utils/consts';
import { useTr } from '@oxygen/translation';

export const TechnicalRepresentativeInfoSection = (props) => {
  const { rule } = props;
  const [t] = useTr();
  return (
    <FormSection title={'technical_representative_information'} tooltip={'tooltip.technical_representative_name'}>
      <SearchItemsContainer $columnNumber='3'>
        <FormItem.InputField
          name={FORM_ITEMS_NAME.TECHNICAL_REPRESENTATIVE.FIRST_AND_LAST_NAME}
          label={t('organization_form_label.first_and_last_name')}
          rules={[rule]}
          placeholder={t('organization_form_placeholder.first_and_last_name')}
        />
        <FormItem.InputField
          name={FORM_ITEMS_NAME.TECHNICAL_REPRESENTATIVE.MOBILE_NUMBER}
          label={t('organization_form_label.mobile_number')}
          rules={[rule]}
          placeholder={t('organization_form_placeholder.mobile_number')}
        />
        <FormItem.InputField
          name={FORM_ITEMS_NAME.TECHNICAL_REPRESENTATIVE.LANDLINE_NUMBER}
          label={t('organization_form_label.landline_number')}
          rules={[rule]}
          placeholder={t('organization_form_placeholder.landline_number')}
        />
      </SearchItemsContainer>
    </FormSection>
  );
};
