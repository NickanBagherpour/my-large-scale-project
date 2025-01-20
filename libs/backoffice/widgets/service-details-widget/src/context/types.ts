import * as React from 'react';
// import { FormFieldsType } from '../types';
import { MessageType, Nullable } from '@oxygen/types';
export type FiltersType = FormFieldsType;
export type ScopeMode = 'importFromSso' | 'createScope';
export type FormFieldsType = {
  name: Nullable<MessageType>;
};

export type PaginationType = {
  page: number;
  rowsPerPage: number;
};
export type initialActiveSelectType = {
  isInitialized: boolean;
  id: Nullable<number | string>;
  cardId: Nullable<number | string>;
};

export type WidgetStateType = {
  serviceName: Nullable<string>;
  scopeName: Nullable<string>;
  upstreamTab: {
    activeSelect: initialActiveSelectType;
  };
  scopeTab: {
    activeSelect: initialActiveSelectType;
  };
  table: {
    filters: FiltersType;
    pagination: PaginationType;
    submit: FiltersType;
  };
  scopeMode: ScopeMode;
  message: Nullable<MessageType>;
};

export type WidgetActionType =
  | {
      type: 'UPDATE_GLOBAL_MESSAGE';
      payload: Nullable<MessageType>;
    }
  | {
      type: 'UPDATE_SERVICE_NAME';
      payload: Nullable<string>;
    }
  | {
      type: 'UPDATE_UPSTREAM_TAB_CREATION';
    }
  | {
      type: 'UPDATE_ACTIVE_TAB';
    }
  | {
      type: 'UPDATE_SCOPE_TAB_CREATION';
    }
  | {
      type: 'UPDATE_UPSTREAM';
      payload: Partial<initialActiveSelectType>;
    }
  | { type: 'UPDATE_SCOPE_NAME'; payload: Nullable<string> }
  | { type: 'CLEAR_SCOPE'; payload?: undefined }
  | {
      type: 'UPDATE_FILTERS';
      payload: Partial<FiltersType>;
    }
  | {
      type: 'UPDATE_SUBMIT';
      payload: Partial<FiltersType>;
    }
  | { type: 'UPDATE_SCOPE_MODE'; payload: ScopeMode }
  | {
      type: 'UPDATE_PAGINATION';
      payload: Partial<PaginationType>;
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
