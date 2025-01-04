import z from 'zod';
import { ROUTE_NAMES } from '../utils/consts';
import { TFunction } from 'i18next';

const MAX_LENGTH = 200;

export const createRouteSchema = (t: TFunction) =>
  z.object({
    [ROUTE_NAMES.actionOrMethod]: z
      .number()
      .optional()
      .refine((val) => val, t('validation.choose_one_option')),

    [ROUTE_NAMES.protocol]: z
      .number()
      .optional()
      .refine((val) => val, t('validation.choose_one_option')),

    [ROUTE_NAMES.path]: z
      .string({
        required_error: t('validation.required'),
        invalid_type_error: t('validation.required') /* if value is null */,
      })
      .trim()
      .min(1, { message: t('validation.required') })
      .max(MAX_LENGTH, { message: t('validation.max_length') }),

    [ROUTE_NAMES.host]: z
      .string({
        required_error: t('validation.required'),
        invalid_type_error: t('validation.required'),
      })
      .trim()
      .min(1, { message: t('validation.required') })
      .max(MAX_LENGTH, { message: t('validation.max_length') }),
  });

export type RouteType = z.infer<ReturnType<typeof createRouteSchema>>;
