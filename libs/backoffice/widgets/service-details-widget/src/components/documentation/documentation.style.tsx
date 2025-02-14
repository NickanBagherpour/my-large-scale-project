import { Dragger as KitDragger } from '@oxygen/ui-kit';
import { cssVar, respondTo } from '@oxygen/utils';
import styled from 'styled-components';
export const DocumentationContainer = styled.div``;
export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Paragraph = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.5rem;
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0.8rem;
  margin-bottom: 0.8rem;
  align-items: center;
  ${respondTo.down('md')} {
    flex-direction: column;
    align-items: start;
    Button {
      width: 100%;
    }
  }
`;
export const Icon = styled.i`
  font-size: 1.8rem;
`;
export const Dragger = styled(KitDragger)`
  & .ant-upload {
    padding: 0;
  }
  .ant-upload.ant-upload-drag {
    padding: 2.4rem;
    border: 1px dashed ${(p) => p.theme.primary._400};
    border-radius: var(${cssVar.radiusLg});
  }
  .ant-upload-list.ant-upload-list-picture {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  .ant-upload-list.ant-upload-list-picture::before,
  .ant-upload-list.ant-upload-list-picture::before {
    content: none;
  }
  .ant-upload-list-item {
    margin: 0;
    background-color: ${(p) => p.theme.background.main};
    text-overflow: ellipsis;
  }

  .ant-upload-list-item-name {
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 2.2rem;
    text-overflow: ellipsis;
    max-width: inherit;
    display: flex;
    gap: 1rem;
  }
  .ant-upload-list-item-container {
    overflow: hidden;
  }

  ${respondTo.down('sm')} {
    .ant-upload-list.ant-upload-list-picture {
      grid-template-columns: 1fr;
    }
  }
`;
export const UploadIcon = styled.i`
  color: ${(p) => p.theme.text.quaternary};
  font-size: 2.5rem;
`;
export const Card = styled.div`
  border: 1px solid ${(p) => p.theme.border._100};
  border-radius: var(${cssVar.radiusLg});
  background-color: ${(p) => p.theme.cardColor};
  padding: 2.4rem;
`;
export const DraggerConatainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  justify-content: space-between;
`;
export const UploaderTxt = styled.div``;
export const DraggerTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 400;
  margin: 0 0 1.4rem;
`;
export const DraggerSubtitle = styled.span`
  font-size: 1.2rem;
  font-weight: 400;
  color: ${(p) => p.theme.text.quaternary};
`;
export const TrashIcon = styled.i`
  color: ${(p) => p.theme.text.quaternary};
  font-size: 2rem;
`;
export const ExcelIcon = styled.i`
  color: ${(p) => p.theme.error.main};
  font-size: 2.5rem;
`;
export const FileSize = styled.span`
  color: ${(p) => p.theme.border.main};
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2.2rem;
`;
