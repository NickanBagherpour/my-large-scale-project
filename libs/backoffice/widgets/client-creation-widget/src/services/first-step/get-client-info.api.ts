import { useQuery } from '@tanstack/react-query';

import { RQKEYS, withErrorHandling } from '@oxygen/utils';
import { useAppDispatch } from '../../context';
import Api from '../api';
import { ConvertedClientInfoResponseType } from '../../types/first-step/client-info.type';

export const useGetClientInfoQuery = (params) => {
  const dispatch = useAppDispatch();
  return useQuery<any>({
    queryKey: [RQKEYS.BACKOFFICE.CLIENT_CREATION.CLIENT_INFO, params],
    queryFn: withErrorHandling(() => Api.getClientInfo(params), dispatch),
    select: (p): ConvertedClientInfoResponseType => {
      const { clientInfo, ssoInfo } = p;
      const sortedTagIds = clientInfo.tagIds.sort((a, b) => a.code - b.code);
      const updatedTagIds = sortedTagIds.map((tag) => ({
        key: tag.code,
        label: tag.title,
      }));

      return {
        ssoClientId: ssoInfo ? ssoInfo.id : undefined,
        clientId: undefined,
        clientEnglishName: clientInfo ? clientInfo.clientEnglishName : ssoInfo.applicationName,
        clientPersianName: clientInfo ? clientInfo.clientPersianName : ssoInfo.organizationName,
        clientTypeCode: clientInfo ? clientInfo.clientTypeCode : ssoInfo.type,
        clientTypeName: undefined,
        clientKey: clientInfo ? clientInfo.clientKey : ssoInfo.oauthKey,
        authorizationKey: clientInfo ? clientInfo.authorizationKey : ssoInfo.nationalId,
        websiteUrl: clientInfo ? clientInfo.websiteUrl : ssoInfo.uri,
        inboundAddress: clientInfo ? clientInfo.inboundAddress : ssoInfo.inboundAddress,
        redirectUrl: clientInfo ? clientInfo.redirectUrl : ssoInfo.redirectingUri,
        isClientFlow: clientInfo ? clientInfo.isClientFlow : ssoInfo.clientFlow,
        isPasswordFlow: clientInfo ? clientInfo.isPasswordFlow : ssoInfo.passwordFlow,
        isAuthorizationFlow: clientInfo ? clientInfo.isAuthorizationFlow : ssoInfo.authorizationCodeFlow,
        isImplicitFlow: clientInfo ? clientInfo.isImplicitFlow : ssoInfo.implicitFlow,
        isRefreshToken: clientInfo ? clientInfo.isRefreshToken : ssoInfo.getsRefreshToken,
        tagIds: clientInfo ? updatedTagIds : [],
        organizationInfo: {
          organizationId: clientInfo ? clientInfo.organizationInfo.organizationId : undefined,
          organizationName: clientInfo ? clientInfo.organizationInfo.organizationName : undefined,
          organizationNationalId: clientInfo ? clientInfo.organizationInfo.organizationNationalId : undefined,
          isAggregator: clientInfo ? clientInfo.organizationInfo.isAggregator : undefined,
          aggregatorId: clientInfo ? clientInfo.organizationInfo.aggregatorId : undefined,
          aggregatorName: clientInfo ? clientInfo.organizationInfo.aggregatorName : undefined,
          representative: {
            nameAndLastName: clientInfo ? clientInfo.organizationInfo.representative.nameAndLastName : undefined,
            mobileNumber: clientInfo ? clientInfo.organizationInfo.representative.mobileNumber : undefined,
            fixedPhoneNumber: clientInfo ? clientInfo.organizationInfo.representative.fixedPhoneNumber : undefined,
            representativeType: clientInfo ? clientInfo.organizationInfo.representative.representativeType : undefined,
          },
        },
      };
    },
  });
};
