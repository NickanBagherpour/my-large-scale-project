import z from 'zod';
import { ADD_SERVER_NAMES } from '../utils/consts';
import { TFunction } from 'i18next';

const MAX_LENGTH = 30;

export const addServerSchema = (t: TFunction) =>
  z.object({
    [ADD_SERVER_NAMES.domainOrIpPort]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') })
      .max(MAX_LENGTH, { message: t('validation.max_length') }),

    [ADD_SERVER_NAMES.weight]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') })
      .max(MAX_LENGTH, { message: t('validation.max_length') }),

    [ADD_SERVER_NAMES.health]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') })
      .max(MAX_LENGTH, { message: t('validation.max_length') }),
  });

export type AddServerType = z.infer<ReturnType<typeof addServerSchema>>;
