import { Flex } from 'antd';

import { Button } from '@oxygen/ui-kit';

import * as S from './item-exists-in-BAAM.style';

export type ExistsInBamProps = {
  itemName?: string;
  dispatch?: any;
  message?: string;
  buttonText?: string;
  buttonAction?: () => void;
  buttonLoading?: boolean;
};
const ItemExistsInBAAM: React.FC<ExistsInBamProps> = ({ buttonLoading, message, buttonText, buttonAction }) => {
  return (
    <Flex vertical gap={'2rem'} justify='center' align='center'>
      <Flex justify='center' align='center' gap={'1rem'}>
        <S.TickIcon className='icon-tick-circle-outlined'> </S.TickIcon>
        <S.StyledText>{message}</S.StyledText>
      </Flex>
      <Button
        style={{ width: 'fit-content' }}
        block={false}
        color='primary'
        icon={<i className='icon-arrow-left' />}
        iconPosition='end'
        onClick={buttonAction}
        loading={buttonLoading}
      >
        {buttonText}
      </Button>
    </Flex>
  );
};
export default ItemExistsInBAAM;
