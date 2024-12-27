import * as React from 'react';
import { MessageType, Nullable } from '@oxygen/types';
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
  serviceName: string;
  stepStatuses: Array<{
    name: StepNames;
    status: Statuses;
    error?: Record<string /* TODO: change this type to each step input names */, string>;
  }>;
  message: Nullable<MessageType>;
};

// TODO: extract this type from WidgetStateType
export type ErrorPayload = { [K in StepNames]: Record<string, string> };

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
      type: 'ADD_SERVICE_NAME';
      payload: WidgetStateType['serviceName'];
    }
  | {
      type: 'ADD_INITIAL_STEP';
      payload: WidgetStateType['step'];
    }
  | {
      type: 'ADD_STEP_ERRORS';
      payload: ErrorPayload;
    }
  | {
      type: 'GO_TO_FIRST_ERROR';
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
