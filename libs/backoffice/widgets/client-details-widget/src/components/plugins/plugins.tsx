import PluginServices from '../plugin-services/plugin-services';
import { useClientPlugins, useClientServicePlugins, useGetPluginsQuery } from '../../services';
import { Divider, Loading } from '@oxygen/ui-kit';
import Footer from '../footer/footer';
import { useTr } from '@oxygen/translation';
import * as S from './plugins.style';
import PluginCard from '../plugin-card/plugin-card';

export default function Plugins() {
  const [t] = useTr();
  const { data, isFetching, isLoading } = useGetPluginsQuery();
  const { data: clientPlugins } = useClientPlugins('test-prefix-ali-client4');
  const { data: clientServicePlugins /* , isFetching: isFetchingClientServicePlugins */ } =
    useClientServicePlugins('test-prefix-ali-client2');

  if (!data || !clientPlugins) return null;

  return (
    <>
      <S.Title>{t('client_plugin')}</S.Title>
      <S.Container>
        {clientPlugins.map((plugin) => (
          <PluginCard key={plugin.name} plugin={plugin} />
        ))}
      </S.Container>

      <Divider />

      <Loading spinning={isFetching}>
        <S.Title>{t('client_services_plugin')}</S.Title>
        {clientServicePlugins?.map((plugins, idx) => (
          <PluginServices key={idx} idx={idx} plugins={plugins} />
        ))}
      </Loading>
      <Footer isLoading={isLoading} />
    </>
  );
}
