import * as React from 'react';
import { MessageType, Nullable } from '@oxygen/types';
import { CreateScopeFormType, GeneralInfoValuesType, RouteType } from '../types';

export type Step = 0 | 1 | 2 | 3;
export type ScopeMode = 'importFromSso' | 'createScope';

export type WidgetStateType = {
  step: Step;
  scopeMode: ScopeMode;
  generalInfo: GeneralInfoValuesType;
  scope: CreateScopeFormType;
  route: RouteType;
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
      type: 'UPDATE_SCOPE_STEP';
      payload: CreateScopeFormType;
    }
  | {
      type: 'UPDATE_SCOPE_MODE';
      payload: ScopeMode;
    }
  | {
      type: 'UPDATE_ROUTE_STEP';
      payload: RouteType;
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
