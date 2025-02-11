import { Loading, type LoadingProps } from '@oxygen/ui-kit';

const CenteredLoading = ({ containerProps, ...restOfProps }: LoadingProps) => (
  <Loading {...restOfProps} height='100%' containerProps={{ ...containerProps, display: 'flex' }} />
);

export default CenteredLoading;
