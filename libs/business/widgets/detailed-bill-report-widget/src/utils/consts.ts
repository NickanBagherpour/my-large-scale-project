export const clients = Array.from({ length: 30 }, (_, idx) => ({
  name: 'تاکسی اینترنتی تپسی',
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
