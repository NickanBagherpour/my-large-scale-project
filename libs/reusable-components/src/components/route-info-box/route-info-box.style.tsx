import styled from 'styled-components';
import { Typography, Tag as UikitTag } from '@oxygen/ui-kit';
import { withOpacity } from '@oxygen/utils';

export const Tag = styled(UikitTag)`
  display: inline-flex;
  background-color: ${(p) => withOpacity(p.theme.secondary._200, 50)};
  color: ${(p) => p.theme.success.main};
  border: transparent;
  margin: 1rem 1rem 1rem 0;
  border-radius: 2.4rem !important;
  padding: 0.3rem 1rem !important;
` as typeof UikitTag;

export const Text = styled(Typography.Text)`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  color: ${(p) => p.theme.text.secondary};
  gap: 0.8rem;
  unicode-bidi: plaintext;
` as typeof Typography.Text;

export const Icon = styled.i`
  font-size: 1.5rem;
  color: ${(p) => p.theme.secondary._400};
`;
