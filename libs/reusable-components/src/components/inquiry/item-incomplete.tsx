import { Flex } from 'antd';
import { useTr } from '@oxygen/translation';
import { Button, Progress } from '@oxygen/ui-kit';
import { GeneralItemInfo, InquiryType } from './types';
import { NAVIGATION_URLS } from './consts';
import * as S from './item-incomplete.style';

type Props = {
  data?: GeneralItemInfo;
  type: InquiryType;
};
const ItemIncomplete: React.FC<Props> = ({ data, type }) => {
  const [t] = useTr();
  const progress = data?.progress ?? 0;
  return (
    <Flex vertical align='center' justify='center' gap={'2rem'}>
      <Flex align='center' gap={'1rem'}>
        <S.TickIcon className='icon-tick-circle-outlined' />
        <S.StyledText>{t('uikit.complete_item_info', { element: t(`element.${type}`) })}</S.StyledText>
      </Flex>
      <S.ServiceCompletenessBox>
        <S.ItemName>{data?.itemName}</S.ItemName>
        <Progress isPrimary={true} showInfo={false} percent={progress} />
        <S.Percent>{progress + '%'}</S.Percent>
      </S.ServiceCompletenessBox>
      <Button
        href={`${NAVIGATION_URLS[type]}${data?.itemName ?? ''}`}
        color='primary'
        style={{ width: 'fit-content', marginBottom: '2rem' }}
        icon={<i className='icon-arrow-left' />}
        iconPosition='end'
      >
        {t('button.complete_item_info', { element: t(`element.${type}`) })}
      </Button>
    </Flex>
  );
};
export default ItemIncomplete;
