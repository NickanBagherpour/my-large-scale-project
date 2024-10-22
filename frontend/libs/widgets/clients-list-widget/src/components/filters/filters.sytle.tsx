import styled from 'styled-components';
import { Input as KitInput } from '@oxygen/ui-kit';
import { Radio } from 'antd';
import { respondTo } from '@oxygen/utils';

export const Container = styled.section`
  margin-bottom: 4rem;
  margin-top: 2.8rem;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  margin-bottom: 2.3rem;

  ${respondTo.down('lg')} {
    flex-direction: column;
    gap: 2rem;
  }
`;

export const Chips = styled.div`
  display: flex;
  align-items: center;

  ${respondTo.down('sm')} {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  ${respondTo.down('lg')} {
    width: 100%;
    justify-content: space-between;
  }
`;

export const Indicators = styled.div`
  display: flex;
  align-items: center;

  ${respondTo.down('lg')} {
    flex-direction: column;
    gap: 2rem;
  }
`;

export const Input = styled(KitInput)`
  max-width: 50.4rem;
  margin-inline-end: auto;

  ${respondTo.down('lg')} {
    max-width: 100%;
    font-size: 1.7rem;
  }
`;

export const RadioGroup = styled(Radio.Group)`
  margin-inline-start: auto;

  ${respondTo.down('lg')} {
    margin-inline-start: 0;
  }
`;
