'use client';

import { ClientOnly } from '@oxygen/reusable-components';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ClientOnly>{children}</ClientOnly>
    </div>
  );
}
