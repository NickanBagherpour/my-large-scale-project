import { FC, ComponentType, memo } from 'react';
import ContentNotFoundFallback from '../components/error-fallback/content-not-found-fallback';
// import { useRouter } from 'next/router';

interface WithRoleCheckProps<R extends Record<string, string>> {
  role?: string;
  allowedRoles: R;
}

const withRoleCheck = <P extends object, R extends Record<string, string>>(
  WrappedComponent: ComponentType<P>
): FC<P & WithRoleCheckProps<R>> => {
  const ComponentWithRoleCheck: FC<P & WithRoleCheckProps<R>> = ({ role, allowedRoles, ...props }) => {
    // const router = useRouter();
    const isValidRole = (role: string): role is R[keyof R] => {
      return Object.values(allowedRoles).includes(role as R[keyof R]);
    };
    if (!role || !isValidRole(role)) {
      return <ContentNotFoundFallback />;
    }

    return <WrappedComponent {...(props as P)} />;
  };

  return memo(ComponentWithRoleCheck);
};

export default withRoleCheck;
