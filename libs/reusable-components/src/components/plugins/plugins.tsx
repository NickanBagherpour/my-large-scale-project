import { Divider, Loading } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import * as S from './plugins.style';
import PluginServices from './plugin-services/plugin-services';
import { useClientPlugins } from './utils/get-client-plugins.api';
import { useClientServicePlugins } from './utils/get-client-service-plugins.api';
import PluginList from './plugin-list/plugin-list';
import NoResult from '../no-result/no-result';

type Props = {
  clientName: string;
};

export default function Plugins(props: Props) {
  const { clientName } = props;
  const [t] = useTr();
  const { data: clientPlugins, isFetching: isFetchingClientPlugins } = useClientPlugins(clientName);
  const { data: clientServicePlugins } = useClientServicePlugins(clientName);

  if (!clientPlugins || !clientServicePlugins) return null;

  return (
    <>
      <S.Title>{t('client_plugin')}</S.Title>
      <S.Container>
        <PluginList clientName={clientName} plugins={clientPlugins} />
      </S.Container>
      <Divider />

      <Loading spinning={isFetchingClientPlugins}>
        <S.Title>{t('client_services_plugin')}</S.Title>
        {clientServicePlugins.length ? (
          clientServicePlugins.map(({ plugins, serviceInfoId, ...rest }, idx) => (
            <PluginServices {...rest} key={idx} idx={idx}>
              <PluginList clientName={clientName} plugins={plugins} serviceName={rest.name} />
            </PluginServices>
          ))
        ) : (
          <NoResult isLoading={false} />
        )}
      </Loading>
    </>
  );
}
