'use client';

import { ClientOnly } from '@oxygen/business/layouts';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ClientOnly>{children}</ClientOnly>
    </div>
  );
}
