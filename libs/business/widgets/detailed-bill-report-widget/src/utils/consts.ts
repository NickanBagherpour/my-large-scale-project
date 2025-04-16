export const clients = Array.from({ length: 30 }, (_, idx) => ({
  name: 'تاکسی اینترنتی تپسی',
  nationalId: '10101942864',
  index: idx + 1,
  data: Array.from({ length: 4 }, (_, idx) => ({
    index: idx + 1,
    range: 'تا 10 میلیون ریال',
    successfulTransaction: 10000,
    unsuccessfulTransaction: 52,
    totalTransactionsCountAll: 1052,
    feePriceRiyal: 10000,
    totalAmountRiyal: 1250000000,
  })),
}));

// TODO: make this multi language
export const jalliMonths = {
  1: 'فروردین',
  2: 'اردیبهشت',
  3: 'خرداد',
  4: 'تیر',
  5: 'مرداد',
  6: 'شهریور',
  7: 'مهر',
  8: 'آبان',
  9: 'آذر',
  10: 'دی',
  11: 'بهمن',
  12: 'اسفند',
};
