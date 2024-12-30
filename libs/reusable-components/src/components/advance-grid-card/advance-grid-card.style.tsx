import styled from 'styled-components';
import { looperGroup, looper } from '../../assets';
import { cssVar, respondTo } from '@oxygen/utils';
import { Button as UiKitButton } from '@oxygen/ui-kit';

//Type
type ColorType = 'warning' | 'error' | 'success' | 'default';

export const Container = styled.div`
  border-radius: 1.8rem;
  padding: 3rem 4rem;
  border: ${(p) => `1px solid ${p.theme.border._300}`};

  transition: all 200ms;
  overflow: hidden;
  background-image: url('${looperGroup}');
  background-size: cover;
  background-repeat: no-repeat;
  /*! @noflip */
  background-position: right bottom;
`;

export const Button = styled(UiKitButton)`
  width: 100%;
`;
export const Discription = styled.div<{ color?: ColorType }>`
  margin-bottom: 3rem;
  padding: 0 1.2rem;

  span {
    color: inherit;
    font-size: 1.4rem;
    font-weight: 700;
  }

  color: ${(p) =>
    ({
      warning: p.theme.warning.main,
      error: p.theme.error.main,
      success: p.theme.success.main,
      default: p.theme.text.tertiary,
    }[p.color || 'default'] || 'black')};
`;

export const Status = styled.div`
  width: 100%;
`;
export const Details = styled.div`
  width: 100%;
  align-items: flex-end;
`;
export const Divider = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  ${respondTo.down('sm')} {
    flex-direction: column;
  }
`;

export const Title = styled.p`
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2.5rem;
  margin: 0;
`;
export const SubTitle = styled.p`
  color: ${(p) => p.theme.text.tertiary};
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.2rem;
  min-height: 2.2rem;
  margin: 0.6rem 0 2rem 0;
`;
export const Date = styled.p`
  color: ${(p) => p.theme.text.tertiary};
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.8rem;
  margin: 0;
`;
export const ServiceCount = styled.p`
  color: ${(p) => p.theme.text.tertiary};
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.8rem;
  margin: 1.2rem 0;
`;
export const Icon = styled.div<{ color: ColorType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(p) =>
    ({
      warning: p.theme.warning.main,
      error: p.theme.error.main,
      success: p.theme.success.main,
      default: p.theme.text.tertiary,
    }[p.color || 'default'] || 'black')};
  border-radius: 10rem;
  height: 4rem;
  width: 4rem;
  i {
    color: ${(p) => p.theme.onPrimary};
    font-size: 2.4rem;
  }
`;
export const Line = styled.div<{ color: ColorType }>`
  margin-left: 1.8rem;
  background-color: ${(p) =>
    ({
      warning: p.theme.warning.main,
      error: p.theme.error.main,
      success: p.theme.success.main,
      default: p.theme.text.tertiary,
    }[p.color || 'default'] || 'black')};
  width: 2px;
  height: 2.5rem;
`;
export const Paragraph = styled.p`
  color: ${(p) => p.theme.text.tertiary};
  text-align: left;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.2rem;
  margin: 0;
`;
export const StatusContainer = styled.p`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;
