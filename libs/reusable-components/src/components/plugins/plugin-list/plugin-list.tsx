import { useQueryClient } from '@tanstack/react-query';
import { PluginConfig } from '../utils/plugins.type';
import { useClientPluginMutation } from '../utils/post-client-plugin.api';
import { getPluginKeys } from '../utils/get-client-plugins.api';
import * as S from './plugin-list.style';
import PluginCard from '../plugin-card/plugin-card';
import { type Dispatch, useState } from 'react';
import TerminationsModal from '../termination-modal/termination-modal';
import LimitationsModal from '../limitations-modal/limitations-modal';
import { useServiceMutaionMutation } from '../utils/post-service-plugin.api';
import { Loading } from '@oxygen/ui-kit';
import { getServiceKeys } from '../utils/get-client-service-plugins.api';

type Props = {
  plugins?: PluginConfig[];
  clientName: string;
  serviceName?: string;
  dispatch: Dispatch<any>;
};

export default function PluginList(props: Props) {
  const { plugins, clientName, serviceName, dispatch } = props;
  const queryClient = useQueryClient();
  const clientPluginMutation = useClientPluginMutation(dispatch);
  const servicePluginMutation = useServiceMutaionMutation(dispatch);

  const [currentConfig, setCurrentConfig] = useState<PluginConfig | null>(null);

  const updateCurrentConfig = (config: PluginConfig | null) => {
    setCurrentConfig(config);
  };

  const isPending = serviceName ? servicePluginMutation.isPending : clientPluginMutation.isPending;

  const closeModal = () => {
    if (isPending) return;
    updateCurrentConfig(null);
  };

  const postConfig = (plugin: PluginConfig) => {
    if (serviceName) {
      servicePluginMutation.mutateAsync(
        { clientName, serviceName, ...plugin },
        {
          async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: getServiceKeys(clientName) });
            closeModal();
          },
        }
      );
    } else {
      clientPluginMutation.mutateAsync(
        { clientName, ...plugin },
        {
          async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: getPluginKeys(clientName) });
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
          {plugins?.map((plugin) => (
            <PluginCard
              key={plugin.name}
              plugin={plugin}
              onCheck={(isChecked) => {
                if (isChecked) updateCurrentConfig({ ...plugin, enabled: true });
                else postConfig({ ...plugin, enabled: false });
              }}
              onSetting={() => updateCurrentConfig(plugin)}
            />
          ))}
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
