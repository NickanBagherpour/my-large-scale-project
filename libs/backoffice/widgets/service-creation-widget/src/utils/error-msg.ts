import { TFunction } from 'i18next';
import { MessageType } from '@oxygen/types';
import { ErrorMsg } from '../types';

export const getErrorMsg = (props: { msg: MessageType | null; t: TFunction }): ErrorMsg | null => {
  const { t, msg } = props;
  if (msg) {
    const title = msg.shouldTranslate ? t(msg.title || '') : msg.title;
    const description = msg.shouldTranslate ? t(msg.description) : msg.description;
    return { title, description };
  }
  return null;
};
