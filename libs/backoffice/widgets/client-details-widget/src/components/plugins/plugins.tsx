import { Divider, Loading } from '@oxygen/ui-kit';
import Footer from '../footer/footer';
import { useTr } from '@oxygen/translation';
import * as S from './plugins.style';
import { updateCurrentConfig, useAppDispatch } from '../../context';
import { useQueryClient } from '@tanstack/react-query';
import PluginCard from './plugin-card/plugin-card';
import PluginServices from './plugin-services/plugin-services';
import LimitationsModal from './limitations-modal/limitations-modal';
import { ClientPlugins, PluginConfig } from './utils/plugins.type';
import { useClientPluginMutation } from './utils/post-client-plugin.api';
import { getKeys, useClientPlugins } from './utils/get-client-plugins.api';
import { useClientServicePlugins } from './utils/get-client-service-plugins.api';

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
  const { data: clientPlugins, isFetching: isFetchingClientPlugins, isLoading } = useClientPlugins(clientName);
  const { data: clientServicePlugins } = useClientServicePlugins(clientName);

  const queryClient = useQueryClient();

  const clientPluginMutation = useClientPluginMutation();

  const dispatch = useAppDispatch();
  // const { currentConfig } = useAppState();

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
