import PluginServices from '../plugin-services/plugin-services';
import Header from '../plugin-header/plugin-header';
import { useGetPluginsQuery } from '../../services';
import { Loading } from '@oxygen/ui-kit';

export default function Plugins() {
  const { data, isFetching } = useGetPluginsQuery();

  return (
    <section>
      <Header />
      <Loading spinning={isFetching} size='large'>
        {data?.map((plugin) => (
          <PluginServices key={plugin.idx} {...plugin} />
        ))}
      </Loading>
    </section>
  );
}
