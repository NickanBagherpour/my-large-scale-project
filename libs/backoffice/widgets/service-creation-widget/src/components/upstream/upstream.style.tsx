import { respondTo } from '@oxygen/utils';
import { Radio as AntRadio } from 'antd';
import styled from 'styled-components';

export const Radios = styled(AntRadio.Group)`
  margin-bottom: 2.4rem;
`;

export const Radio = styled(AntRadio)`
  font-size: 1.2rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem 1.6rem;

  ${respondTo.down('xxl')} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${respondTo.down('xl')} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${respondTo.down('lg')} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${(p) => p.theme.text.primary};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block: 2.85rem 2.65rem;
`;

export const PlusIcon = styled.i`
  font-size: 1.8rem;
`;

export const TrashIcon = styled.i`
  font-size: 1.8rem;
  color: ${(p) => p.theme.error.main};
`;
