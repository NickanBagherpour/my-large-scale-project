/*--import-backoffice--*/
import { KEYS as ORGANIZATION_MANAGEMENT_KEYS } from './portals/backoffice/organization-management.key';
import { KEYS as SERVICE_CALL_LOG_KEYS } from './portals/backoffice/service-call-log.key';
import { KEYS as CLIENT_REPORT_KEYS } from './portals/backoffice/client-report.key';
import { KEYS as SERVICES_REPORT_KEYS } from './portals/backoffice/services-report.key';
import { KEYS as UPSTREAM_SERVICE_HISTORY_KEYS } from './portals/backoffice/upstream-service-history.key';
import { KEYS as UPSTREAM_HISTORY_KEYS } from './portals/backoffice/upstream-history.key';
import { KEYS as SERVICE_DOCUMENTATION_HISTORY_KEYS } from './portals/backoffice/service-documentation-history.key';
import { KEYS as EDIT_REQUEST_LIST_KEYS } from './portals/backoffice/edit-request-list.key';
import { KEYS as BACKOFFICE_AUTH_KEYS } from './portals/backoffice/backoffice-auth.key';
import { KEYS as SERVICE_DETAILS_KEYS } from './portals/backoffice/service-details.key';
import { KEYS as SERVICE_CLIENTS_LIST_KEYS } from './portals/backoffice/service-clients-list.key';
import { KEYS as UPSTREAM_DETAILS_KEYS } from './portals/backoffice/upstream-details.key';
import { KEYS as SCOPE_INFORMATION_KEYS } from './portals/backoffice/scope-information.key';
import { KEYS as SERVICE_CREATION_KEYS } from './portals/backoffice/service-creation.key';
import { KEYS as EDIT_SERVICE_KEYS } from './portals/backoffice/edit-service.key';
import { KEYS as CLIENT_CREATION_KEYS } from './portals/backoffice/client-creation.key';
import { KEYS as SCOPE_CREATION_KEYS } from './portals/backoffice/scope-creation.key';
import { KEYS as SERVICES_LIST_KEYS } from './portals/backoffice/services-list.key';
import { KEYS as CLIENT_DETAILS_KEYS } from './portals/backoffice/client-details.key';
import { KEYS as CLIENT_HISTORY_KEYS } from './portals/backoffice/client-history.key';
import { KEYS as CLIENT_SERVICE_HISTORY_KEYS } from './portals/backoffice/client-service-history.key';
import { KEYS as SCOPE_CHANGE_HISTORY_KEYS } from './portals/backoffice/scope-change-history.key';
import { KEYS as SERVICE_HISTORY_KEYS } from './portals/backoffice/service-history.key';
import { KEYS as EDIT_APPLICANT_INFO_KEYS } from './portals/backoffice/edit-applicant-info.key';
import { KEYS as CREATE_NEW_CLIENT_KEYS } from './portals/backoffice/create-new-client.key';
import { KEYS as SERVICE_MANAGEMENT_KEYS } from './portals/backoffice/service-management.key';
import { KEYS as CLIENTS_LIST_KEYS } from './portals/backoffice/client-list.key';
import { KEYS as EDIT_CLIENT_KEYS } from './portals/backoffice/edit-client-info.key';
import { KEYS as SCOPE_MANAGEMENT_KEYS } from './portals/backoffice/scope-management.key';
import { KEYS as UPSTREAM_LIST_KEYS } from './portals/backoffice/upstream-list.key';
import { KEYS as EDIT_SCOPE_KEYS } from './portals/backoffice/edit-scope.key';
import { KEYS as DOCUMENTATION_HISTORY_KEYS } from './portals/backoffice/documentation-history.key';
import { KEYS as ROUTE_HISTORY_KEYS } from './portals/backoffice/route-history.key';
import { KEYS as EDIT_ROUTE_KEYS } from './portals/backoffice/edit-route.key';
import { KEYS as GET_SCOPE } from './portals/backoffice/get-scope.key';
import { KEYS as ROUTE_DETAILS_KEYS } from './portals/backoffice/route-details.key';

