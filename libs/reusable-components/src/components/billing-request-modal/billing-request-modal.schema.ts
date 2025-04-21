import dayjs, { Dayjs } from 'dayjs';
import { TFunction } from 'i18next';
import { z } from 'zod';

import { createValidationSchema } from '@oxygen/utils';

export const FORM_ITEM_NAMES = {
  name: 'name',
  year: 'year',
  month: 'month',
  discountType: 'discount_type',
  discountAmount: 'discount_amount',
} as const;

export const createBillType = (t: TFunction) => {
  const validationSchema = createValidationSchema(t);
  return z.object({
    [FORM_ITEM_NAMES.name]: validationSchema.defaultEnglishName,
    [FORM_ITEM_NAMES.year]: z
      .custom<Dayjs>((val) => (dayjs.isDayjs(val) && val.isValid() ? val : false), {
        message: t('validation.required'),
      })
      .refine((val) => val.isValid(), {
        message: t('validation.invalid_date'),
      }),
    [FORM_ITEM_NAMES.month]: z
      .custom<Dayjs>((val) => (dayjs.isDayjs(val) && val.isValid() ? val : false), {
        message: t('validation.required'),
      })
      .refine((val) => val.isValid(), {
        message: t('validation.invalid_date'),
      }),
    [FORM_ITEM_NAMES.discountType]: z
      .string({
        required_error: t('validation.required'),
        invalid_type_error: t('validation.required') /* if value is null */,
      })
      .trim(),
    [FORM_ITEM_NAMES.discountAmount]: validationSchema.money,
  });
};
export type CreateBillType = z.infer<ReturnType<typeof createBillType>>;
