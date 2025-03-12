import { TFunction } from 'i18next';
import { InquiryDto, ServiceInquiryDto } from './types';
import { aggregatorStatusDisplay } from '@oxygen/utils';

export function isServiceInquiryDto(data: InquiryDto): data is ServiceInquiryDto {
  return 'serviceInquiryStatus' in data;
}

export function extractSpecificData(t: TFunction, data?: InquiryDto) {
  if (data) {
    return isServiceInquiryDto(data)
      ? [data.serviceName, data.servicePersianName, data.scopes?.map((s) => s.name)]
      : [
          data.organizationInfo?.organizationName,
          data.organizationInfo?.organizationId,
          aggregatorStatusDisplay(t, data?.organizationInfo),
          data.organizationInfo?.representative?.nameAndLastName,
        ];
  } else return [];
}
