import { useSearchParams } from 'next/navigation';

// TODO: validate this, if it doesn't exits redirect them
export function useClientName() {
  return useSearchParams().get('name')!;
}
