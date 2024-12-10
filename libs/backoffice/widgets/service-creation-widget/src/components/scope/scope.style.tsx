import { Radio as AntRadio } from 'antd';
import { Table as KitTable } from '@oxygen/ui-kit';
import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

export const Radios = styled(AntRadio.Group)`
  margin-bottom: 2.4rem;
`;

export const Radio = styled(AntRadio)`
  font-size: 1.2rem;
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const Table = styled(KitTable)`
  margin-top: 4rem;
`;

export const TrashIcon = styled.i`
  font-size: 2.4rem;
`;
