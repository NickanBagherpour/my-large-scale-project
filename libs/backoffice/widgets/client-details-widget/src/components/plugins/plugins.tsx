import PluginServices from '../plugin-services/plugin-services';
import { useClientPlugins, useClientServicePlugins, useGetPluginsQuery } from '../../services';
import { Divider, Loading } from '@oxygen/ui-kit';
import Footer from '../footer/footer';
import { useTr } from '@oxygen/translation';
import * as S from './plugins.style';
import PluginCard from '../plugin-card/plugin-card';
import LimitationsModal from '../limitations-modal/limitations-modal';
import { useState } from 'react';
import { PluginConfig } from '../../types';
import { updateCurrentConfig, useAppDispatch, useAppState } from '../../context';

// request-non-repudiation عدم انکار
// rate-limiting محدودیت فراخوانی
// request-termination

// عدم انکار
// پلاگین محدودیت فراخوانی
// اعتبارسنجی درخواست جدید

export default function Plugins() {
  const [t] = useTr();
  const { data, isFetching, isLoading } = useGetPluginsQuery();
  const { data: clientPlugins } = useClientPlugins('test-prefix-ali-client4');
  const { data: clientServicePlugins /* , isFetching: isFetchingClientServicePlugins */ } =
    useClientServicePlugins('test-prefix-ali-client4');

  const dispatch = useAppDispatch();
  const { currentConfig } = useAppState();

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

      <LimitationsModal close={() => updateCurrentConfig(dispatch, null)} isOpen={!!currentConfig} />
    </>
  );
}
