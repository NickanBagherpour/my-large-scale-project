import { useState } from 'react';
import { Flex } from 'antd';
import { useTr } from '@oxygen/translation';
import { Button } from '@oxygen/ui-kit';
import { InquiryType } from './types';
import { NAVIGATION_URLS } from './consts';
import * as S from './item-not-found.style';
type Props = {
  itemName: string;
  type: InquiryType;
};
const ItemNotFound: React.FC<Props> = ({ itemName, type }) => {
  const [t] = useTr();
  const [loading, setLoading] = useState(false);
  const itemTranslation = { element: t(`element.${type}`) };
  return (
    <Flex vertical gap={'2rem'} justify='center' align='center'>
      <Flex justify='center' align='center' gap={'1rem'}>
        <S.TickIcon className='icon-tick-circle-outlined'> </S.TickIcon>
        <S.StyledText>{t('uikit.allowed_creation', itemTranslation)}</S.StyledText>
      </Flex>
      <Button
        href={NAVIGATION_URLS[type] + `${itemName}`}
        style={{ width: 'fit-content' }}
        block={false}
        color='secondary'
        icon={<i className='icon-plus' />}
        onClick={() => setLoading(true)}
        loading={loading}
      >
        {t('button.create_new_item', itemTranslation)}
      </Button>
    </Flex>
  );
};
export default ItemNotFound;
