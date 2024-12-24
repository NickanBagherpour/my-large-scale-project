'use client';
import { Skeleton } from 'antd';
import { type LottieComponentProps } from 'lottie-react';
import { Suspense, lazy } from 'react';

const LazyLottieComponent = lazy(() => import('lottie-react'));

type LottieProps = {
  id?: string;
};

export default function LazyLottie({
  id,
  ref,
  animationData,
  height = '100%',
  width = '100%',
  ...props
}: LottieProps & LottieComponentProps) {
  return (
    <Suspense fallback={<Skeleton.Node active={true} style={{ height: height, width: width }} />}>
      {LazyLottieComponent && (
        <LazyLottieComponent animationData={animationData} style={{ height: height, width: width }} {...props} />
      )}
    </Suspense>
  );
}
