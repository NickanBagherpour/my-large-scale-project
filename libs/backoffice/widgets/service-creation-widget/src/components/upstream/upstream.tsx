import Box from '../box/box';
import * as S from './upstream.style';
import { useTr } from '@oxygen/translation';
import { useState } from 'react';
import { Form, type RadioChangeEvent } from 'antd';
import { GridCard } from '@oxygen/reusable-components';
import { Button, ColumnsType, InfoBox, Input, SearchItemsContainer, Table } from '@oxygen/ui-kit';
import { UpstreamServer } from '@oxygen/types';
import FormItem from '../form-item/form-item';
import AddServerModal from '../add-server-modal/add-server-modal';
import { useToggle } from '@oxygen/hooks';
import RemoveServerModal from '../remove-server-modal/remove-server-modal';
import Footer from '../footer/footer';
import { previousStep, useAppDispatch } from '../../context';

export default function Upstream() {
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const [upstreamMode, setUpstreamMode] = useState<'chooseUpstream' | 'createUpstream'>('chooseUpstream');
  const [isAddServerModalOpen, toggleAddServerModal] = useToggle(false);
  const [isRemoveServerModalOpen, toggleRemoveServerModal] = useToggle(false);

  const onChange = (e: RadioChangeEvent) => {
    setUpstreamMode(e.target.value);
  };

  const onReturn = () => {
    previousStep(dispatch);
  };

  const desktopColumns: ColumnsType<UpstreamServer> = [
    {
      title: t('domain'),
      dataIndex: 'domain',
      align: 'center',
      render: (_val, _record, idx) => idx + 1,
    },
    {
      title: t('health_status'),
      dataIndex: 'healthStatus',
      align: 'center',
    },
    {
      title: t('weight'),
      dataIndex: 'weight',
      align: 'center',
    },
    ...(upstreamMode === 'createUpstream'
      ? [
          {
            key: 'remove',
            align: 'center' as any,
            render: () => (
              <Button variant='link' onClick={toggleRemoveServerModal}>
                <S.TrashIcon className='icon-trash' />
              </Button>
            ),
          },
        ]
      : []),
  ];

  const data: UpstreamServer[] = Array.from({ length: 4 }).map((_, idx) => ({
    idx,
    weight: '100',
    domain: '192.168.1.20',
    healthStatus: 'سالم',
  }));

  return (
    <>
      <S.Container>
        <Box>
          <S.Radios onChange={onChange} value={upstreamMode}>
            <S.Radio value={'chooseUpstream'}>{t('choose_upstream')}</S.Radio>
            <S.Radio value={'createUpstream'}>{t('create_upstream')}</S.Radio>
          </S.Radios>

          {upstreamMode === 'chooseUpstream' ? (
            <S.Grid>
              {Array.from({ length: 10 }).map((_, idx) => (
                <GridCard
                  key={idx}
                  href={'#'}
                  name={'API-SERVICES-UPSTREAM'}
                  activeServersCount={5}
                  wordToHighlight={''}
                  isSetting={false}
                  onClick={() => void 1}
                  className={'card'}
                  clickedCard={''}
                />
              ))}
            </S.Grid>
          ) : (
            <Form layout={'vertical'}>
              <SearchItemsContainer>
                <FormItem className='span-2' label={t('english_name')}>
                  <Input />
                </FormItem>
                <FormItem className='span-2' label={t('description')}>
                  <Input />
                </FormItem>
              </SearchItemsContainer>
            </Form>
          )}
        </Box>
        <Box>
          {upstreamMode === 'chooseUpstream' && (
            <InfoBox
              minColumnCount={2}
              margin={0}
              data={[
                { key: t('upstream_english_name'), value: 'SEJAM-UPSTREAM' },
                { key: t('upstream_description'), value: 'آپ‌استریم سجام' },
              ]}
            />
          )}

          <S.Header>
            <S.Title>{t('upstream_servers')}</S.Title>
            {upstreamMode === 'createUpstream' && (
              <Button color='secondary' onClick={toggleAddServerModal}>
                <S.PlusIcon className='icon-plus' />
                {t('add_server')}
              </Button>
            )}
          </S.Header>

          <Table columns={desktopColumns} dataSource={data} rowKey={(row) => row.idx} pagination={false} />
        </Box>

        <Footer onRegister={() => void 1} onReturn={onReturn} />
      </S.Container>
      <AddServerModal isOpen={isAddServerModalOpen} toggle={toggleAddServerModal} />
      <RemoveServerModal isOpen={isRemoveServerModalOpen} toggle={toggleRemoveServerModal} id={'samat-lc-gutr-del'} />
    </>
  );
}
