import styled from 'styled-components';
import { Button, Modal } from '@oxygen/ui-kit';

export const ConfirmButton = styled(Button)`
  margin-inline-start: 2rem;
`;
export const ConfirmModal  = styled(Modal)`
& .ant-btn{
    min-width: 8rem;
}
`