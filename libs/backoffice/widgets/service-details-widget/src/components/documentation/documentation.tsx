import React, { useState } from 'react';
import { UploadProps } from 'antd';

import { useApp } from '@oxygen/hooks';
import { ROUTES, RQKEYS } from '@oxygen/utils';
import { Button, Loading } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { queryClient } from '@oxygen/client';
import { CenteredLoading, ConfirmRemoveModal } from '@oxygen/reusable-components';

import { isFileInvalid } from '../../utils/helper';
import { useAppDispatch, useAppState } from '../../context';
import {
  useDeleteRemoveUploadedFileQuery,
  useGetDocumentListQuery,
  useGetDownloadUploadedFileQuery,
  usePostUploadDocumentMutation,
} from '../../services/documentation-tab';

import * as S from './documentation.style';

type DocumentationType = PageProps & {
  //
};

const { DOCUMENTATION_TAB_DOCUMENT_LIST } = RQKEYS.BACKOFFICE.SERVICE_DETAILS;

export const Documentation: React.FC<DocumentationType> = (props) => {
  const [t] = useTr();
  const state = useAppState();
  const dispatch = useAppDispatch();
  const { notification } = useApp();
  //STATE
  const [fileInfo, setFileInfo] = useState({});
  const [documentToRemove, setDocumentToRemove] = useState<any>(null);
  // CONSTANTS
  const serviceName = state.serviceName!;
  //MUTATIONS
  const { mutate } = usePostUploadDocumentMutation();
  const { mutate: removeMutate, isPending } = useDeleteRemoveUploadedFileQuery();
  //QUERIES
  const {
    data: documentListData,
    isFetching: documentListIsFetching,
    isPending: documentListIsPending,
  } = useGetDocumentListQuery(serviceName);

  const { refetch: downloadRefetch } = useGetDownloadUploadedFileQuery({ serviceName, ...fileInfo });
  const handleFileUpload = async (options) => {
    const { onSuccess: uploaderOnSuccess, onError: uploaderOnError, onProgress: uploaderOnProgress, file } = options;

    const { name } = file;

    if (isFileInvalid(file, notification, t)) {
      return uploaderOnError('');
    }

    mutate(
      { file, serviceName },
      {
        onSuccess: (data) => {
          uploaderOnSuccess(true);
        },
        onError: (error) => {
          return uploaderOnError('');
        },
      }
    );
  };
  const handleFileDownload = async (file) => {
    const fileExtension = file.name.split('.').pop();
    let fileType;
    switch (fileExtension) {
      case 'pdf':
        fileType = 'application/pdf';
        break;
      case 'doc':
        fileType = 'application/msword';
        break;
      case 'docx':
        fileType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
      default:
        fileType = 'unknown'; // Handle unknown file types
        break;
    }
    await setFileInfo({
      serviceDocumentId: file.serviceDocumentId,
      fileExtension: fileExtension,
      fileType: fileType,
      fileName: file.name,
    });
    downloadRefetch();
  };

  const handleRemove = async (file: any) => {
    const serviceDocumentId = file.serviceDocumentId;
    removeMutate(
      { serviceDocumentId, serviceName },
      {
        onError() {
          queryClient.invalidateQueries({
            queryKey: [DOCUMENTATION_TAB_DOCUMENT_LIST],
          });
        },
        async onSuccess() {
          setDocumentToRemove(null);
          await queryClient.invalidateQueries({
            queryKey: [DOCUMENTATION_TAB_DOCUMENT_LIST],
          });
          notification.success({ message: t('document_was_removed_successfuly') });
        },
      }
    );
  };

  const draggerProps: UploadProps = {
    name: 'file',
    multiple: true,
    listType: 'picture',
    accept: '.pdf,.docx,.doc',
    fileList: documentListData,
    customRequest: handleFileUpload,
    onRemove: (file) => {
      setDocumentToRemove(file);
    },
    onDownload: handleFileDownload,
    iconRender: (file) => {
      if (!file?.name) return null; // Prevents errors if file or name is undefined

      const fileType = file.name.split('.').pop()?.toLowerCase() || '';

      // File type mapping to icons
      const fileTypeIcons = {
        pdf: 'icon-pdf',
        doc: 'icon-doc',
        docx: 'icon-docx',
      };

      // Get the corresponding class, or use a default icon
      const iconClass = fileTypeIcons[fileType] || 'icon-default';

      return <S.FileTypeIcon className={iconClass} />;
    },
    showUploadList: {
      removeIcon: <S.TrashIcon className='icon-trash' />,
      showDownloadIcon: true,
      // downloadIcon: <i className='icon-three-dots-vertical' onClick={(p) => console.log(p)} />,
      extra: ({ size = 0 }) => size !== 0 && <S.FileSize>{(size / 1024 / 1024).toFixed(2)}MB</S.FileSize>,
    },
  };

  if (documentListIsPending) return <CenteredLoading />;

  return (
    <>
      <S.DocumentationContainer>
        <Loading spinning={documentListIsFetching}>
          <S.Header>
            <S.Paragraph>{t('service_documentation')}</S.Paragraph>
            <Button
              variant='filled'
              icon={<S.Icon className='icon-clock' />}
              href={`${ROUTES.BACKOFFICE.SERVICE_DOCUMENT_HISTORY}?service-name=${serviceName}`}
            >
              {t('see_changes_history')}
            </Button>
          </S.Header>
          <S.Card>
            <S.Dragger {...draggerProps}>
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
        </Loading>
      </S.DocumentationContainer>
      {!!documentToRemove && (
        <ConfirmRemoveModal
          title={t('remove_document')}
          close={() => setDocumentToRemove(null)}
          isOpen={true}
          message={t('are_you_sure_to_remove_doc', { name: documentToRemove.name })}
          onRemove={() => handleRemove(documentToRemove)}
          isLoading={isPending}
          wordToHighlight={documentToRemove.name}
        />
      )}
    </>
  );
};
