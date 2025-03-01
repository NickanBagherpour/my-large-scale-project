'use client';
import { TextPalette } from '@oxygen/types';
import { Flex } from 'antd';
import { useTr } from '@oxygen/translation';
import * as S from './inner-status-card.style';
type Props = {
  backgroundColor?: keyof TextPalette;
  activeNumber?: number;
  deactiveNumber?: number;
};
const InnerStatusCard: React.FC<Props> = ({ backgroundColor, activeNumber, deactiveNumber }) => {
  const [t] = useTr();
  return (
    <S.Container $backgroundColor={backgroundColor}>
      <Flex gap={20}>
        <Flex align='center' gap={10}>
          <S.ActiveFlag />
          <span>{activeNumber}</span>
        </Flex>
        <Flex align='center' gap={10}>
          <S.DeactiveFlag />
          <span>{deactiveNumber}</span>
        </Flex>
      </Flex>
    </S.Container>
  );
};
export default InnerStatusCard;
