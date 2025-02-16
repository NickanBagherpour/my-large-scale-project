import styled from 'styled-components';
import { Typography, Tag as UikitTag } from '@oxygen/ui-kit';

export const Tag = styled(UikitTag)`
  display: inline-flex;
`;

export const Text = styled(Typography.Text)`
  unicode-bidi: plaintext;
  button {
    margin: 0 1rem;
  }
`;
