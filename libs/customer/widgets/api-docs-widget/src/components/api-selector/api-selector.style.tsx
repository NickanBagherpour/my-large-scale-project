import styled from 'styled-components';
import { breakpoints, cssVar, respondTo } from '@oxygen/utils';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 4rem;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  //direction: rtl;
  z-index: 10;
  position: sticky;
  top: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const HeaderTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  color: ${(p) => p.theme.primary.main};
  display: flex;
  align-items: center;
  gap: 1.5rem;
  a {
    display: flex;
  }
  ${respondTo.down('md')} {
    span {
      display: none;
    }
  }
  //margin-left: 1.5rem;
  //font-family: var(${cssVar.iransansFont}), system-ui, sans-serif;
`;

export const SelectWrapper = styled.div`
  ${respondTo.up('md')} {
    .ant-select-selector {
      min-width: 180px;
    }
  }
  //margin-right: auto;

  div.ant-select-selector {
    font-size: 1.2rem;

    span.ant-select-selection-wrap {
      padding: 1rem;
    }
  }
`;
