import * as S from './animated-status.style';
import { errorAnimation, successAnimation, loadingAnimation } from '../../assets';
import { ReactNode } from 'react';
import LazyLottie from '../animation-loader/lazy-lottie';

type Status = 'success' | 'error' | 'loading';

export type StatusProps = {
  status: Status;
} & {
  [K in Status as `${K}Props`]: {
    description?: string;
    children?: ReactNode;
  };
};

const map: Record<Status, { json: object; loop: boolean }> = {
  loading: { json: loadingAnimation, loop: true },
  success: { json: successAnimation, loop: false },
  error: { json: errorAnimation, loop: false },
};

export default function AnimatedStatus(props: StatusProps) {
  const { status } = props;
  const { description, children } = props[`${status}Props`];

  return (
    <S.Container>
      <LazyLottie
        loop={map[status].loop}
        animationData={map[status].json}
        style={{
          width: '10rem',
          height: '10rem',
        }}
      />
      {description && <S.Description status={status}>{description}</S.Description>}
      {children}
    </S.Container>
  );
}
