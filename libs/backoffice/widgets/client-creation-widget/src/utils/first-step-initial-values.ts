import { FORM_ITEM } from './consts';

export const initialValues = (userData) => {
  return {
    [FORM_ITEM.latin_name_client]: userData.clientStatus,
    [FORM_ITEM.persian_name_client]: userData.grantType,
    [FORM_ITEM.client_type]: userData.tags,
    [FORM_ITEM.client_id]: userData.latinNameClient,
    [FORM_ITEM.identity_auth]: userData.persianNameClient,
    [FORM_ITEM.website_url]: userData.website_url,
    [FORM_ITEM.input_address]: userData.input_address,
    [FORM_ITEM.return_address]: userData.return_address,
    [FORM_ITEM.aggregator_status]: userData.aggregator_status,
    [FORM_ITEM.aggregator]: userData.aggregator,
    [FORM_ITEM.user_name]: userData.user_name,
    [FORM_ITEM.national_code]: userData.national_code,
    [FORM_ITEM.organization_name]: userData.organization_name,
    [FORM_ITEM.mobile_number]: userData.mobile_number,
    [FORM_ITEM.telephone]: userData.telephone,
    [FORM_ITEM.email]: userData.email,
  };
};

// {
//     "grant-tag": [
//         {
//             "label": "Client Flow",
//             "key": "clientFlow"
//         },
//         {
//             "label": "Password Flow",
//             "key": "passwordFlow"
//         },
//         {
//             "label": "Authorization Code Flow",
//             "key": "authorizationCodeFlow"
//         }
//     ],
//     "add-tag": [
//         {
//             "label": "سازمان ها و شرکت های بزرگ",
//             "key": "bigOrganization"
//         },
//         {
//             "label": "شرکت های پرداخت ساز - دانش بنیان و فین تک ها",
//             "key": "payCompany"
//         }
//     ],
//     "latin-name-client": "latin name",
//     "persian_name_client": "نام فارسی",
//     "client_type": "test 1",
//     "client_id": "cllient id",
//     "identity_auth": "auth id",
//     "website_url": "http://website",
//     "input_address": "https://incomeaddres",
//     "return_address": "https://returnaddress",
//     "aggregator_status": true,
//     "aggregator": "test 2",
//     "user_name": "client name",
//     "national_code": "national code",
//     "organization_name": "organization name",
//     "mobile_number": "phone name",
//     "telephone": "telephone",
//     "email": "email@email.email"
// }
