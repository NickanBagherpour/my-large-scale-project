import * as React from 'react';
// import { FormFieldsType } from '../types';
import { MessageType, Nullable } from '@oxygen/types';

export type FiltersType = FormFieldsType;

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
export type initialFallbackSelectType = {
  englishName: Nullable<number | string>;
  persianName: Nullable<number | string>;
  servers: any[];
};
export type WidgetStateType = {
  upstreamTab: {
    radioValue: Nullable<number | string>;
    activeSelect: initialActiveSelectType;
    fallbackSelect: initialFallbackSelectType;
  };
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
      type: 'UPDATE_RADIO_VALUE';
      payload: Nullable<number | string>;
    }
  | {
      type: 'UPDATE_UPSTREAM_TAB_CREATION';
    }
  | {
      type: 'FILTERED_FALLBACK_SERVER';
      payload: {
        weight: string;
        ip_port: string;
      }[];
    }
  | {
      type: 'UPDATE_FALLBACK_SERVERS';
      payload: {
        weight: string;
        ip_port: string;
      }[];
    }
  | {
      type: 'UPDATE_PERSIAN_NAME';
      payload: Nullable<number | string>;
    }
  | {
      type: 'UPDATE_ENGLISH_NAME';
      payload: Nullable<number | string>;
    }
  | {
      type: 'UPDATE_UPSTREAM';
      payload: Partial<initialActiveSelectType>;
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
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
