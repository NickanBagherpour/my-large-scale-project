import { Modal as UiKitModal } from '@oxygen/ui-kit';
import { Form } from 'antd';
import styled from 'styled-components';

export const Modal = styled(UiKitModal)`
  & .ant-modal-footer {
    margin: 1rem 0 2rem;
  }

  & .ant-modal-footer button {
    width: 100%;
  }
`;

// Ensure consistent alignment of the label and input field in the "middle" size of UI-kit input.
// The fixed height guarantees that the label and input maintain consistent vertical alignment,
// regardless of whether there is an error or not, by setting a minimum height for both.
const INPUT_HEIGHT = '40px';

export const FormItem = styled(Form.Item)`
  margin-bottom: 3rem;

  & .ant-col:has(label) {
    flex: 3;

    & label {
      width: 100%;
      min-height: ${INPUT_HEIGHT};
      font-size: 1.4rem;
      color: ${(p) => p.theme.text.quaternary};
    }
  }

  & .ant-form-item-control-input {
    min-height: ${INPUT_HEIGHT};
  }

  & .ant-col {
    flex: 7;
    padding: 0;
  }
`;
