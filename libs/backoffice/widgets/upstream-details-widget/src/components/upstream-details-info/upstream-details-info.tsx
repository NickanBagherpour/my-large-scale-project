import React, { useEffect, useState } from 'react';
import { createSchemaFieldRule } from 'antd-zod';
import { Form } from 'antd';
import { useTr } from '@oxygen/translation';
import * as S from './upstream-details-info.style';
import { PageProps } from '@oxygen/types';
import { Button, InfoBox, Loading } from '@oxygen/ui-kit';
import { ROUTES } from '@oxygen/utils';
import { useAppDispatch, useAppState } from '../../context';

// export default function UpstreamInfo() {
type UpstreamDetailsInfoProps = PageProps & {
  //
  infoData?: { name: string; description: string };
  loading?: boolean;
};
const UpstreamDetailsInfo: React.FC<UpstreamDetailsInfoProps> = (props) => {
  const { loading, infoData } = props;
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const state = useAppState();
  const [value, setValue] = useState('');
  const [form] = Form.useForm();

  const upstreamInfoData = [
    { key: t('english_upstream_name'), value: infoData?.name },
    { key: t('persian_upstream_name'), value: infoData?.description },
  ];

  return (
    // <Loading spinning={loading}>
    <S.Container>
      <section>
        <S.Header>
          <S.TabName>{t('upstream_global_info')}</S.TabName>
          <S.Btns>
            <Button href={`${ROUTES.BACKOFFICE.CLIENT_HISTORY}?clientId=123`} color='primary' variant='filled'>
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
    // </Loading>
  );
};

export default UpstreamDetailsInfo;
