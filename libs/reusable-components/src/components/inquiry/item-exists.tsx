import { useRouter } from 'next/navigation';
import { Fragment, JSX, ReactElement, RefObject } from 'react';
import { Flex, FormInstance, InputRef } from 'antd';

import { useTr } from '@oxygen/translation';
import { Button, MarkText } from '@oxygen/ui-kit';
import { getValueOrDash } from '@oxygen/utils';

import { InquiryType } from './types';
import WithBadge from '../with-badge/with-badge';
import { useAppTheme } from '@oxygen/hooks';
import * as S from './item-exists.style';

export type ItemExistsProps = {
  form?: FormInstance<{
    name: string;
  }>;
  changeShowSearching?: () => void;
  inputRef?: RefObject<InputRef | null>;
  data?: (string | number | undefined)[];
  titles?: string[];
  message?: string;
  buttonInfo?: {
    title: string;
    icon?: JSX.Element;
    action?: () => void;
  };
};

const ItemExists: React.FC<ItemExistsProps> = ({
  form,
  changeShowSearching,
  inputRef,
  data,
  buttonInfo,
  titles,
  message,
}) => {
  const [t] = useTr();
  const theme = useAppTheme();
  const inspectAnother = () => {
    form?.resetFields();
    changeShowSearching?.();
    inputRef?.current?.focus();
  };

  return (
    <Flex vertical gap={'3rem'} justify='center' align='center'>
      <S.TitleContainer>
        <i className='icon-box-search' style={{ fontSize: '2.2rem' }} />
        <S.StyledText>{message}</S.StyledText>
      </S.TitleContainer>
      <Flex justify='center' gap={'1rem'} style={{ width: '100%', direction: 'inherit' }}>
        {/* <S.Partition style={{ justifyContent: 'end' }}>  */}
        {titles?.map((item, index) => (
          <Fragment key={item}>
            <div style={{ flex: '1 1 0%', direction: 'ltr' }}>
              <S.InfoTitle>{item}</S.InfoTitle>
              {typeof data?.[index] === 'object' ? (
                <S.CenteredText>
                  <WithBadge
                    items={data?.[index]}
                    onRender={(value) => (
                      <MarkText
                        text={getValueOrDash(value, '')}
                        highlightColor={theme.secondary.main}
                        wordToHighlight=''
                      />
                    )}
                  />
                </S.CenteredText>
              ) : (
                <S.CenteredText>{getValueOrDash(data?.[index])}</S.CenteredText>
              )}
            </div>
            {/* {index === 1 && <S.StyledDivider orientation='center' type='vertical' variant='solid' />} */}
          </Fragment>
        ))}
      </Flex>
      <Flex justify='center'>
        <Button
          style={{ width: 'fit-content' }}
          block={false}
          icon={buttonInfo?.icon}
          variant='outlined'
          onClick={buttonInfo?.action ?? inspectAnother}
        >
          {buttonInfo?.title}
        </Button>
      </Flex>
    </Flex>
  );
};
export default ItemExists;
