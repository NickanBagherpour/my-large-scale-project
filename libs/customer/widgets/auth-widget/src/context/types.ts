import * as React from 'react';
import { FormFieldsType } from '../types';
import { MessageType, Nullable } from '@oxygen/types';

export type FiltersType = FormFieldsType;

export type PaginationType = {
  page: number;
  limit: number;
};

export type OTPType = {
  isOpen: boolean;
  type: Nullable<'login' | 'register'>;
  ip: Nullable<string>;
  mobileNumber: Nullable<string>;
  nationalCode?: Nullable<string>;
  key?: Nullable<string>;
};

export type WidgetStateType = {
  OTP: OTPType;
  message: Nullable<MessageType>;
};

export type WidgetActionType =
  | {
      type: 'UPDATE_OTP';
      payload: Nullable<OTPType>;
    }
  | {
      type: 'UPDATE_GLOBAL_MESSAGE';
      payload: Nullable<MessageType>;
    }
  | {
      type: 'UPDATE_SUBMIT';
      payload: Partial<FiltersType>;
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
