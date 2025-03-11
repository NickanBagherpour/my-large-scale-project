import * as React from 'react';
import { MessageType, Nullable } from '@oxygen/types';

export type FiltersType = any;

export type SimpleFilters = Pick<any, 'code' | 'branchCode'>;

export type PaginationType = {
  page: number;
  rowsPerPage: number;
};

export type WidgetStateType = {
  filters: any;
  searchTerm: any;
  sort: 'ascending' | 'descending';
  status: boolean | null;
  page: number;
  table: {
    filters: FiltersType;
    pagination: PaginationType;
    submit: FiltersType;
  };
  message: Nullable<MessageType>;
};

export type WidgetActionType =
  | {
      type: 'UPDATE_GLOBAL_MESSAGE';
      payload: Nullable<MessageType>;
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
      type: 'UPDATE_STATUS';
      payload: WidgetStateType['status'];
    }
  | {
      type: 'UPDATE_PAGINATION';
      payload: PaginationType;
    }
  | {
      type: 'RESET_FILTERS';
      payload: WidgetStateType['searchTerm'];
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
