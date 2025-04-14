import * as React from 'react';
import { MessageType, Nullable } from '@oxygen/types';

export type ClientType = 'all' | 'aggregator' | 'client';
export type Sort = 'newest' | 'oldest';
export type SearchTerm = string;

export type WidgetStateType = {
  clientType: ClientType;
  sort: Sort;
  searchTerm: string;
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
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
