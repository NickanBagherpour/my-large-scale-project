import z from 'zod';
import { ROUTE_NAMES } from '../utils/consts';
import { TFunction } from 'i18next';
import { createValidationSchema } from '@oxygen/utils';

export const createRouteSchema = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);

  return z.object({
    [ROUTE_NAMES.actionOrMethod]: validationSchema.idSelection,
    [ROUTE_NAMES.protocol]: validationSchema.idSelection,
    [ROUTE_NAMES.path]: validationSchema.required,
    [ROUTE_NAMES.host]: validationSchema.required,
  });
};

export type RouteType = z.infer<ReturnType<typeof createRouteSchema>>;
