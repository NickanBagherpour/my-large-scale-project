import React from 'react';
import { UploadProps } from 'antd';

import { ROUTES } from '@oxygen/utils';
import { Button } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';
import { useTr } from '@oxygen/translation';

import { useAppDispatch, useAppState } from '../../context';

import * as S from './documentation.style';
import { useApp } from '@oxygen/hooks';
import { isFileInValid } from '../../utils/helper';

type DocumentationType = PageProps & {
  //
};
export const Documentation: React.FC<DocumentationType> = (props) => {
  const [t] = useTr();
  const state = useAppState();
  const dispatch = useAppDispatch();
  const { notification } = useApp();

  const handleFileUpload = async (options) => {
    const { onSuccess, onError, file } = options;
    console.log(options);

    if (isFileInValid(file, notification, t)) {
      return onError('');
    }
    onSuccess(true);
  };

  const draggerProps: UploadProps = {
    name: 'file',
    multiple: true,
    listType: 'picture',
    accept: '.pdf,.xlsx,.xls',
    customRequest: handleFileUpload,
    onRemove: (file) => {
      console.log(file);
    },
    // onChange(info) {
    //   const { status } = info.file;
    //   if (status !== 'uploading') {
    //     console.log(info.file, info.fileList);
    //   }
    //   if (status === 'done') {
    //     console.log(info.file, info.fileList);
    //   } else if (status === 'error') {
    //     console.log(info.file, info.fileList);
    //   }
    // },
  };

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
    </S.DocumentationContainer>
  );
};
