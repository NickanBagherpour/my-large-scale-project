import { TFunction } from 'i18next';
import { InquiryDto, ServiceInquiryDto } from './types';

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
          data.organizationInfo?.isAggregator
            ? t('common.has') +
              (data?.organizationInfo?.aggregatorName ? '-' + data?.organizationInfo?.aggregatorName : '')
            : t('common.doesnt_have'),
          data.organizationInfo?.representative?.nameAndLastName,
        ];
  } else return [];
}
