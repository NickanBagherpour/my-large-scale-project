'use client';

import { AuthLayout } from '@oxygen/customer/layouts';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
