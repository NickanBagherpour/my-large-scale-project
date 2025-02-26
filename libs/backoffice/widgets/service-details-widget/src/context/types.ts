import * as React from 'react';
import { MessageType, Nullable } from '@oxygen/types';
export type FiltersType = FormFieldsType;
// export type ScopeMode = 'importFromSso' | 'createScope';
export type FormFieldsType = {
  name: Nullable<MessageType>;
};

export type PaginationType = {
  page: number;
  rowsPerPage: number;
};
export type initialActiveSelectType = {
  cardId: Nullable<string>;
};

export type WidgetStateType = {
  serviceName: Nullable<string>;
  upstreamTab: {
    activeSelect: initialActiveSelectType;
  };

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
      type: 'UPDATE_UPSTREAM';
      payload: Partial<initialActiveSelectType>;
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
