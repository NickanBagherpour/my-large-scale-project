import * as UserMock from './user.mock';
import * as MenuMock from './menu.mock';
import * as InfoTransfereeMock from './info-transferee.mock';
import * as SecuritiesHistoryMock from './securities-history.mock';
import * as CustomerMock from './customer.mock';
import * as CitiesMock from './data/cities';
import * as DashboardMock from './dashboard.mock';
import * as SecuritiesStatusReportMock from './securities-status-report.mock';
import * as DetailTableMock from './detail-table.mock';
import * as GrantTypeMock from './grant-type.mock';
import * as TagsInfo from './tags.mock';
import * as ClientsListMock from './client-list.mock';
import * as ServicesListMock from './services-list.mock';
import * as ClientsDetailsMock from './client-details.mock';
import * as ApplicantInfo from './applicant-info.mock';
import * as ClientInfo from './client-info.mock';
import * as ServiceHistoryMock from './service-history.mock';
import * as ClientHistoryMock from './client-history.mock';
import * as clientCreationFirstStep from './client-creation-first-step';
import * as ApplicantHistoryMock from './applicant-history.mock';
import * as ServiceInfoMock from './service-info.mock';
import * as ServiceClientsListMock from './service-clients-list.mock';
import * as ServiceDetailsMock from './service-details.mock';
import * as getScopesList from './list-scopes.mock';
import * as UpstreamListMock from './upstream-list.mock';
import * as getUpstreamDetailsMock from './upstream-details.mock';
import * as ServiceCreation from './service-creation.mock';
import * as CustomerMenuMock from './customer-menu.mock';
import * as getScopeChangeHistory from './scope-change-history.mock';
import * as UpstreamCardDetails from './upstream-card-details.mock';
import * as RequestDetails from './request-details.mock';

const Mockify = {
  ...UserMock,
  ...MenuMock,
  ...InfoTransfereeMock,
  ...SecuritiesHistoryMock,
  ...CustomerMock,
  ...CitiesMock,
  ...DashboardMock,
  ...SecuritiesStatusReportMock,
  ...DetailTableMock,
  ...ClientsListMock,
  ...ServicesListMock,
  ...ServiceHistoryMock,
  ...ServiceDetailsMock,
  ...ServiceClientsListMock,
  ...ServiceInfoMock,
  ...GrantTypeMock,
  ...TagsInfo,
  ...ClientsDetailsMock,
  ...ClientHistoryMock,
  ...ClientInfo,
  ...ApplicantInfo,
  ...clientCreationFirstStep,
  ...ApplicantHistoryMock,
  ...getScopesList,
  ...UpstreamListMock,
  ...getUpstreamDetailsMock,
  ...ServiceCreation,
  ...CustomerMenuMock,
  ...getScopeChangeHistory,
  ...UpstreamCardDetails,
  ...RequestDetails,
};

export default Mockify;
