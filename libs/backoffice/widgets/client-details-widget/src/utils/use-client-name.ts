import { notFound, useSearchParams } from 'next/navigation';

export function useClientName() {
  const clientName = useSearchParams().get('name');

  if (!clientName) {
    return notFound();
  }

  return clientName;
}
