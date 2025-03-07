import { Flex } from 'antd';
import { useTr } from '@oxygen/translation';
import { Button, Progress } from '@oxygen/ui-kit';
import { GeneralItemInfo } from './types';
import { NAVIGATION_URLS } from './consts';
import * as S from './item-is-draft.style';

export type IsDraftProps = {
  data?: GeneralItemInfo;
  buttonText?: string;
  message?: string;
  buttonHref?: string;
};
const ItemIsDraft: React.FC<IsDraftProps> = ({ data, buttonText, buttonHref, message }) => {
  const [t] = useTr();
  const progress = data?.progress ?? 0;
  return (
    <Flex vertical align='center' justify='center' gap={'2rem'}>
      <Flex align='center' gap={'1rem'}>
        <S.TickIcon className='icon-tick-circle-outlined' />
        <S.StyledText>{message}</S.StyledText>
      </Flex>
      <S.ServiceCompletenessBox>
        <S.ItemName>{data?.itemName}</S.ItemName>
        <Progress isPrimary={true} showInfo={false} percent={progress} />
        <S.Percent>{progress + '%'}</S.Percent>
      </S.ServiceCompletenessBox>
      <Button
        href={buttonHref}
        color='primary'
        style={{ width: 'fit-content', marginBottom: '2rem' }}
        icon={<i className='icon-arrow-left' />}
        iconPosition='end'
      >
        {buttonText}
      </Button>
    </Flex>
  );
};
export default ItemIsDraft;
