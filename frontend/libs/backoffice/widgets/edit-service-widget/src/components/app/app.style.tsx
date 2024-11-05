import styled from 'styled-components';
import { Container } from '@oxygen/ui-kit';

export const AppContainer = styled(Container)`
  // background-color: pink;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
`;
export const LoadingContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
export const FooterContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 0.1rem;
  & .ant-btn {
    min-width: 12rem;
    margin: 0 1rem 3rem 0;
  }
`;
export const SubtitleContainer = styled.div`
  margin: 3rem 0;
  font-weight: bold;
  font-size: 1.6rem;
  color: ${(props) => props.theme.text.primary};
`;
export const ContentContainer = styled.div`
  flex-grow: 1;
`;
