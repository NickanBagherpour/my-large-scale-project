import { ActiveBadge, InactiveBadge } from '../assets/media';

export type StatusType = 'active' | 'inactive';

export const Status = ({ status }: { status: StatusType }) => {
  return status === 'active' ? <ActiveBadge /> : <InactiveBadge />;
};
