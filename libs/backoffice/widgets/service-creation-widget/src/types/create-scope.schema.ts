import { z } from 'zod';
import { TFunction } from 'i18next';
import { CREATE_SCOPE_NAMES } from '../utils/consts';

export const createScopeSchema = (t: TFunction) =>
  z.object({
    [CREATE_SCOPE_NAMES.scopeName]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') }),

    [CREATE_SCOPE_NAMES.persianScopeName]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') })
      .regex(/^[^a-zA-Z]*$/, {
        message: t('validation.persian_name_error'),
      }),
  });

type zInfer<fn extends (...args: any[]) => any> = z.infer<ReturnType<fn>>;
export type CreateScopeFormType = zInfer<typeof createScopeSchema>;
