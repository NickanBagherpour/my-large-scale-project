import z from 'zod';
import { ROUTE_NAMES } from '../utils/consts';
import { TFunction } from 'i18next';

const MAX_LENGTH = 30;

export const createRouteSchema = (t: TFunction) =>
  z.object({
    [ROUTE_NAMES.actionOrMethod]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') })
      .max(MAX_LENGTH, { message: t('validation.max_length') }),

    [ROUTE_NAMES.protocol]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') })
      .max(MAX_LENGTH, { message: t('validation.max_length') }),

    [ROUTE_NAMES.path]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') })
      .max(MAX_LENGTH, { message: t('validation.max_length') }),

    [ROUTE_NAMES.host]: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') })
      .max(MAX_LENGTH, { message: t('validation.max_length') }),
  });

export type RouteType = z.infer<ReturnType<typeof createRouteSchema>>;
