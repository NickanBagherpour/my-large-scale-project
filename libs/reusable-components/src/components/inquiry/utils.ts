import { InquiryDto, ServiceInquiryDto } from './types';

export function isServiceInquiryDto(data: InquiryDto): data is ServiceInquiryDto {
  return 'serviceInquiryStatus' in data;
}
