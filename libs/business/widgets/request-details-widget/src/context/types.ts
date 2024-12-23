import * as React from 'react';
import { FormFieldsType, RequestId } from '../types';
import { MessageType, Nullable } from '@oxygen/types';

export type FiltersType = FormFieldsType;

export type SimpleFilters = Pick<FormFieldsType, 'code' | 'branchCode'>;

export type PaginationType = {
  page: number;
  rowsPerPage: number;
};

export type WidgetStateType = {
  table: {
    pagination: PaginationType;
  };
  message: Nullable<MessageType>;
  requestId: RequestId;
  userRole: Nullable<string>;
};

export type WidgetActionType =
  | {
      type: 'UPDATE_GLOBAL_MESSAGE';
      payload: Nullable<MessageType>;
    }
  | {
      type: 'UPDATE_FILTERS';
      payload: Partial<FiltersType>;
    }
  | {
      type: 'UPDATE_SUBMIT';
      payload: Partial<FiltersType>;
    }
  | {
      type: 'UPDATE_PAGINATION';
      payload: Partial<PaginationType>;
    }
  | {
      type: 'UPDATE_REQUEST_ID';
      payload: RequestId;
    }
  | {
      type: 'UPDATE_USER_ROLE';
      payload: Nullable<string>;
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
