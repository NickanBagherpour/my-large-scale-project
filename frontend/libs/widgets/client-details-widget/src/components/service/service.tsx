import * as S from './service.style';
import { useTr } from '@oxygen/translation';
import PluginCard from '../plugin-card/plugin-card';
import { Button } from '@oxygen/ui-kit';

interface Props {
  idx: number;
  name: string;
  englishName: string;
  status: string;
  version: string;
  scope: string;
  upstream: string;
}

export default function Service(props: Props) {
  const { idx, name, englishName, status, version, scope, upstream } = props;
  const [t] = useTr();

  const data = [
    { name: t('english_name'), value: englishName },
    { name: t('status'), value: status },
    { name: t('version'), value: version },
    { name: t('scope'), value: scope },
    { name: t('upstream'), value: upstream },
  ];

  const cardsData = [
    { name: t('rate_limit_plugin'), isChecked: false },
    { name: t('non_denial'), isChecked: true },
    { name: t('new_request_validation'), isChecked: true },
  ];

  return (
    <S.Container>
      <S.Header>
        <S.Tag>
          {t('service')} {idx}
        </S.Tag>
        <S.ServiceName>{name}</S.ServiceName>
      </S.Header>
      <S.Body>
        <S.Items>
          {data.map(({ name, value }, idx) => (
            <div key={idx}>
              <S.ItemName>{name}</S.ItemName>
              <S.ItemValue>{value}</S.ItemValue>
            </div>
          ))}
        </S.Items>

        <S.Cards>
          {cardsData.map(({ name }, idx) => (
            <PluginCard name={name} idx={idx} />
          ))}

          <S.Divider orientation='center' type='vertical' />

          <Button shape='circle'>
            <S.PlusIcon className='icon-plus' />
          </Button>
        </S.Cards>
      </S.Body>
    </S.Container>
  );
}
