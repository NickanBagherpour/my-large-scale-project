import { AuthLayout } from '@oxygen/backoffice/layouts';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
