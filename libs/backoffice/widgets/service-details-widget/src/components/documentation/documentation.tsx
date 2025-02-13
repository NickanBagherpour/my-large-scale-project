import React from 'react';
import * as S from './documentation.style';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { useAppDispatch, useAppState } from '../../context';
import { Button, Dragger, Uploader } from '@oxygen/ui-kit';
import { ROUTES } from '@oxygen/utils';

type DocumentationType = PageProps;
export const Documentation = (props) => {
  const [t] = useTr();
  const state = useAppState();
  const dispatch = useAppDispatch();

  return (
    <S.DocumentationContainer>
      <S.Header>
        <S.Paragraph>{t('service_documentation')}</S.Paragraph>
        <Button
          variant='filled'
          icon={<S.Icon className='icon-clock' />}
          href={`${ROUTES.BACKOFFICE.UPSTREAM_HISTORY}?upstream-name=`}
        >
          {t('see_changes_history')}
        </Button>
      </S.Header>
      <S.Card>
        <S.Dragger>
          <S.DraggerConatainer>
            <S.UploadIcon className='icon-upload' />
            <S.UploaderTxt>
              <S.DraggerTitle>{t('upload_title')}</S.DraggerTitle>
              <S.DraggerSubtitle>{t('upload_description')}</S.DraggerSubtitle>
            </S.UploaderTxt>
            <div>
              <Button style={{ width: 'max-content' }} color='secondary'>
                <i className='icon-plus' />
                {t('add_documentation')}
              </Button>
            </div>
          </S.DraggerConatainer>
        </S.Dragger>
      </S.Card>
    </S.DocumentationContainer>
  );
};
// import { Form, type FormProps } from 'antd';
// import { Box, Button } from '@oxygen/ui-kit';
// import { useTr } from '@oxygen/translation';
// import * as S from './documentation.style';
// import { useState } from 'react';
// import { UploadFile } from 'antd/lib';
// // import { createUploadDocsSchema, UploadDocsType } from '../../types/upload-docs.schema';
// import { createSchemaFieldRule } from 'antd-zod';
// import { fileSize } from '@oxygen/utils';
// // import FormItem from '../form-item/form-item';
// import { isExcel } from '../../utils/schema.utils';
// import { UPLOAD_NAMES } from '../../utils/consts';
// import { useAppDispatch } from '../../context';

// const data = {
//   progress: '52%',
//   uploadRate: '213kb/sec',
// };

// function getFileDetails(file: UploadFile | null): null | { name: string; extension: string; size: number } {
//   if (!file) return null;
//   const nameArr = file.name.split('.');
//   const extension = nameArr.at(-1);
//   const fileName = nameArr.slice(0, nameArr.length - 1).join('.');
//   return {
//     name: fileName,
//     extension: extension!,
//     size: file.size!,
//   };
// }

// export const Documentation = () => {
//   const [form] = Form.useForm();
//   const [t] = useTr();
//   const [selectedFile, setSelectedFile] = useState<UploadFile | null>(null);
//   const isFetching = false;
//   const hasError = false;
//   const fileDetails = getFileDetails(selectedFile);
//   const dispatch = useAppDispatch();

//   const onFinish = (values) => {
//     console.log('finish');
//     // updateUploadDocs(dispatch, values);
//   };

//   return (
//     <S.Form onFinish={onFinish} form={form}>
//       <Box>
//         <Form.Item name={UPLOAD_NAMES.file}>
//           <S.Dragger
//             multiple={false}
//             fileList={selectedFile ? [selectedFile] : []}
//             onChange={({ file }) => setSelectedFile(file)}
//             customRequest={() => null}
//             itemRender={() => null}
//             disabled={isFetching}
//           >
//             <S.UploadIcon className='icon-upload' />
//             <S.Title>{t('choose_or_drag_file')}</S.Title>
//             <S.Subtitle>{t('file_format_xls')}</S.Subtitle>
//             <Button color='secondary' disabled={isFetching}>
//               <S.PlusIcon className='icon-plus' />
//               {t('add_docs')}
//             </Button>
//           </S.Dragger>
//         </Form.Item>

//         {!!fileDetails && selectedFile && (
//           <S.Status hasError={hasError}>
//             <S.Header>
//               <S.Group>
//                 {isExcel({ file: selectedFile }) && <S.ExcelIcon className='icon-excel' />}
//                 <S.Name>{fileDetails.name}</S.Name>
//                 <S.Extesion>{fileDetails.extension}</S.Extesion>
//                 <S.Size>{fileSize(fileDetails.size)}</S.Size>
//               </S.Group>

//               <S.Group>
//                 {hasError && <S.ErrMsg>{t('upload_error')}</S.ErrMsg>}
//                 {isFetching ? (
//                   <S.ActionBtn variant='link' hasError={false}>
//                     <i className='icon-close-circle' />
//                   </S.ActionBtn>
//                 ) : (
//                   <S.ActionBtn variant='link' hasError={hasError} onClick={() => setSelectedFile(null)}>
//                     <i className='icon-trash' />
//                   </S.ActionBtn>
//                 )}
//               </S.Group>
//             </S.Header>

//             {isFetching && (
//               <>
//                 <S.Progress percent={50} showInfo={false} isPrimary />
//                 <S.ProgressInfo>
//                   <span>{data.progress}</span>
//                   <span>{data.uploadRate}</span>
//                 </S.ProgressInfo>
//               </>
//             )}
//           </S.Status>
//         )}
//       </Box>
//     </S.Form>
//   );
// };
