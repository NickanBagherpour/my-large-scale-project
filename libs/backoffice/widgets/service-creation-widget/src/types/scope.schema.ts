import { z } from 'zod';
import { TFunction } from 'i18next';
import { IMPORT_FORM_SSO_NAMES } from '../utils/consts';

export const importFromSso = (t: TFunction) =>
  z.object({
    [IMPORT_FORM_SSO_NAMES.existingScopeName]: z
      .object({
        idx: z.number(),
        scopeName: z.string(),
        persianName: z.string(),
      })
      .optional(),
  });

type zInfer<fn extends (...args: any[]) => any> = z.infer<ReturnType<fn>>;

type ImportFromSsoType = zInfer<typeof importFromSso>;

export type ScopeFormType = ImportFromSsoType;
