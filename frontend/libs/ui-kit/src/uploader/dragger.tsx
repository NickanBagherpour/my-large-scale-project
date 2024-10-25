'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Upload, UploadProps as AntUploadProps } from 'antd';
import { useTr } from '@oxygen/translation';

export type DraggerProps = AntUploadProps & {
  children?: React.ReactNode;
  displayDefaultChildren?: boolean;
  title?: string;
  description?: string;
};

const StyledDragger = styled(Upload.Dragger)`
  .ant-upload-drag-container {
    display: flex !important;
    flex-direction: column;
  }

  .ant-upload {
    border-radius: 1rem;
    background-color: ${(p) => p.theme.background.main};
  }

  .ant-upload-drag-hover {
    //background-color: chartreuse !important ;
  }

  .dragger-container {
    display: flex;
    padding: 0 1.6rem;
    align-items: center;

    i {
      font-size: 3.6rem;
      color: ${(p) => p.theme.primary.main};
    }

    .dragger-container__text {
      display: flex;
      flex-direction: column;
      padding: 0 1rem;
      text-align: start;

      .dragger-container__text__title {
        font-size: 1.4rem;
        font-weight: 500;
        color: ${(p) => p.theme.text.primary};
      }

      .dragger-container__text__desc {
        font-size: 1.2rem;
        font-weight: normal;
        color: ${(p) => p.theme.text.secondary};
        margin-top: 0.4rem;
      }
    }
  }
`;

export const Dragger = (props: DraggerProps) => {
  const { children, displayDefaultChildren = false, title, description, ...rest } = props;
  const [t] = useTr();

  const defaultChildren = (
    <div className={'dragger-container'}>
      <i className='ri-file-upload-line' />
      <div className='dragger-container__text'>
        <span className={'dragger-container__text__title'}>{title ?? t('uikit.dragger_title')}</span>
        <span className={'dragger-container__text__desc'}>{description ?? t('uikit.dragger_desc')}</span>
      </div>
    </div>
  );

  return (
    <StyledDragger
      {...rest}
      // onDragEnter={handleDragEnter}
      // onDragLeave={handleDragLeave}

      // onDrop={handleDrop}
      // className={isDragging ? 'dragging' : ''}
    >
      {displayDefaultChildren && defaultChildren}
      {children}
    </StyledDragger>
  );
};
