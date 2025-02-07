import { Divider, Loading } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import * as S from './plugins.style';
import PluginServices from './plugin-services/plugin-services';
import { useClientPlugins } from './utils/get-client-plugins.api';
import { useClientServicePlugins } from './utils/get-client-service-plugins.api';
import PluginList from './plugin-list/plugin-list';

type Props = {
  clientName: string;
};

export default function Plugins(props: Props) {
  const { clientName } = props;
  const [t] = useTr();
  const { data: clientPlugins, isFetching: isFetchingClientPlugins } = useClientPlugins(clientName);
  const { data: clientServicePlugins } = useClientServicePlugins(clientName);

  if (!clientPlugins || !clientPlugins) return null;

  return (
    <>
      <S.Title>{t('client_plugin')}</S.Title>
      <S.Container>
        <PluginList clientName={clientName} plugins={clientPlugins} />
      </S.Container>
      <Divider />

      <Loading spinning={isFetchingClientPlugins}>
        <S.Title>{t('client_services_plugin')}</S.Title>
        {clientServicePlugins?.map((plugins, idx) => (
          <PluginServices key={idx} idx={idx}>
            <PluginList clientName={clientName} plugins={plugins} serviceId={596} />
          </PluginServices>
        ))}
      </Loading>
    </>
  );
}
