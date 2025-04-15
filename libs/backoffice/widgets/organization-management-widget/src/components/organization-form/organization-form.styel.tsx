import { cssVar } from '@oxygen/utils';
import styled from 'styled-components';
import { Card as AntCatd } from 'antd';
import { Button, Divider as KitDivider, Dropdown, Input as KitInput } from '@oxygen/ui-kit';

export const OrganizationFormContainer = styled.div``;
export const TitleContainer = styled.div`
  padding: 1rem 0.8rem;
  margin: 3.2rem 0 1.6rem 0;
`;
export const TitleText = styled.p`
  margin: 0;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2.5rem; /* 156.25% */
`;
export const BorderedContainer = styled.div`
  border: 1px solid ${(p) => p.theme.border._300};
  border-radius: var(${cssVar.radiusLg});
`;

export const Card = styled(AntCatd)`
  padding: 1.6rem;

  .ant-card-body {
    padding: 0;
  }
`;
export const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.6rem;
`;
export const Input = styled(KitInput)``;
export const Divider = styled(KitDivider)`
  margin: 3.6rem 0;
`;
