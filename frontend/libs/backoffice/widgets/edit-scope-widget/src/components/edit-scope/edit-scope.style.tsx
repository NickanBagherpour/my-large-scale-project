import styled from 'styled-components';
import { respondTo } from '@oxygen/utils';

export const EditScopeContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  .form_wrapper {
    display: flex;
    margin: 2.4rem 0;
    flex-direction: column;
    flex: 1;
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-top: 1px solid ${(p) => p.theme.border.main};
    gap: 1rem;
    padding: 1.5rem 0;

    ${respondTo.down('sm')} {
      flex-direction: column;

      button {
        width: 100%;

        &:first-of-type {
          order: 1;
        }
      }
    }
  }
`;
