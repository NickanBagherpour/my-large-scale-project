import * as React from 'react';
import { MessageType, Nullable } from '@oxygen/types';

export type ClientType = 'all' | 'aggregator' | 'client';
export type Sort = 'newest' | 'oldest';
export type SearchTerm = string;

export type WidgetStateType = {
  clientType: ClientType;
  sort: Sort;
  searchTerm: string;
  month: number;
  year: number;
  page: number;
  size: number;
  message: Nullable<MessageType>;
};

export type WidgetActionType =
  | {
      type: 'UPDATE_GLOBAL_MESSAGE';
      payload: Nullable<MessageType>;
    }
  | {
      type: 'UPDATE_CLIENT_TYPE';
      payload: ClientType;
    }
  | {
      type: 'UPDATE_SORT';
      payload: Sort;
    }
  | {
      type: 'UPDATE_SEARCH_TERM';
      payload: SearchTerm;
    }
  | {
      type: 'UPDATE_MONTH_FILTER';
      payload: string;
    }
  | {
      type: 'UPDATE_YEAR_FILTER';
      payload: string;
    }
  | {
      type: 'UPDATE_PAGINATION';
      payload: Pick<WidgetStateType, 'page' | 'size'>;
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
