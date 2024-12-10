'use client';
import { Skeleton } from 'antd';
import { type LottieComponentProps } from 'lottie-react';
import { Suspense, lazy } from 'react';

const LazyLottieComponent = lazy(() => import('lottie-react'));

interface LottieProps {
  id?: string;
}

export default function LazyLottie({ id, ref, animationData, ...props }: LottieProps & LottieComponentProps) {
  return (
    <Suspense
      fallback={<Skeleton.Node active={true} style={{ height: props.height, width: props.width, marginTop: '8rem' }} />}
    >
      {LazyLottieComponent && <LazyLottieComponent animationData={animationData} {...props} />}
    </Suspense>
  );
}
