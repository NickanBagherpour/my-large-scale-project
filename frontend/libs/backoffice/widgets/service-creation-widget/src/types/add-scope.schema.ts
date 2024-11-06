import { z } from 'zod';
import { TFunction } from 'i18next';

// export const createAddScopeSchema = (t: TFunction) =>
//   z.discriminatedUnion('import', [
//     z.object({ import: z.literal('fromSso'), scopeName: z.string() }),
//     z.object({ import: z.literal('create_scope'), scopeName: z.string(), persianScopeName: z.string() }),
//   ]);

export const createScopeSchema = (t: TFunction) =>
	z.object({
		scopeName: z.string({ required_error: t('validation.required') }),
		persianScopeName: z.string({ required_error: t('validation.required') }),
	});

export const importFromSso = (t: TFunction) =>
	z.object({ scopeName: z.string({ required_error: t('validation.required') }) });

// export type AddScope = z.infer<ReturnType<typeof createAddScopeSchema>>;
