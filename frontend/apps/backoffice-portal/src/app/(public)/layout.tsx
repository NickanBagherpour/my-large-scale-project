'use client';

import { ClientOnly } from '@oxygen/backoffice/layouts';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ClientOnly>{children}</ClientOnly>
    </div>
  );
}
