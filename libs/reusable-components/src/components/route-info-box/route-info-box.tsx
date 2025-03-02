import { Chip, InfoBox, Tag } from '@oxygen/ui-kit';
import * as S from './route-info-box.style';
import { InfoItemType } from '@oxygen/types';

const renderTag = (tag: string) => {
  return (
    <Tag className='route-info-box-tag' key={tag}>
      <S.Text
        copyable={{
          text: tag,
          tooltips: ['', ''],
          icon: [<S.Icon className='icon-copy' />, <S.Icon className='icon-tick-circle-outlined' />],
        }}
      >
        {tag}
      </S.Text>
    </Tag>
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

  return (
    <S.Container>
      <InfoBox loading={!!isLoading} data={routeData} margin={0} />
    </S.Container>
  );
}
