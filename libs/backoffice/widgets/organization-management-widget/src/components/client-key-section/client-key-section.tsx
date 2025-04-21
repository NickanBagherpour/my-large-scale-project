import React from 'react';
import { FormSection } from '../form-section-title/form-section';
import { FormItem } from '../form-item/form-item';
import { Alert, DatePicker, SearchItemsContainer, Select } from '@oxygen/ui-kit';
import { FORM_INPUT_VALIDATION, FORM_ITEMS_NAME } from '../../utils/consts';
import { useTr } from '@oxygen/translation';
import styled from 'styled-components';

export const AlertContainer = styled(Alert)`
  padding: 1.2rem 1.6rem;
  margin-bottom: 2.4rem;
  border: 0;

  .ant-alert-message {
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2.2rem;
  }

  .ant-alert-description {
    color: ${(p) => p.theme.primary._500};
  }
`;

export const ClientKeySection = (props) => {
  const { rule } = props;
  const [t] = useTr();
  return (
    <FormSection title={'client_key'}>
      <AlertContainer description={t('client_key_note')} />
      <SearchItemsContainer $columnNumber='2'>
        <FormItem.InputField
          name={FORM_ITEMS_NAME.CLIENT_KEY.CLIENT_KEY}
          label='ClientKey'
          rules={[rule]}
          placeholder={t('clientKey')}
          maxLength={FORM_INPUT_VALIDATION.INPUT_MAX_LENGTH}
        />
      </SearchItemsContainer>
    </FormSection>
  );
};
