import { useState } from 'react';
import { Flex } from 'antd';
import { useTr } from '@oxygen/translation';
import { Button } from '@oxygen/ui-kit';
import * as S from './item-not-found.style';
export type ItemNotFoundProps = {
  title: string;
  buttonText: string;
  buttonHref: string;
};
const ItemNotFound: React.FC<ItemNotFoundProps> = ({ buttonText, title, buttonHref }) => {
  const [t] = useTr();
  const [loading, setLoading] = useState(false);
  return (
    <Flex vertical gap={'2rem'} justify='center' align='center'>
      <Flex justify='center' align='center' gap={'1rem'}>
        <S.TickIcon className='icon-tick-circle-outlined'> </S.TickIcon>
        <S.StyledText>{title}</S.StyledText>
      </Flex>
      <Button
        href={buttonHref}
        style={{ width: 'fit-content' }}
        block={false}
        color='secondary'
        icon={<i className='icon-plus' style={{ fontSize: '2rem' }} />}
        onClick={() => setLoading(true)}
        loading={loading}
      >
        {buttonText}
      </Button>
    </Flex>
  );
};
export default ItemNotFound;
