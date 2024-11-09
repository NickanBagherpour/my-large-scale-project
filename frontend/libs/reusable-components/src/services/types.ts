export type Action = 'sale' | 'resale' | 'redemption' | 'transfer';

export type SaleParams = {
  transactionId: number;
  url: string;
};

export interface BaseFetchData {
  status?: unknown;
  errorCode?: unknown;
  receiptDate: string;
  responseId?: unknown;
  message?: unknown;
  serviceTypeCode?: unknown;
  customerInfo: CustomerInfo;
  securitiesDetails: SecuritiesDetails;
  transactionDetails: TransactionDetails;
}

export interface TransferFetchData {
  receiptDate: string;
  responseId?: unknown;
  serviceTypeCode?: unknown;
  buyerCustomerInfo: CustomerInfo;
  sellerCustomerInfo: CustomerInfo;
  securitiesDetails: SecuritiesDetails;
  transactionDetails: TransactionDetails;
}

export type CustomerInfo = RealOrForeingerCustomerInfo | LegalCustomerInfo;

export interface RealOrForeingerCustomerInfo {
  fullName: string;
  identifier: Identifier;
  birthDate: string;
  fatherName: string;
  certNo?: unknown;
}

export interface LegalCustomerInfo {
  fullName: string;
  identifier: Identifier;
  shahabCode: number;
}

interface Identifier {
  code: number;
  value: string;
}
interface SecuritiesDetails {
  securitiesName: string;
  securitiesCode: string;
}
interface TransactionDetails {
  transactionDate: string;
  transactionId: number;
  branchCode: string;
  accountNumber?: unknown;
  count: number;
  withdrawAmount?: number;
  totalAmount: number;
  penalty?: number;
  interest: number;
  stamp?: number;
  uniqueId: string;
}
