import { z } from 'zod';
import { TFunction } from 'i18next';
import { CREATE_SCOPE_NAMES, IMPORT_FORM_SSO_NAMES } from '../utils/consts';

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

export const importFromSso = (t: TFunction) =>
  z.object({
    [IMPORT_FORM_SSO_NAMES.scopeName]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') }),
  });

type zInfer<fn extends (...args: any[]) => any> = z.infer<ReturnType<fn>>;

type CreateScopeSchemaType = zInfer<typeof createScopeSchema>;
type ImportFromSsoType = zInfer<typeof importFromSso>;

export type AddScopeType = CreateScopeSchemaType | ImportFromSsoType;
