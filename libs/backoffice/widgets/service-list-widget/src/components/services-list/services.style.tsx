import Link from 'next/link';
import styled from 'styled-components';

import { MarkText, Switch } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';
import { Button } from '@oxygen/ui-kit';

export const TableContainer = styled.div`
  margin-bottom: 1.6rem;

  .row-number {
    font-size: 1.4rem;
  }
`;

export const Name = styled(MarkText)`
  //
`;

export const Scope = styled(MarkText)`
  //
`;

export const Url = styled.span`
  unicode-bidi: plaintext;
`;

export const Details = styled(Button)``;

export const Trash = styled.i`
  font-size: 2.4rem;
  color: ${(p) => p.theme.error.main};
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

export const SwitchContainer = styled.span`
  display: flex;
  justify-content: center;
`;
export const DesktopSwitch = styled(Switch)`
  display: block;
  ${respondTo.down('xl')} {
    display: none;
  }
`;
export const MiniDesktopSwitch = styled(Switch)`
  display: none;
  ${respondTo.down('xl')} {
    display: block;
  }
`;
export const DesktopSpan = styled.span`
  display: block;
  ${respondTo.down('xl')} {
    display: none;
  }
`;
