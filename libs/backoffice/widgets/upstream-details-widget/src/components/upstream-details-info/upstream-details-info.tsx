import React, { useState } from 'react';
import { Form } from 'antd';
import { useTr } from '@oxygen/translation';
import * as S from './upstream-details-info.style';
import { PageProps } from '@oxygen/types';
import { Button, InfoBox } from '@oxygen/ui-kit';
import { ROUTES } from '@oxygen/utils';

type UpstreamDetailsInfoProps = PageProps & {
  infoData?: { name: string; description: string };
  loading?: boolean;
};
const UpstreamDetailsInfo: React.FC<UpstreamDetailsInfoProps> = (props) => {
  const { infoData } = props;
  const [t] = useTr();

  const upstreamInfoData = [
    { key: t('english_upstream_name'), value: infoData?.name },
    { key: t('persian_upstream_name'), value: infoData?.description },
  ];

  return (
    <S.Container>
      <section>
        <S.Header>
          <S.TabName>{t('upstream_global_info')}</S.TabName>
          <S.Btns>
            <Button
              href={`${ROUTES.BACKOFFICE.UPSTREAM_HISTORY}?servicename=service-19`}
              color='primary'
              variant='filled'
            >
              <S.Icon className='icon-clock' />
              {t('display_change_history')}
            </Button>
            <Button href={`${ROUTES.BACKOFFICE.EDIT_CLIENT_INFO}?requestId=123456789`} color='primary' variant='solid'>
              <S.Icon className='icon-edit' />
              {t('edit')}
            </Button>
          </S.Btns>
        </S.Header>

        <InfoBox margin={0} data={upstreamInfoData} minColumnCount={2} />
      </section>
    </S.Container>
  );
};

export default UpstreamDetailsInfo;
