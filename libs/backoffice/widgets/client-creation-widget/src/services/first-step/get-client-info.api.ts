import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../../context';
import Api from '../api';

export const useGetClientInfoQuery = (params) => {
  const dispatch = useAppDispatch();
  return useQuery<any>({
    queryKey: [RQKEYS.BACKOFFICE.CLIENT_CREATION.CLIENT_INFO, params],
    queryFn: withErrorHandling(() => Api.getClientInfo(params), dispatch),
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
      uri,
      redirectingUri,
    }) => ({
      ssoClientId: id,
      clientEnglishName: applicationName,
      clientPersianName: organizationName,
      clientTypeCode: type,
      clientTypeName: undefined,
      clientKey: oauthKey,
      authorizationKey: nationalId,
      websiteUrl: uri,
      inboundAddress: inboundAddress,
      redirectUrl: redirectingUri,
      isClientFlow: clientFlow,
      isPasswordFlow: passwordFlow,
      isAuthorizationFlow: authorizationCodeFlow,
      isImplicitFlow: implicitFlow,
      isRefreshToken: getsRefreshToken,
      tagIds: [],
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
