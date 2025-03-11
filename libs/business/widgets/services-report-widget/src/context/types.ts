import * as React from 'react';

import { MessageType, Nullable } from '@oxygen/types';

import { SORT_ORDER } from '../utils/consts';

export type PaginationType = {
  page: number;
  rowsPerPage: number;
};

export type WidgetStateType = {
  searchTerm: string;
  sort: SORT_ORDER;
  isActive: Nullable<boolean>;
  pagination: PaginationType;
  modalTablePagination: PaginationType;
  message: Nullable<MessageType>;
};

export type WidgetActionType =
  | {
      type: 'UPDATE_GLOBAL_MESSAGE';
      payload: Nullable<MessageType>;
    }
  | {
      type: 'UPDATE_PAGINATION';
      payload: Partial<PaginationType>;
    }
  | {
      type: 'UPDATE_STATUS';
      payload: WidgetStateType['isActive'];
    }
  | {
      type: 'UPDATE_SEARCH_TERM';
      payload: WidgetStateType['searchTerm'];
    }
  | {
      type: 'UPDATE_SORT';
      payload: WidgetStateType['sort'];
    }
  | {
      type: 'UPDATE_MODAL_TABLE_PAGINATION';
      payload: Partial<PaginationType>;
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
