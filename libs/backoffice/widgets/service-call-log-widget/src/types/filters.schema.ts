import dayjs, { Dayjs } from 'dayjs';
import { z } from 'zod';

export const FormSchema = (t: (key: string) => string) =>
  z.object({
    service: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') })
      .refine((val) => val.trim().length > 0, {
        message: t('validation.invalid_service'),
      }),
    client: z
      .string({ required_error: t('validation.required') })
      .trim()
      .min(1, { message: t('validation.required') })
      .refine((val) => val.trim().length > 0, {
        message: t('validation.invalid_client'),
      }),
    fromDate: z
      .custom<Dayjs>((val) => (dayjs.isDayjs(val) && val.isValid() ? val : false), {
        message: t('validation.required'),
      })
      .refine((val) => val.isValid(), {
        message: t('validation.invalid_date'),
      }),

    toDate: z
      .custom<Dayjs>((val) => (dayjs.isDayjs(val) && val.isValid() ? val : false), {
        message: t('validation.required'),
      })
      .refine((val) => val.isValid(), {
        message: t('validation.invalid_date'),
      }),
  });

export type FormValues = z.infer<ReturnType<typeof FormSchema>>;
