import { AuthLayout } from '@oxygen/business/layouts';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
