import { ActiveBadge, InactiveBadge } from '../assets/icons';

export type StatusType = 'active' | 'inactive';

export const Status = ({ status }: { status: StatusType }) => {
  return status === 'active' ? <ActiveBadge /> : <InactiveBadge />;
};
