import { Chip, InfoBox } from '@oxygen/ui-kit';
import * as S from './route-info-box.style';
import { InfoItemType } from '@oxygen/types';

const renderTag = (tag: string) => {
  return (
    <S.Tag key={tag}>
      <S.Text
        copyable={{
          text: tag,
          tooltips: ['', ''],
          icon: [<S.Icon className='icon-copy' />, <S.Icon className='icon-tick-circle-outlined' />],
          onCopy: (e) => void console.log('>>>', e),
        }}
      >
        {tag}
      </S.Text>
    </S.Tag>
  );
};

type Props = {
  route: {
    protocols: string[];
    methods: string[];
    paths: string[];
    hosts: string[];
  };
  isLoading?: boolean;
};

export default function RouteInfoBox(props: Props) {
  const { route, isLoading } = props;

  let routeData: InfoItemType[] = [];

  if (route) {
    const { protocols, methods, paths, hosts } = route;
    routeData = [
      {
        key: 'uikit.action',
        value:
          methods?.map((tag) => (
            <Chip ellipsis type='active' key={tag} tooltipOnEllipsis tooltipTitle={tag}>
              {tag}
            </Chip>
          )) ?? '-',
        fullwidth: true,
      },
      {
        key: 'uikit.protocole',
        value:
          protocols?.map((tag) => (
            <Chip ellipsis type='active' key={tag} tooltipOnEllipsis tooltipTitle={tag}>
              {tag}
            </Chip>
          )) ?? '-',
        fullwidth: true,
      },
      { key: 'uikit.path', value: paths?.map((item: string) => renderTag(item)) ?? '-', fullwidth: true },
      { key: 'uikit.host', value: hosts?.map((item: string) => renderTag(item)) ?? '-', fullwidth: true },
    ];
  }

  return <InfoBox loading={!!isLoading} data={routeData} margin={0} />;
}
