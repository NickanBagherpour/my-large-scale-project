import PluginServices from '../plugin-services/plugin-services';
import Header from '../plugin-header/plugin-header';
import { useGetPluginsQuery } from '../../services';
import { Loading } from '@oxygen/ui-kit';
import Footer from '../footer/footer';

export default function Plugins() {
  const { data, isFetching, isLoading } = useGetPluginsQuery();

  return (
    <>
      <Header />
      <Loading spinning={isFetching}>
        {data?.map((plugin) => (
          <PluginServices key={plugin.idx} {...plugin} />
        ))}
      </Loading>
      <Footer isLoading={isLoading} />
    </>
  );
}
