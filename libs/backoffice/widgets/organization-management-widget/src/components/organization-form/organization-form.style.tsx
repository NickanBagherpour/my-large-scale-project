import { cssVar, respondTo } from '@oxygen/utils';
import styled from 'styled-components';
import { Card as AntCard } from 'antd';
import { Button, Divider as KitDivider, Dropdown, Input as KitInput, Alert } from '@oxygen/ui-kit';

export const OrganizationFormContainer = styled.div``;
export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 0.8rem;
  margin: 3.2rem 0 1.6rem 0;
`;
export const TitleText = styled.p`
  margin: 0;
  font-size: 1.6rem;
  font-weight: bold;
  line-height: 2.5rem; /* 156.25% */
`;
export const BorderedContainer = styled.div`
  border: 1px solid ${(p) => p.theme.border._300};
  border-radius: var(${cssVar.radiusLg});
`;

export const Card = styled(AntCard)`
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

export const AlertContainer = styled(Alert)`
  padding: 1.2rem 1.6rem;
  margin-bottom: 2.4rem;
  border: 0;

  .ant-alert-message {
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2.2rem;
  }

  .ant-alert-description {
    color: ${(p) => p.theme.primary._500};
  }
`;
export const Icon = styled.i`
  font-size: 2rem;
  color: ${(p) => p.theme.primary.main};
`;

export const Footer = styled.div`
  display: flex;
  margin-top: 2rem;
  height: 7.2rem;
  align-items: center;
  justify-content: end;
  border-top: 1px solid ${(p) => p.theme.border._100};
  gap: 1.2rem;

  ${respondTo.down('sm')} {
    Button {
      width: 100%;
    }
  }
`;
