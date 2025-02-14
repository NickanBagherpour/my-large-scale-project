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
  ${respondTo.down('sm')} {
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
  *::before,
  *::after {
    content: none;
  }
  .ant-upload-list-item {
    margin: 0;
    background-color: ${(p) => p.theme.background.main};
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

// import styled from 'styled-components';
// import { Form as AntForm, Upload } from 'antd';
// import { Button, Progress as KitProgress } from '@oxygen/ui-kit';
// import { respondTo } from '@oxygen/utils';

// export const Form = styled(AntForm)`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   flex: 1;
// ` as typeof AntForm;

// export const Dragger = styled(Upload.Dragger)`
//   display: block;

//   & div.ant-upload {
//     border: 1px dashed ${(p) => p.theme.primary._400};
//   }

//   .ant-form-item-has-error:has(&) div.ant-upload {
//     border: 1px dashed ${(p) => p.theme.error.main};
//   }
// `;

// export const UploadIcon = styled.i`
//   font-size: 3rem;
//   display: block;
//   margin-bottom: 2.4rem;
// `;

// export const Title = styled.h2`
//   font-size: 1.6rem;
//   font-weight: 400;
//   margin: 0 0 1.4rem;
// `;

// export const Subtitle = styled.h2`
//   font-size: 1.2rem;
//   font-weight: 400;
//   color: ${(p) => p.theme.text.quaternary};
//   margin: 0 0 2.4rem;
// `;

// export const PlusIcon = styled.i`
//   font-size: 1.8rem;
// `;

// export const Status = styled.div<{ hasError: boolean }>`
//   padding: 2.8rem 3.8rem;
//   border: ${(p) => `1px solid ${p.hasError ? p.theme.error.main : p.theme.border._100}`};
//   border-radius: 1.6rem;
//   margin-top: 2.4rem;

//   ${respondTo.down('xs')} {
//     padding: 1rem 2rem;
//   }
// `;

// export const ExcelIcon = styled.i`
//   color: ${(p) => p.theme.secondary.main};
//   margin-inline-end: 0.9rem;
//   font-size: 2.5rem;
// `;

// export const Header = styled.header`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;

//   ${respondTo.down('lg')} {
//     flex-direction: column-reverse;
//     gap: 1.5rem;
//   }
// `;

// export const Group = styled.div`
//   display: flex;
//   align-items: center;

//   ${respondTo.down('lg')} {
//     width: 100%;
//   }
// `;

// export const Name = styled.p`
//   color: ${(p) => p.theme.text.primary};
//   font-size: 1.4rem;
//   font-weight: 700;
//   margin-inline-end: 0.3rem;
//   margin-block: 0;
//   max-width: 25rem;
//   text-overflow: ellipsis;
//   overflow: hidden;
//   white-space: nowrap;

//   ${respondTo.down('xs')} {
//     max-width: 10rem;
//   }
// `;

// export const Extesion = styled.span`
//   font-size: 1.2rem;
//   margin-inline-end: 1.6rem;
// `;

// export const Size = styled.span`
//   color: ${(p) => p.theme.border.main};
//   font-size: 1.4rem;
//   ${respondTo.down('lg')} {
//     margin-inline-start: auto;
//   }
// `;

// export const Progress = styled(KitProgress)`
//   margin-top: 1.7rem;
// `;

// export const ProgressInfo = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   font-size: 1.2rem;
//   color: ${(p) => p.theme.text.quaternary};
// `;

// export const ActionBtn = styled(Button)<{ hasError: boolean }>`
//   margin-inline-end: -1.6rem;
//   & i {
//     font-size: 2.4rem;
//     color: ${(p) => (p.hasError ? p.theme.error.main : p.theme.text.quaternary)};
//   }
//   ${respondTo.down('lg')} {
//     margin-inline-start: auto;
//   }
// `;

// export const ErrMsg = styled.span`
//   color: ${(p) => p.theme.error.main};
//   font-size: 1.2rem;
// `;
