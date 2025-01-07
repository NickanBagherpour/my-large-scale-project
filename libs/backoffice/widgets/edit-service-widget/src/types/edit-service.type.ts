import { CategoryType, ThroughputEnumType } from './service-enum.type';
import { TagType } from './tags.type';

export interface ServiceInfoDto {
  serviceInfoId: number;
  name: string;
  persianName: string;
  accessLevel: {
    code: number;
    title: string;
  };
  category: CategoryType;
  throughput: ThroughputEnumType;
  version: string;
  owner: string;
  serviceInfoDescription: string;
  isActive: boolean;
  isDeleted: boolean;
  tags: TagType[];
  serviceProgress: {
    statusCode: number;
    statusTitle: string;
    percent: number;
    step: number;
  };
  isInSSO: boolean;
}

export interface EditServiceRequest {
  latinName?: string;
  persianName?: string;
  accessLevel?: {
    code: number;
    title: string;
  };
  categoryCode?: number;
  version?: string;
  ownerName?: string;
  throughput?: {
    code: number;
    title: string;
  };
  tagsIds?: number[];
}
