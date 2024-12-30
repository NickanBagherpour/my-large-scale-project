import styled, { css } from 'styled-components';
import { looperGroup } from '../../assets';
import { respondTo } from '@oxygen/utils';
import { Button as UiKitButton } from '@oxygen/ui-kit';

// Helper to generate dynamic color styles
const colorStyles = (color: ColorType | undefined, theme: any) =>
  ({
    warning: theme.warning.main,
    error: theme.error.main,
    success: theme.success.main,
    default: theme.text.tertiary,
  }[color || 'default'] || 'black');

// Shared Icon Styles
const IconStyles = css`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10rem;
  height: 4rem;
  width: 4rem;

  i {
    color: ${(p) => p.theme.onPrimary};
    font-size: 2.4rem;
    z-index: 100;
  }
`;

//Type
export type ColorType = 'warning' | 'error' | 'success' | 'default';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  margin: 2rem 0 3rem 0;
  padding: 0 1.2rem;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.2rem;
  color: ${(p) => colorStyles(p.color || 'default', p.theme)};

  span {
    color: inherit;
    font-size: 1.4rem;
    font-weight: 700;
  }
`;

export const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  ${respondTo.down('sm')} {
    flex-direction: column;
  }
`;

export const Status = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 10rem;
`;
export const Details = styled.div`
  width: 100%;
  align-items: flex-end;
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
export const IconTop1 = styled.div<{ color: ColorType }>`
  position: absolute;
  top: 0;
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
    z-index: 100;
  }
`;

// Status Icons
export const IconTop = styled.div<{ color?: ColorType }>`
  background-color: ${(p) => colorStyles(p.color, p.theme)};
  ${IconStyles}
  top: 0;
`;

export const IconButtom = styled.div<{ color?: ColorType }>`
  background-color: ${(p) => colorStyles(p.color, p.theme)};
  ${IconStyles}
  bottom: 0;
`;

export const IconButtom1 = styled.div<{ color: ColorType }>`
  position: absolute;
  bottom: 0;
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
    z-index: 100;
  }
`;

export const LineUp = styled.div<{ color: ColorType }>`
  position: absolute;
  top: 0;
  margin-left: 1.9rem;
  background-color: ${(p) => colorStyles(p.color, p.theme)};
  width: 2px;
  height: 50%;
`;

export const LineDown = styled.div<{ color: ColorType }>`
  position: absolute;
  bottom: 0;
  margin-left: 1.9rem;
  background-color: ${(p) => colorStyles(p.color, p.theme)};
  width: 2px;
  height: 50%;
`;

export const Paragraph = styled.p`
  color: ${(p) => p.theme.text.tertiary};
  text-align: left;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.2rem;
  margin: 1rem 0 1rem 5rem;
`;
export const StatusContainer = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  display: flex;
`;
