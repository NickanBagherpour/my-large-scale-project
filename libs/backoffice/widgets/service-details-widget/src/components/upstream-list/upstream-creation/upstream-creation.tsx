import React, { useState } from 'react';
import * as S from './upstream-creation.style';
import { Radio, RadioChangeEvent } from 'antd';
import { useAppDispatch } from '../../../context';
import { useTr } from '@oxygen/translation';
import { RADIO_GROUP_NAME } from '../../../utils/consts';

export const UpstreamCreation = () => {
  const state = useState();
  const dispatch = useAppDispatch();
  const [t] = useTr();

  const [value, setValue] = useState(RADIO_GROUP_NAME.SELECT);

  const onRadioChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  return (
    <S.UpstreamCreationContainer>
      <S.BorderBox>
        <Radio.Group onChange={onRadioChange} value={value}>
          <Radio value={RADIO_GROUP_NAME.SELECT}>{t('upstream_tab.upstream_selection')}</Radio>
          <Radio value={RADIO_GROUP_NAME.CREATE}>{t('upstream_tab.create_upstream')}</Radio>
        </Radio.Group>
        <></>
      </S.BorderBox>
    </S.UpstreamCreationContainer>
  );
};
