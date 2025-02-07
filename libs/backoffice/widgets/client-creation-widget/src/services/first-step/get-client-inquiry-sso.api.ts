import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../../context';
import Api from '../api';

export const useGetClientInquirySSOQuery = (params) => {
  const dispatch = useAppDispatch();
  return useQuery<any>({
    queryKey: [RQKEYS.BACKOFFICE.CLIENT_CREATION.INQUIRY_SSO, params],
    queryFn: withErrorHandling(() => Api.getClientInquirySSO(params), dispatch),
    enabled: false,
    select: ({
      id,
      applicationName,
      organizationName,
      type,
      oauthKey,
      nationalId,
      inboundAddress,
      clientFlow,
      passwordFlow,
      authorizationCodeFlow,
      implicitFlow,
      getsRefreshToken,
    }) => ({
      ssoClientId: id,
      clientEnglishName: applicationName,
      clientPersianName: organizationName,
      clientTypeCode: type,
      clientTypeName: undefined,
      clientKey: oauthKey,
      authorizationKey: nationalId,
      websiteUrl: undefined,
      inboundAddress: inboundAddress,
      redirectUrl: undefined,
      isClientFlow: clientFlow,
      isPasswordFlow: passwordFlow,
      isAuthorizationFlow: authorizationCodeFlow,
      isImplicitFlow: implicitFlow,
      isRefreshToken: getsRefreshToken,
      tagIds: undefined,
      organizationInfo: {
        organizationId: undefined,
        organizationName: undefined,
        organizationNationalId: undefined,
        isAggregator: undefined,
        aggregatorId: undefined,
        aggregatorName: undefined,
        representative: {
          nameAndLastName: undefined,
          mobileNumber: undefined,
          fixedPhoneNumber: undefined,
          representativeType: undefined,
        },
      },
    }),
  });
};
