import z from 'zod';
import { TFunction } from 'i18next';
import { createValidationSchema } from '@oxygen/utils';
import { ROUTE_NAMES } from '../utils/consts';

export const createRouteSchema = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);

  return z.object({
    [ROUTE_NAMES.methods]: validationSchema.codeTitle,
    [ROUTE_NAMES.protocols]: validationSchema.codeTitle,
    [ROUTE_NAMES.paths]: validationSchema.pathArray,
    [ROUTE_NAMES.hosts]: validationSchema.hostArray,
  });
};

export type RouteType = z.infer<ReturnType<typeof createRouteSchema>>;
