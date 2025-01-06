'use client';

import { useSearchParams } from 'next/navigation';

const useQueryParams = () => {
  const searchParams = useSearchParams();

  // Convert the Next.js searchParams to a URLSearchParams object
  return new URLSearchParams(searchParams.toString());
};

export default useQueryParams;
