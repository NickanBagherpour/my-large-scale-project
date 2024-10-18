import React, { ReactNode } from 'react';

import styled from 'styled-components';

const StyledSectionLabel = styled.div<any>`
  font-size: 1.4rem;
  font-weight: 500;
  //padding: 2rem 1.6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.8rem;
  color: ${(p) => p.theme.base.primary};
  margin-top: 3.2rem;
  margin-bottom: 1.2rem;

  & > i {
    font-size: 2.4rem;
  }
`;

type SectionLabelProps = {
  label?: ReactNode;
  icon?: ReactNode;
};

const SectionLabel = (props: SectionLabelProps) => {
  return (
    <StyledSectionLabel>
      {props?.icon ? props?.icon : <i className={'icon-bill'} />}
      <span>{props?.label}</span>
    </StyledSectionLabel>
  );
};

export default SectionLabel;
