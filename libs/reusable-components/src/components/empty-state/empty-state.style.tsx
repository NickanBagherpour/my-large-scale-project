import styled from 'styled-components';

import { respondTo } from '@oxygen/utils';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const StyledText = styled.span`
  text-align: center;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 3.2rem;
  color: ${(props) => props.theme.text.secondary};
`;

export const ImgContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 48rem;
  aspect-ratio: 480 / 350;

  ${respondTo.down('lg')} {
    max-width: 40rem;
  }

  ${respondTo.down('md')} {
    max-width: 60%;
  }
`;
