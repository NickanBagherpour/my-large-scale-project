'use client';

import { ErrorFallback } from '@oxygen/backoffice/layouts';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return <ErrorFallback error={error} reset={reset} />;
}
