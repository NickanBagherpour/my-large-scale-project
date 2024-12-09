import { Skeleton } from 'antd';
import { type LottieComponentProps } from 'lottie-react';
import { JSXElementConstructor, LazyExoticComponent, ReactElement, Suspense, lazy } from 'react';
import dynamic from 'next//dynamic';

let LazyLottieComponent: any; // LazyExoticComponent<
//   (props: LottieComponentProps) => ReactElement<any, string | JSXElementConstructor<any>>
// >;
if (typeof document !== 'undefined') {
  // LazyLottieComponent = lazy(() => import('lottie-react'));
  LazyLottieComponent = dynamic(() => import('lottie-react'), {
    loading: () => <p>Loading...</p>,
    ssr: false,
  });
  // const DynamicHeader = dynamic(() => import('lottie-react'), {
  //   loading: () => <p>Loading...</p>,
  // })
}

interface LottieProps {
  id?: string;
}

export default function LazyLottie({ id, ref, animationData, ...props }: LottieProps & LottieComponentProps) {
  return (
    // <Suspense
    //   fallback={<Skeleton.Node active={true} style={{ height: props.height, width: props.width, marginTop: '8rem' }} />}
    // >
    <LazyLottieComponent animationData={animationData} {...props} />
    // </Suspense>
  );
}
