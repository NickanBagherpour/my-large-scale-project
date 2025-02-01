import { FC, ComponentType, memo } from 'react';
import AccessDenied from '../components/error-fallback/access-denied';
// import { useRouter } from 'next/router';

interface WithRoleCheckProps {
  role?: string;
  allowedRoles: string[];
}

const withRoleCheck = <P extends object>(WrappedComponent: ComponentType<P>): FC<P & WithRoleCheckProps> => {
  const ComponentWithRoleCheck: FC<P & WithRoleCheckProps> = ({ role, allowedRoles, ...props }) => {
    // const router = useRouter();
    const isValidRole = (role: string) => {
      return allowedRoles.includes(role);
    };
    if (!role || !isValidRole(role)) {
      return <AccessDenied />;
    }

    return <WrappedComponent {...(props as P)} />;
  };

  return memo(ComponentWithRoleCheck);
};

export default withRoleCheck;
