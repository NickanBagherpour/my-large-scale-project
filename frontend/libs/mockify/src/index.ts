import * as UserMock from './user.mock';
import * as MenuMock from './menu.mock';
import * as AllocatedPapersMock from './allocated-papers.mock';
import * as TransferSecuritiesMock from './transfer-securitie.mock';
import * as AllTransferInformationMock from './all-tranfer-information.mock';
import * as InfoTransfereeMock from './info-transferee.mock';
import * as SecuritiesHistoryMock from './securities-history.mock';
import * as CustomerMock from './customer.mock';
import * as AccountMock from './account.mock';
import * as BlockUnblockMock from './block-unblock.mock';
import * as CalculateMock from './calculate.mock';
import * as CitiesMock from './data/cities';
import * as TransactionDataMock from './transaction-data.mock';
import * as RedeemReportMock from './redeem-report.mock';
import * as SalesReportMock from './sales-report.mock';
import * as DashboardMock from './dashboard.mock';
import * as SecuritiesStatusReportMock from './securities-status-report.mock';
import * as TransferReportMock from './transfer-report.mock';
import * as AccountNumberAssignmentMock from './account-number-assignment.mock';
import * as ProductHistoryMock from './product-history.mock';
import * as DetailTableMock from './detail-table.mock';
import * as ProductsMock from './products.mock';
import * as GrantTypeMock from './grant-type.mock';
import * as TagsInfo from './tags.mock';
import * as ClientsListMock from './client-list.mock';
import * as ServicesListMock from './services-list.mock';
import * as ClientsDetailsMock from './client-details.mock';
import * as ApplicantInfo from './applicant-info.mock';
import * as ClientInfo from './client-info.mock';
import * as ServiceHistoryMock from './service-history.mock';
import * as ClientHistoryMock from './client-history.mock';
import * as clientCreationTable from './client-creation-table';
import * as ApplicantHistoryMock from './applicant-history.mock';
import * as getScopesList from './list-scopes.mock';
import * as UpstreamListMock from './upstream-list.mock';

const Mockify = {
  ...UserMock,
  ...MenuMock,
  ...AllocatedPapersMock,
  ...TransferSecuritiesMock,
  ...AllTransferInformationMock,
  ...InfoTransfereeMock,
  ...SecuritiesHistoryMock,
  ...CustomerMock,
  ...AccountMock,
  ...BlockUnblockMock,
  ...CalculateMock,
  ...CitiesMock,
  ...TransactionDataMock,
  ...RedeemReportMock,
  ...SalesReportMock,
  ...DashboardMock,
  ...SecuritiesStatusReportMock,
  ...TransferReportMock,
  ...AccountNumberAssignmentMock,
  ...ProductHistoryMock,
  ...DetailTableMock,
  ...ProductsMock,
  ...ClientsListMock,
  ...ServicesListMock,
  ...ServiceHistoryMock,
  ...GrantTypeMock,
  ...TagsInfo,
  ...ClientsDetailsMock,
  ...ClientHistoryMock,
  ...ClientInfo,
  ...ApplicantInfo,
  ...clientCreationTable,
  ...ApplicantHistoryMock,
  ...getScopesList,
  ...UpstreamListMock,
};

export default Mockify;
