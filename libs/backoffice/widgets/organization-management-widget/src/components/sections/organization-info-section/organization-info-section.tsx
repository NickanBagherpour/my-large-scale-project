import { useTr } from '@oxygen/translation';
import { DatePicker, SearchItemsContainer, Select } from '@oxygen/ui-kit';

import { FormItem } from '../../form-item/form-item';
import { FormSection } from '../../form-section/form-section';
import { FORM_INPUT_VALIDATION, FORM_ITEMS_NAME } from '../../../utils/consts';

export const OrganizationInfoSection = (props) => {
  const { rule, selectOptions, isFormDisabled } = props;
  const [t] = useTr();
  return (
    <FormSection title={'organization_info'}>
      <SearchItemsContainer>
        <FormItem.InputField
          name={FORM_ITEMS_NAME.LEGAL_ENTITY_NAME}
          label={'organization_form_label.legal_entity_name'}
          rules={[rule]}
          placeholder={'organization_form_placeholder.legal_entity_name'}
          maxLength={FORM_INPUT_VALIDATION.INPUT_MAX_LENGTH}
          minLength={FORM_INPUT_VALIDATION.MIN_LEGAL_PERSON_NAME_LENGTH}
        />
        <FormItem
          name={FORM_ITEMS_NAME.LEGAL_ENTITY_TYPE}
          label={'organization_form_label.legal_entity_type'}
          rules={[rule]}
        >
          <Select
            placeholder={t('organization_form_placeholder.legal_entity_type')}
            disabled={isFormDisabled}
            size={'large'}
            options={selectOptions}
          ></Select>
        </FormItem>
        <FormItem.InputField
          name={FORM_ITEMS_NAME.REGISTRATION_NUMBER}
          label={'organization_form_label.registration_number'}
          rules={[rule]}
          placeholder={'organization_form_placeholder.registration_number'}
          maxLength={FORM_INPUT_VALIDATION.MAX_REGISTRATION_NUMBER_LENGTH}
          allow='number'
        />
        <FormItem
          name={FORM_ITEMS_NAME.REGISTRATION_DATE}
          label={'organization_form_label.Registration_date'}
          rules={[rule]}
        >
          <DatePicker
            placeholder={t('organization_form_placeholder.Registration_date')}
            suffixIcon={<i className='icon-calendar-2' />}
            disableFuture={true}
          />
        </FormItem>
        <FormItem.InputField
          name={FORM_ITEMS_NAME.ECONOMY_CODE}
          label={'organization_form_label.economy_code'}
          rules={[rule]}
          placeholder={'organization_form_placeholder.economy_code'}
          maxLength={FORM_INPUT_VALIDATION.MAX_ECONOMY_CODE_NUMBER_LENGTH}
          allow='number'
        />
        <FormItem.InputField
          name={FORM_ITEMS_NAME.ACTIVITY_FIELD}
          label={'organization_form_label.activity_field'}
          rules={[rule]}
          placeholder={'organization_form_placeholder.activity_field'}
          maxLength={FORM_INPUT_VALIDATION.INPUT_MAX_LENGTH}
        />
        <FormItem.InputField
          name={FORM_ITEMS_NAME.ZIP_CODE}
          label={'organization_form_label.zip_code'}
          rules={[rule]}
          placeholder={'organization_form_placeholder.zip_code'}
          maxLength={FORM_INPUT_VALIDATION.MAX_POSTAL_CODE_NUMBER_LENGTH}
          allow='number'
        />
        <FormItem.InputField
          name={FORM_ITEMS_NAME.TELEPHONE}
          label={'organization_form_label.telephone'}
          rules={[rule]}
          placeholder={'organization_form_placeholder.telephone'}
          maxLength={FORM_INPUT_VALIDATION.MAX_MOBILE_NUMBER_LENGTH}
          allow='number'
        />
        <FormItem.InputField
          name={FORM_ITEMS_NAME.LAST_REGISTERED_ADDRESS}
          rules={[rule]}
          label={'organization_form_label.last_registered_address'}
          maxLength={FORM_INPUT_VALIDATION.MAX_LAST_REGISTRATION_ADDRESS_LENGTH}
          placeholder={'organization_form_placeholder.last_registered_address'}
          className='full-width '
        />
      </SearchItemsContainer>
    </FormSection>
  );
};
