import { useRouter } from 'next/navigation';
import { Flex } from 'antd';

import { useTr } from '@oxygen/translation';
import { Button } from '@oxygen/ui-kit';

import { NAVIGATION_URLS } from './consts';
import { InquiryType } from './types';
import { useUploadItemMutation } from './upload-item.api';
import * as S from './item-exists-in-BAAM.style';

type Props = {
  itemName: string;
  type: InquiryType;
  dispatch: any;
};
const ItemExistsInBAAM: React.FC<Props> = ({ itemName, type, dispatch }) => {
  const [t] = useTr();
  const router = useRouter();
  const navigateToItemCreation = () => router.push(NAVIGATION_URLS[type] + `${itemName}`);
  const { mutate: uploadService, isPending } = useUploadItemMutation(navigateToItemCreation, dispatch);
  const handleClick = async () => {
    if (type === 'service') {
      uploadService(itemName);
    } else {
      navigateToItemCreation();
    }
  };
  const itemTranslation = { element: t(`element.${type}`) };
  return (
    <Flex vertical gap={'2rem'} justify='center' align='center'>
      <Flex justify='center' align='center' gap={'1rem'}>
        <S.TickIcon className='icon-tick-circle-outlined'> </S.TickIcon>
        <S.StyledText>{t('uikit.allowed_creation_BAAM', itemTranslation)}</S.StyledText>
      </Flex>
      <Button
        style={{ width: 'fit-content' }}
        block={false}
        color='primary'
        icon={<i className='icon-arrow-left' />}
        iconPosition='end'
        onClick={handleClick}
        loading={isPending}
      >
        {t('button.create_new_item', itemTranslation)}
      </Button>
    </Flex>
  );
};
export default ItemExistsInBAAM;
