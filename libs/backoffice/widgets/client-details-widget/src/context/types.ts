import * as React from 'react';
import { MessageType, Nullable } from '@oxygen/types';
import { PluginConfig } from '../types';

export type WidgetStateType = {
  message: Nullable<MessageType>;
  currentConfig: PluginConfig | null;
};

export type WidgetActionType =
  | {
      type: 'UPDATE_GLOBAL_MESSAGE';
      payload: Nullable<MessageType>;
    }
  | {
      type: 'UPDATE_CURRENT_CONFIG';
      payload: WidgetStateType['currentConfig'];
    };

export type WidgetDispatchType = React.Dispatch<WidgetActionType>;
