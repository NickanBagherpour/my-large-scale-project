import PluginServices from '../plugin-services/plugin-services';
import { useClientPlugins, useClientServicePlugins, useGetPluginsQuery } from '../../services';
import { Divider, Loading } from '@oxygen/ui-kit';
import Footer from '../footer/footer';
import { useTr } from '@oxygen/translation';
import * as S from './plugins.style';
import PluginCard from '../plugin-card/plugin-card';
import LimitationsModal from '../limitations-modal/limitations-modal';
import { updateCurrentConfig, useAppDispatch, useAppState } from '../../context';
import { useClientName } from '../../utils/use-client-name';
import { useClientPluginMutation } from '../../services/post-client-plugin.api';
import { ClientPlugins, PluginConfig } from '../../types';
import { useQueryClient } from '@tanstack/react-query';
import { getKeys } from '../../services/get-client-plugins.api';

// request-non-repudiation عدم انکار
// rate-limiting محدودیت فراخوانی
// request-termination

// عدم انکار
// پلاگین محدودیت فراخوانی
// اعتبارسنجی درخواست جدید

export default function Plugins() {
  const [t] = useTr();
  const clientName = useClientName();
  const { data: clientPlugins, isFetching: isFetchingClientPlugins, isLoading } = useClientPlugins(clientName);
  const { data: clientServicePlugins /* , isFetching: isFetchingClientServicePlugins */ } =
    useClientServicePlugins(clientName);

  const queryClient = useQueryClient();

  const clientPluginMutation = useClientPluginMutation();

  const dispatch = useAppDispatch();
  const { currentConfig } = useAppState();

  const onUpdateConfig = (plugin: PluginConfig) => {
    clientPluginMutation.mutate(
      { clientName, ...plugin },
      {
        onSuccess() {
          queryClient.setQueryData(getKeys(clientName), (oldData: ClientPlugins) =>
            oldData.map((oldPlugin) => (oldPlugin.name === plugin.name ? plugin : oldPlugin))
          );
        },
      }
    );
  };

  if (!clientPlugins || !clientPlugins) return null;

  return (
    <>
      <S.Title>{t('client_plugin')}</S.Title>

      <Loading spinning={clientPluginMutation.isPending}>
        <S.Container>
          {clientPlugins.map((plugin) => (
            <PluginCard
              key={plugin.name}
              plugin={plugin}
              onCheck={(isChecked) => onUpdateConfig({ ...plugin, enabled: isChecked })}
            />
          ))}
        </S.Container>
      </Loading>

      <Divider />

      <Loading spinning={isFetchingClientPlugins}>
        <S.Title>{t('client_services_plugin')}</S.Title>
        {clientServicePlugins?.map((plugins, idx) => (
          <PluginServices key={idx} idx={idx} plugins={plugins} />
        ))}
      </Loading>
      <Footer isLoading={isLoading} />

      <LimitationsModal
        close={() => updateCurrentConfig(dispatch, null)}
        isOpen={false /*!!currentConfig?.name === 'rate-limiting'*/}
      />
    </>
  );
}
