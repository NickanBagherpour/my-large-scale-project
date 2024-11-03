import styled from 'styled-components';
import { Upload } from 'antd';
import { Button, Progress as KitProgress } from '@oxygen/ui-kit';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

export const Dragger = styled(Upload.Dragger)`
  margin-bottom: 2.4rem;
  display: block;

  & div.ant-upload {
    border: 1px dashed ${(p) => p.theme.primary._400};
  }
`;

export const UploadIcon = styled.i`
  font-size: 3rem;
  display: block;
  margin-bottom: 2.4rem;
`;

export const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 400;
  margin: 0 0 1.4rem;
`;

export const Subtitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 400;
  color: ${(p) => p.theme.text.quaternary};
  margin: 0 0 2.4rem;
`;

export const PlusIcon = styled.i`
  font-size: 1.8rem;
`;

export const Status = styled.div<{ hasError: boolean }>`
  padding: 2.8rem 3.8rem;
  border: ${(p) => `1px solid ${p.hasError ? p.theme.error.main : p.theme.border._100}`};
  border-radius: 1.6rem;
`;

export const PdfIcon = styled.i`
  color: ${(p) => p.theme.error.main};
  margin-inline-end: 0.9rem;
  font-size: 2.5rem;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
`;

export const Name = styled.p`
  color: ${(p) => p.theme.text.primary};
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0;
`;

export const Extesion = styled.span`
  font-size: 1.2rem;
  margin-inline-end: 1.6rem;
`;

export const Size = styled.span`
  color: ${(p) => p.theme.border.main};
  font-size: 1.4rem;
  margin-inline-end: auto;
`;

export const Progress = styled(KitProgress)`
  margin-top: 1.7rem;
`;

export const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  color: ${(p) => p.theme.text.quaternary};
`;

export const ActionBtn = styled(Button)<{ hasError: boolean }>`
  & i {
    font-size: 2.4rem;
    color: ${(p) => (p.hasError ? p.theme.error.main : p.theme.text.quaternary)};
  }
`;

export const ErrMsg = styled.span`
  color: ${(p) => p.theme.error.main};
  font-size: 1.2rem;
`;
