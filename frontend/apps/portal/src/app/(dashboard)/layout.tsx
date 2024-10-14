'use client';

import { DashboardLayout } from '@oxygen/layouts';

export default function Layout(
  {
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}