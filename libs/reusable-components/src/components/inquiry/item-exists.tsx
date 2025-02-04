import { useRouter } from 'next/navigation';
import { RefObject } from 'react';
import { Flex, FormInstance, InputRef } from 'antd';

import { useTr } from '@oxygen/translation';
import { Button } from '@oxygen/ui-kit';
import { getValueOrDash, ROUTES } from '@oxygen/utils';

import { ContentType } from './inquiry-component';
import { InquiryType } from './types';
import * as S from './item-exists.style';

type Props = {
  form: FormInstance<{
    name: string;
  }>;
  changeContent: (c: ContentType) => void;
  inputRef: RefObject<InputRef>;
  data?: string[];
  type: InquiryType;
  itemName: string;
};

const ItemExists: React.FC<Props> = ({ form, changeContent, inputRef, data, type, itemName }) => {
  const [t] = useTr();
  const router = useRouter();
  const inspectAnother = () => {
    form.resetFields();
    changeContent('searching');
    inputRef.current?.focus();
  };
  const titles: Record<InquiryType, string[]> = {
    service: [
      t('uikit.en_service_name'),
      t('uikit.desc'),
      t('uikit.element_en_name', { element: t('element.scope') }),
      t('uikit.element_fa_name', { element: t('element.scope') }),
    ],
    client: [
      t('uikit.organization_name'),
      t('uikit.organization_id'),
      t('uikit.aggrigator_status'),
      t('uikit.representative_name'),
    ],
  };
  const buttonInfo = {
    service: {
      title: t('button.inspect_another_service'),
      icon: <i className='icon-reload' />,
      action: inspectAnother,
    },
    client: {
      title: t('observe_client_detail'),
      icon: <i className='icon-document' />,
      action: () => {
        router.push(ROUTES.BACKOFFICE.CLIENT_DETAILS + `?client-name=${itemName}`);
      },
    },
  };
  return (
    <Flex vertical gap={'3rem'} justify='center' align='center'>
      <S.TitleContainer>
        <i className='icon-box-search' style={{ fontSize: '2.2rem' }} />
        <S.StyledText>{t('uikit.item_already_exists', { element: t(`element.${type}`) })}</S.StyledText>
      </S.TitleContainer>
      <Flex justify='center' gap={'1rem'} style={{ width: '100%' }}>
        {/* <S.Partition style={{ justifyContent: 'end' }}>  */}
        {titles[type].map((item, index) => (
          <>
            <div style={{ flex: '1 1 0%' }}>
              <S.InfoTitle>{item}</S.InfoTitle>
              <S.CenteredText>{getValueOrDash(data?.[index])}</S.CenteredText>
            </div>
            {index === 1 && <S.StyledDivider orientation='center' type='vertical' variant='solid' />}
          </>
        ))}
      </Flex>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          style={{ width: 'fit-content' }}
          block={false}
          icon={buttonInfo[type].icon}
          variant='outlined'
          onClick={buttonInfo[type]?.action}
        >
          {buttonInfo[type].title}
        </Button>
      </div>
    </Flex>
  );
};
export default ItemExists;
