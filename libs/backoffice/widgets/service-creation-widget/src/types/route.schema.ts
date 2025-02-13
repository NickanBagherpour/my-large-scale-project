import z from 'zod';
import { ROUTE_NAMES } from '../utils/consts';
import { TFunction } from 'i18next';
import { createValidationSchema } from '@oxygen/utils';

export const createRouteSchema = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);

  return z.object({
    [ROUTE_NAMES.name]: validationSchema.required,
    [ROUTE_NAMES.methods]: validationSchema.codeTitle,
    [ROUTE_NAMES.protocols]: validationSchema.codeTitle,
    [ROUTE_NAMES.paths]: validationSchema.codeTitle,
    [ROUTE_NAMES.hosts]: validationSchema.codeTitle,
  });
};

export type RouteType = z.infer<ReturnType<typeof createRouteSchema>>;