/*--import-business--*/
import { KEYS as BUSINESS_SERVICE_MANAGEMENT_KEYS } from './portals/business/service-management.key';
import { KEYS as DETAILED_INVOICE_LIST_KEYS } from './portals/business/detailed-invoice-list.key';
import { KEYS as DETAILED_INVOICE_KEYS } from './portals/business/detailed-invoice.key';
import { KEYS as BILLING_DETAILS_KEYS } from './portals/business/billing-details.key';
import { KEYS as UPSERT_TARRIF_KEYS } from './portals/business/upsert-tarrif.key';
import { KEYS as TARIFF_DETAILS_KEYS } from './portals/business/tariff-details.key';
import { KEYS as TARIFF_LIST_KEYS } from './portals/business/tariff-list.key';
import { KEYS as META_KEYS } from './portals/business/meta.key';
import { KEYS as BUSINESS_DASHBOARD_KEYS } from './portals/business/business-dashboard.key';
import { KEYS as REQUEST_DETAILS_KEYS } from './portals/business/request-details.key';
import { KEYS as REQUEST_LIST_KEYS } from './portals/business/request-list.key';
import { KEYS as BUSINESS_AUTH_KEYS } from './portals/business/business-auth.key';
import { KEYS as CLIENTS_REPORT_KEYS } from './portals/business/clients-report.key';
import { KEYS as CLIENT_SERVICES } from './portals/business/client-services.key';

/*--import-customer--*/
import { KEYS as API_DOCS_KEYS } from './portals/customer/api-docs.key';
import { KEYS as CUSTOMER_DASHBOARD_KEYS } from './portals/customer/customer-dashboard.key';
import { KEYS as REQUEST_DETAILS_INFO_KEYS } from './portals/customer/request-details-info.key';
import { KEYS as REQUEST_MANAGEMENT_KEYS } from './portals/customer/request-management.key';
import { KEYS as REQUEST_REGISTRATION_KEYS } from './portals/customer/request-registration.key';
import { KEYS as CUSTOMER_AUTH_KEYS } from './portals/customer/customer-auth.key';
import { KEYS as LANDING_KEYS } from './portals/customer/landing.key';

/*--import-shared--*/
import { KEYS as REUSABLE_COMPONENTS_KEYS } from './portals/shared/reusable-components.key';

