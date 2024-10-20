import styled from 'styled-components';
import { Card, CardProps } from 'antd';

type StyledCardProps = CardProps & {
  disabled: boolean;
};

export const StyledCard = styled(Card)<StyledCardProps>`
  border-radius: 1.2rem;
  border: 1px solid ${(props) => props.theme.border._300};
  background: ${(props) => props.theme.primary._50};
  min-width: 22.8rem;
  max-width: 40rem;
  min-height: 10rem;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')}; // Disable interactions

  & .ant-card-body {
    padding: 0.8rem 1rem;
  }

  & .icon-setting {
    font-size: 3rem;
    color: ${(props) => (props.disabled ? props.theme.iconPrimary : props.theme.primary.main)};
    align-self: flex-end;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  justify-content: flex-start;
  flex-grow: 1;
`;

export const TitleContainer = styled.div`
  display: flex;
  gap: 1.8rem;
  justify-content: space-between;
  align-items: baseline;
`;

export const Title = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
`;
