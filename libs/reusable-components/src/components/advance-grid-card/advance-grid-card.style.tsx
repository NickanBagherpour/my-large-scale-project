import styled from 'styled-components';
import { looperGroup, looper } from '../../assets';
import { cssVar, respondTo } from '@oxygen/utils';
import { Button as UiKitButton } from '@oxygen/ui-kit';

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
export const Discription = styled.div<{ color?: 'warning' | 'error' | 'success' | 'default' }>`
  margin-bottom: 3rem;

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
  background-color: green;
`;
export const Details = styled.div`
  width: 100%;
  background-color: blue;
`;
export const Divider = styled.div`
  width: 100%;
  background-color: #720563;
  display: flex;
  flex-direction: row;
  ${respondTo.down('sm')} {
    flex-direction: column;
  }
`;
