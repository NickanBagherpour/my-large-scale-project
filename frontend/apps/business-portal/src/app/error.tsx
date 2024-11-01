'use client';

import { ErrorFallback } from '@oxygen/reusable-components';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return <ErrorFallback error={error} reset={reset} />;
}
