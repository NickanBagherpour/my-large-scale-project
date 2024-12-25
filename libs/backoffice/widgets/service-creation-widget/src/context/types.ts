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
  stepStatuses: Array<{ name: StepNames; status: Statuses }>;
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
      type: 'SYNC_WITH_URL';
      payload: Pick<WidgetStateType, 'step' | 'serviceName'>;
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
