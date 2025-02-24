import { useQueryClient } from '@tanstack/react-query';
import * as S from './plugin-list.style';
import PluginCard from '../plugin-card/plugin-card';
import { type Dispatch, useState } from 'react';
import TerminationsModal from '../termination-modal/termination-modal';
import LimitationsModal from '../limitations-modal/limitations-modal';
import { Loading } from '@oxygen/ui-kit';
import { useApp } from '@oxygen/hooks';
import { useTr } from '@oxygen/translation';
import { NoResult } from '@oxygen/reusable-components';
import { PluginConfig } from '../../types/plugins.type';
import {
  getPluginKeys,
  getServicePluginKeys,
  useClientPluginMutation,
  useServiceMutaionMutation,
} from '../../services';

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
  const { notification } = useApp();
  const [t] = useTr();

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
            await queryClient.invalidateQueries({ queryKey: getServicePluginKeys(clientName) });
            notification.success({ message: t('uikit.edit_was_successful') });
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
            notification.success({ message: t('uikit.edit_was_successful') });
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
          {plugins?.length ? (
            plugins.map((plugin) => (
              <PluginCard
                key={plugin.name}
                plugin={plugin}
                onCheck={(isChecked) => {
                  if (isChecked) updateCurrentConfig({ ...plugin, enabled: true });
                  else postConfig({ ...plugin, enabled: false });
                }}
                onSetting={() => updateCurrentConfig(plugin)}
              />
            ))
          ) : (
            <NoResult />
          )}
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
