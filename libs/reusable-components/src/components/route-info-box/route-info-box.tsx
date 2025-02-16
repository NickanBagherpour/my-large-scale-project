import { Chip, InfoBox, Tag } from '@oxygen/ui-kit';
import * as S from './route-info-box.style';
import { InfoItemType } from '@oxygen/types';

const renderTag = (tag: string) => {
  return (
    <Tag key={tag} type='processing'>
      <S.Text copyable={{ text: tag, tooltips: ['', ''] }}>{tag}</S.Text>
    </Tag>
  );
};

type Props = {
  route: any;
  isLoading: boolean;
};

export default function RouteInfoBox(props: Props) {
  const { route, isLoading } = props;

  let routeData: InfoItemType[] = [];

  if (route) {
    const {
      route: { protocols, methods, paths, hosts },
    } = route;
    routeData = [
      {
        key: 'action_or_method',
        value: methods.map(({ title, code }) => (
          <Chip ellipsis type='active' key={code} tooltipOnEllipsis tooltipTitle={title}>
            {title}
          </Chip>
        )),
        fullwidth: true,
      },
      {
        key: 'protocol',
        value: protocols.map(({ title, code }) => (
          <Chip ellipsis type='active' key={code} tooltipOnEllipsis tooltipTitle={title}>
            {title}
          </Chip>
        )),
        fullwidth: true,
      },
      { key: 'Path', value: paths.map((item) => renderTag(item)), fullwidth: true },
      { key: 'host', value: hosts.map((item) => renderTag(item)), fullwidth: true },
    ];
  }

  return <InfoBox loading={isLoading} data={routeData} margin={0} />;
}
