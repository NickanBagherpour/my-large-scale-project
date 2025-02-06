import { Divider, Loading } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import * as S from './plugins.style';
import { useQueryClient } from '@tanstack/react-query';
import PluginCard from './plugin-card/plugin-card';
import PluginServices from './plugin-services/plugin-services';
import LimitationsModal from './limitations-modal/limitations-modal';
import { ClientPlugins, PluginConfig } from './utils/plugins.type';
import { useClientPluginMutation } from './utils/post-client-plugin.api';
import { getKeys, useClientPlugins } from './utils/get-client-plugins.api';
import { useClientServicePlugins } from './utils/get-client-service-plugins.api';
import { useState } from 'react';
import TerminationsModal from './termination-modal/termination-modal';

// request-non-repudiation عدم انکار
// rate-limiting محدودیت فراخوانی
// request-termination

// عدم انکار
// پلاگین محدودیت فراخوانی
// اعتبارسنجی درخواست جدید

type Props = {
  clientName: string;
};

export default function Plugins(props: Props) {
  const { clientName } = props;
  const [t] = useTr();
  const { data: clientPlugins, isFetching: isFetchingClientPlugins } = useClientPlugins(clientName);
  const { data: clientServicePlugins } = useClientServicePlugins(clientName);

  const [currentConfig, setCurrentConfig] = useState<PluginConfig | null>(null);

  const queryClient = useQueryClient();

  const clientPluginMutation = useClientPluginMutation();

  const updateCurrentConfig = (config: PluginConfig | null) => {
    setCurrentConfig(config);
  };

  const onUpdateConfig = (plugin: PluginConfig) => {
    clientPluginMutation.mutateAsync(
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

  const onCheck = (isChecked: boolean, plugin: PluginConfig) => {
    if (isChecked) {
      updateCurrentConfig({ ...plugin, enabled: true });
    } else {
      onUpdateConfig({ ...plugin, enabled: false });
    }
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
              onCheck={(isChecked) => onCheck(isChecked, plugin)}
              onSetting={() => updateCurrentConfig(plugin)}
            />
          ))}
        </S.Container>
      </Loading>

      <Divider />

      <Loading spinning={isFetchingClientPlugins}>
        <S.Title>{t('client_services_plugin')}</S.Title>
        {clientServicePlugins?.map((plugins, idx) => (
          <PluginServices key={idx} idx={idx} plugins={plugins} onUpdateConfig={updateCurrentConfig} />
        ))}
      </Loading>

      {/* <Footer isLoading={isLoading} /> */}

      <LimitationsModal
        close={() => updateCurrentConfig(null)}
        isOpen={Boolean(currentConfig && currentConfig.name === 'rate-limiting')}
        // onSubmit={values => onUpdateConfig({...values, enabled: true})}
      />

      <TerminationsModal
        close={() => updateCurrentConfig(null)}
        isOpen={Boolean(currentConfig && currentConfig.name === 'request-termination')}
      />
    </>
  );
}