export const RQKEYS = {
  BACKOFFICE: {
    SERVICE: 'service',
    UPSTREAM: 'upstream',
    SCOPE: 'scope',
    CLIENT: 'client',
    CLIENT_PROFILE: 'client_profile',

    /*--export-backoffice--*/
    ORGANIZATION_MANAGEMENT: ORGANIZATION_MANAGEMENT_KEYS,
    SERVICE_CALL_LOG: SERVICE_CALL_LOG_KEYS,
    SERVICE_DOCUMENTATION_HISTORY: SERVICE_DOCUMENTATION_HISTORY_KEYS,
    SERVICES_REPORT: SERVICES_REPORT_KEYS,
    UPSTREAM_SERVICE_HISTORY: UPSTREAM_SERVICE_HISTORY_KEYS,
    UPSTREAM_HISTORY: UPSTREAM_HISTORY_KEYS,
    //CLIENTS
    CLIENTS_LIST: CLIENTS_LIST_KEYS,
    EDIT_CLIENT_KEYS: EDIT_CLIENT_KEYS,
    CLIENT_DETAILS: CLIENT_DETAILS_KEYS,
    CLIENT_HISTORY: CLIENT_HISTORY_KEYS,
    CLIENT_REPORT: CLIENT_REPORT_KEYS,
    CLIENT_SERVICE_HISTORY: CLIENT_SERVICE_HISTORY_KEYS,
    CLIENT_CREATION: CLIENT_CREATION_KEYS,
    CREATE_NEW_CLIENT: CREATE_NEW_CLIENT_KEYS,
    //UPSTREAM
    UPSTREAM_DETAILS: UPSTREAM_DETAILS_KEYS,
    UPSTREAM_LIST: UPSTREAM_LIST_KEYS,
    //SERVICES
    EDIT_SERVICE: EDIT_SERVICE_KEYS,
    SERVICES_LIST: SERVICES_LIST_KEYS,
    SERVICE_HISTORY: SERVICE_HISTORY_KEYS,
    SERVICE_DETAILS: SERVICE_DETAILS_KEYS,
    SERVICE_CREATION: SERVICE_CREATION_KEYS,
    SERVICE_MANAGEMENT: SERVICE_MANAGEMENT_KEYS,
    SERVICE_CLIENTS_LIST: SERVICE_CLIENTS_LIST_KEYS,
    SERVICE_INQUIRY: SERVICES_LIST_KEYS.INQUIRY,
    //SCOPE
    EDIT_SCOPE: EDIT_SCOPE_KEYS,
    SCOPE_CREATION: SCOPE_CREATION_KEYS,
    SCOPE_MANAGEMENT: SCOPE_MANAGEMENT_KEYS,
    SCOPE_INFORMATION: SCOPE_INFORMATION_KEYS,
    SCOPE_CHANGE_HISTORY: SCOPE_CHANGE_HISTORY_KEYS,
    GET_SCOPE: GET_SCOPE,
    // ROUTE
    ROUTE_CHANGE_HISTORY: ROUTE_HISTORY_KEYS,
    EDIT_ROUTE: EDIT_ROUTE_KEYS,
    ROUTE_DETAILS: ROUTE_DETAILS_KEYS,
    // ETC

    EDIT_APPLICANT_INFO: EDIT_APPLICANT_INFO_KEYS,
    AUTH: BACKOFFICE_AUTH_KEYS,
    DOCUMENTATION_HISTORY: DOCUMENTATION_HISTORY_KEYS,
  },

  BUSINESS: {
    REQUEST: 'request',
    /*--export-business--*/
    BUSINESS_SERVICE_MANAGEMENT: BUSINESS_SERVICE_MANAGEMENT_KEYS,
    DETAILED_INVOICE_LIST: DETAILED_INVOICE_LIST_KEYS,
    DETAILED_INVOICE: DETAILED_INVOICE_KEYS,
    BILLING_DETAILS: BILLING_DETAILS_KEYS,
    UPSERT_TARRIF: UPSERT_TARRIF_KEYS,
    TARIFF_DETAILS: TARIFF_DETAILS_KEYS,
    TARIFF_LIST: TARIFF_LIST_KEYS,
    META: META_KEYS,
    DASHBOARD: BUSINESS_DASHBOARD_KEYS,
    REQUEST_DETAILS_INFO: REQUEST_DETAILS_INFO_KEYS,
    EDIT_REQUEST_LIST: EDIT_REQUEST_LIST_KEYS,
    REQUEST_DETAILS: REQUEST_DETAILS_KEYS,
    REQUEST_LIST: REQUEST_LIST_KEYS,
    AUTH: BUSINESS_AUTH_KEYS,
    CLIENTS_REPORT: CLIENTS_REPORT_KEYS,
    CLIENT_SERVICES: CLIENT_SERVICES,
  },

  CUSTOMER: {
    REQUEST: 'request',
    /*--export-customer--*/
    API_DOCS: API_DOCS_KEYS,
    LANDING: LANDING_KEYS,
    DASHBOARD: CUSTOMER_DASHBOARD_KEYS,
    AUTH: CUSTOMER_AUTH_KEYS,
    REQUEST_MANAGEMENT: REQUEST_MANAGEMENT_KEYS,
    REQUEST_REGISTRATION: REQUEST_REGISTRATION_KEYS,
  },

  REUSABLE_COMPONENTS: REUSABLE_COMPONENTS_KEYS,
  /*--export-shared--*/
};
