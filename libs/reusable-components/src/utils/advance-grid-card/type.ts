import { SubmissionStatusCode } from './consts';

export interface SubmissionStatus {
  code: SubmissionStatusCode; // Enum type used here
  title: string;
}

export interface CardPropsType {
  submissionId: number;
  createDate: string; // Use 'string' if storing as text, or consider Date if parsed.
  creator: number;
  modifier: number;
  trackCode: string;
  submissionStatus: SubmissionStatus;
  organizationId: number;
  organizationName: string;
  clientName: string;
  permissionUserId: number;
  aggregatorName: string;
  serviceCount: number;
}

export type AdvanceGridCardPropsType = {
  btnHandleClick: (submissionId: number) => void;
  btnLoading: boolean;
  data: CardPropsType;
  wordToHighlight?: string;
};
