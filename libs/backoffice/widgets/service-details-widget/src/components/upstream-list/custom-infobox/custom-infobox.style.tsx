import { cssVar, respondTo } from '@oxygen/utils';
import styled from 'styled-components';

export const InfoboxContainer = styled.div`
  background-color: ${(p) => p.theme.background._50};
  border: 1px solid ${(p) => p.theme.border._100};
  border-radius: var(${cssVar.radius});
  min-height: 10rem;
  padding: 1.6rem 3rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  align-items: center;
  button {
    width: 16rem;
    ${respondTo.down('sm')} {
      width: 100%;
    }
  }

  ${respondTo.down('sm')} {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export const TrashIcon = styled.i`
  font-size: 2rem;
`;
export const Lable = styled.p`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: ${(p) => p.theme.text.primary};
  display: block;
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;
export const Container = styled.div`
  background-color: ${(p) => p.theme.background._50};
  border: 1px solid ${(p) => p.theme.border._100};
  border-radius: var(${cssVar.radius});
  min-height: 10rem;
  padding: 1.6rem 3rem;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
`;
