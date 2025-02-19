import React, { useEffect, useState } from 'react';
import { UploadProps } from 'antd';
import { ROUTES } from '@oxygen/utils';
import { useApp } from '@oxygen/hooks';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';
import { Box, Button } from '@oxygen/ui-kit';
import { isFileInvalid } from '../../utils/helper';
import { useAppDispatch, useAppState } from '../../context';
import { useGetDocumentListQuery, usePostUploadDocumentMutation } from '../../services/documentation-tab';
import * as S from './documentation.style';
import { CenteredLoading } from '@oxygen/reusable-components';

type DocumentationType = PageProps & {
  //
};
export const Documentation: React.FC<DocumentationType> = (props) => {
  const [t] = useTr();
  const state = useAppState();
  const dispatch = useAppDispatch();
  const { notification } = useApp();

  const serviceName = state.serviceName!;

  const { data: documentListData, isFetching: documentListIsFetching } = useGetDocumentListQuery(serviceName);
  const { mutate, isPending } = usePostUploadDocumentMutation();

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

  const draggerProps: UploadProps = {
    name: 'file',
    multiple: true,
    listType: 'picture',
    accept: '.pdf,.docx,.doc',
    defaultFileList: documentListData,
    customRequest: handleFileUpload,
    onRemove: (file) => {},
    iconRender: () => <S.PDFIcon className='icon-pdf' />,
    showUploadList: {
      removeIcon: <S.TrashIcon className='icon-trash' />,
      showDownloadIcon: true,
      extra: ({ size = 0 }) => size !== 0 && <S.FileSize>{(size / 1024 / 1024).toFixed(2)}MB</S.FileSize>,
    },
  };

  return (
    <S.DocumentationContainer>
      {documentListIsFetching || !documentListData ? (
        <CenteredLoading />
      ) : (
        <>
          <S.Header>
            <S.Paragraph>{t('service_documentation')}</S.Paragraph>
            <Button
              variant='filled'
              icon={<S.Icon className='icon-clock' />}
              href={`${ROUTES.BACKOFFICE.SERVICE_HISTORY}?service-name=${serviceName}`}
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
        </>
      )}
    </S.DocumentationContainer>
  );
};
