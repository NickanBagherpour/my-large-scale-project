import { useQueryClient } from '@tanstack/react-query';
import { PluginConfig } from '../utils/plugins.type';
import { useClientPluginMutation } from '../utils/post-client-plugin.api';
import { getPluginKeys } from '../utils/get-client-plugins.api';
import * as S from './plugin-list.style';
import PluginCard from '../plugin-card/plugin-card';
import { useState } from 'react';
import TerminationsModal from '../termination-modal/termination-modal';
import LimitationsModal from '../limitations-modal/limitations-modal';
import { useServiceMutaionMutation } from '../utils/post-service-plugin.api';
import { getServiceKeys } from '../utils/get-client-service-plugins.api';
import { Loading } from '@oxygen/ui-kit';

type Props = {
  plugins: PluginConfig[];
  clientName: string;
  serviceId?: number;
};

const hasSetting = (plugin: PluginConfig) => {
  return plugin.name !== 'request-non-repudiation';
};

export default function PluginList(props: Props) {
  const { plugins, clientName, serviceId } = props;
  const queryClient = useQueryClient();
  const clientPluginMutation = useClientPluginMutation();
  const servicePluginMutation = useServiceMutaionMutation();

  const [currentConfig, setCurrentConfig] = useState<PluginConfig | null>(null);

  const updateCurrentConfig = (config: PluginConfig | null) => {
    setCurrentConfig(config);
  };

  const isPending = serviceId ? servicePluginMutation.isPending : clientPluginMutation.isPending;

  const closeModal = () => {
    if (isPending) return;
    updateCurrentConfig(null);
  };

  const postConfig = (plugin: PluginConfig) => {
    if (serviceId) {
      servicePluginMutation.mutateAsync(
        { clientName, serviceId, ...plugin },
        {
          async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: getPluginKeys(clientName) });
            closeModal();
          },
        }
      );
    } else {
      clientPluginMutation.mutateAsync(
        { clientName, ...plugin },
        {
          async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: getServiceKeys(clientName) });
            closeModal();
          },
        }
      );
    }
  };

  return (
    <>
      <Loading spinning={isPending}>
        <S.Container>
          {plugins.map((plugin) => {
            const withSetting = hasSetting(plugin);
            return (
              <PluginCard
                key={plugin.name}
                plugin={plugin}
                onCheck={(isChecked) => {
                  if (isChecked) {
                    if (withSetting) {
                      updateCurrentConfig({ ...plugin, enabled: true });
                    } else {
                      postConfig({ ...plugin, enabled: true });
                    }
                  } else {
                    postConfig({ ...plugin, enabled: false });
                  }
                }}
                onSetting={withSetting ? () => updateCurrentConfig(plugin) : null}
              />
            );
          })}
        </S.Container>
      </Loading>

      {currentConfig && currentConfig.name === 'rate-limiting' && (
        <LimitationsModal
          isOpen={true}
          close={closeModal}
          isPending={isPending}
          plugin={currentConfig}
          onSubmit={(values) => postConfig({ ...values, enabled: true })}
        />
      )}

      {currentConfig && currentConfig.name === 'request-termination' && (
        <TerminationsModal
          isOpen={true}
          close={closeModal}
          isPending={isPending}
          plugin={currentConfig}
          onSubmit={(values) => postConfig({ ...values, enabled: true })}
        />
      )}
    </>
  );
}
