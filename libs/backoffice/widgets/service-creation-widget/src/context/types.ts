import * as React from 'react';
import { MessageType, Nullable } from '@oxygen/types';
import { CreateScopeFormType, GeneralInfoValuesType, RouteType } from '../types';
import { steps } from '../components/app/app';
import { StepProps } from 'antd';

// Partial<T>["length"] gives a union of all possible lengths of the array when elements are optional.
// T["length"] gives the exact length of the original array.
// Exclude removes the exact length of the array from the union of possible lengths, leaving only values that represent valid indices for T
type Indices<T extends readonly unknown[]> = Exclude<Partial<T>['length'], T['length']>;

export type StepNames = 'generalInfo' | 'scope' | 'upstream' | 'route' | 'confirmData';
export type StepIndex = Indices<typeof steps>;
export type Statuses = StepProps['status'];

export type WidgetStateType = {
  step: StepIndex;
  stepStatuses: Array<{ name: StepNames; status: Statuses }>;
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
