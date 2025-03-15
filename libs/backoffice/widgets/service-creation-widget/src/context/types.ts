import * as React from 'react';
import { MessageType, Nullable } from '@oxygen/types';
import { StepProps } from 'antd';

// Partial<T>["length"] gives a union of all possible lengths of the array when elements are optional.
// T["length"] gives the exact length of the original array.
// Exclude removes the exact length of the array from the union of possible lengths, leaving only values that represent valid indices for T
type Indices<T extends readonly unknown[]> = Exclude<Partial<T>['length'], T['length']>;

export const stepNames = ['generalInfo', 'scope', 'upstream', 'route', 'confirmData'] as const;

export type StepNames = (typeof stepNames)[number];
export type StepIndex = Indices<typeof stepNames>;
export type Statuses = StepProps['status'];

export type WidgetStateType = {
  step: StepIndex | null;
  serviceName: string;
  stepStatuses: Array<{
    name: StepNames;
    status: Statuses;
    error?: Record<string, string>;
  }>;
  message: Nullable<MessageType>;
};

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
      payload: NonNullable<WidgetStateType['step']>;
    }
  | {
      type: 'ADD_STEP_ERRORS';
      payload: NonNullable<ErrorPayload>;
    }
  | {
      type: 'GO_TO_FIRST_ERROR';
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
