'use client';

import { DashboardLayout } from '@oxygen/customer/layouts';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
