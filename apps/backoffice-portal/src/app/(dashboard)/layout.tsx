import React from 'react';
import { DashboardLayout } from '@oxygen/backoffice/layouts';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
