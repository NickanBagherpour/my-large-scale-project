import { Divider, Loading } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import * as S from './plugins.style';
import PluginServices from './plugin-services/plugin-services';
import { useClientPlugins } from './utils/get-client-plugins.api';
import { useClientServicePlugins } from './utils/get-client-service-plugins.api';
import PluginList from './plugin-list/plugin-list';
import NoResult from '../no-result/no-result';
import { type Dispatch } from 'react';

type Props = {
  clientName: string;
  dispatch: Dispatch<any>;
};

export default function Plugins(props: Props) {
  const { clientName, dispatch } = props;
  const [t] = useTr();
  const { data: clientPlugins, isFetching: isFetchingClientPlugins } = useClientPlugins(clientName, dispatch);
  const {
    data: clientServicePlugins,
    isFetching: isFetchingServicePlugins,
    isPending,
  } = useClientServicePlugins(clientName, dispatch);

  return (
    <>
      <S.Title>{t('uikit.client_plugin')}</S.Title>
      <S.Container>
        {isFetchingClientPlugins ? (
          <Loading />
        ) : (
          <PluginList dispatch={dispatch} clientName={clientName} plugins={clientPlugins} />
        )}
      </S.Container>
      <Divider />

      <S.Title>{t('uikit.client_services_plugin')}</S.Title>
      {isPending ? (
        <Loading />
      ) : clientServicePlugins?.length ? (
        <Loading spinning={isFetchingServicePlugins}>
          {clientServicePlugins.map(({ plugins, serviceInfoId, ...rest }, idx) => (
            <PluginServices {...rest} key={idx} idx={idx}>
              <PluginList dispatch={dispatch} clientName={clientName} plugins={plugins} serviceName={rest.name} />
            </PluginServices>
          ))}
        </Loading>
      ) : (
        <NoResult isLoading={false} />
      )}
    </>
  );
}
