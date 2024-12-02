import * as React from 'react';
import { MessageType, Nullable } from '@oxygen/types';
import { AddScopeType, GeneralInfoValuesType, UploadDocsType } from '../types';

export type Step = 0 | 1 | 2;
export type ScopeMode = 'importFromSso' | 'createScope';

export type WidgetStateType = {
  step: Step;
  scopeMode: ScopeMode;
  generalInfo: GeneralInfoValuesType;
  addScope: AddScopeType;
  uploadDocs: UploadDocsType;
  message: Nullable<MessageType>;
};

export type WidgetActionType =
  | {
      type: 'UPDATE_GLOBAL_MESSAGE';
      payload: Nullable<MessageType>;
    }
  | {
      type: 'NEXT_STEP';
    }
  | {
      type: 'PREVIOUS_STEP';
    }
  | {
      type: 'UPDATE_GENERAL_INFO_STEP';
      payload: GeneralInfoValuesType;
    }
  | {
      type: 'UPDATE_ADD_SCOPE_STEP';
      payload: AddScopeType;
    }
  | {
      type: 'UPDATE_SCOPE_MODE';
      payload: ScopeMode;
    }
  | {
      type: 'UPDATE_UPLOAD_DOCS';
      payload: UploadDocsType;
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
