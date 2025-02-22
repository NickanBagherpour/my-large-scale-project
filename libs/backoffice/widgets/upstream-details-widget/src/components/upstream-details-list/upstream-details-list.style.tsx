import styled from 'styled-components';
import { Button, MarkText } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';

export const ServerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 1rem;
  background-color: ${(props) => props.theme.onPrimary};
  padding: 1.6rem;
  border-radius: 1.6rem;

  & tbody > tr > td:last-child {
    width: 25rem;

    ${respondTo.down('lg')} {
      width: 20rem;
    }

    ${respondTo.down('md')} {
      & i {
        margin-left: 2rem;
      }
    }
  }
`;

export const ServerContent = styled.div`
  flex-grow: 1;
`;

export const TableContainer = styled.div`
  //
`;

export const Name = styled(MarkText)`
  //
`;

export const Scope = styled(MarkText)`
  //
`;

export const Url = styled.a`
  color: ${(p) => p.theme.primary._500};
`;

export const Details = styled.a`
  color: ${(p) => p.theme.primary.main};
`;

export const TrashButton = styled(Button)`
  padding: 0;

  & i {
    font-size: 2.4rem;
  }
`;

export const EditButton = styled(Button)`
  font-weight: 500;
  width: fit-content;
  padding: 0;
`;

export const MobileTableItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.text.secondary};

  margin-bottom: 1rem;

  .item__title {
    max-width: 10rem;
  }

  .item__value {
    font-weight: 400;
  }
`;

export const UpstreamServerTitle = styled.span`
  font-size: 1.6rem;
  line-height: 2.5rem;
  font-weight: 500;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  margin-bottom: 2.3rem;
`;

export const TableRow = styled.div`
  display: flex;
  flex-direction: column;
`;
