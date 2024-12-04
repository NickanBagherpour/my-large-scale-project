import { Form } from 'antd';
import styled from 'styled-components';
import { ContentType } from './inspect-service';
import { Divider } from '@oxygen/ui-kit';

export const FormRow = styled.div`
  display: flex;
  gap: 1rem;
`;
export const FormItem = styled(Form.Item)`
  flex-basis: 100%;
`;
export const MainContainer = styled.div<{ $content: ContentType }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.6rem;
  background-color: ${(p) => (p.$content === 'searching' ? p.theme.background._100 : p.theme.info._50)};
  width: 100%;
  height: 100%;
  height: 25rem;
`;
export const TitleContainer = styled.div`
  color: ${(p) => p.theme.error.main};
  align-items: center;
  display: flex;
  gap: 1rem;
  width: fit-content;
`;
export const Partition = styled.div`
  display: flex;
  gap: 3rem;
  flex-basis: 50%;
  width: max-content;
`;
export const TextContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
export const InfoTitle = styled.div`
  font-weight: 600;
`;
export const StyledDivider = styled(Divider)`
  height: 70px;
  border-color: ${(p) => p.theme.border._300};
`;
