import { useTr } from '@oxygen/translation';
import { Collapse, type CollapseProps } from 'antd';
import * as S from './faq.style';

export default function Faq() {
  const [t] = useTr();

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: t('how_much_it_costs'),
      children: t('oxygen_features'),
    },
    {
      key: '2',
      label: t('what_features_offers'),
      children: t('oxygen_features'),
    },
    {
      key: '3',
      label: t('could_be_used_in_production'),
      children: t('oxygen_features'),
    },
    {
      key: '4',
      label: t('how_much_sandbox_costs'),
      children: t('oxygen_features'),
    },
    {
      key: '5',
      label: t('what_is_sandbox'),
      children: t('oxygen_features'),
    },
  ];

  return (
    <S.Container>
      <S.Title>{t('faq')}</S.Title>
      <Collapse
        accordion
        items={items}
        bordered={false}
        expandIconPosition='end'
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => (
          <S.Expand>
            <S.ExpandIcon className='icon-arrow-up' rotate={!!isActive} />
          </S.Expand>
        )}
      />
    </S.Container>
  );
}
