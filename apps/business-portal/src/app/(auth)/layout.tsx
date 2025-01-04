import { AuthLayout } from '@oxygen/business/layouts';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
