import { type LottieComponentProps } from 'lottie-react';
import dynamic from 'next/dynamic';
import * as S from './lazy-lottie.style';
import { Skeleton } from 'antd';

const LazyLottieComponent = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <Skeleton.Node active={true} />,
});

interface LottieProps {
  id?: string;
}

export default function LazyLottie({ id, ref, animationData, ...props }: LottieProps & LottieComponentProps) {
  return (
    <S.Continer style={{ width: props.width, height: props.height }}>
      <LazyLottieComponent animationData={animationData} />
    </S.Continer>
  );
}
