import { respondTo } from '@oxygen/utils';
import styled from 'styled-components';

export const Container = styled.section`
  margin-bottom: 16rem;
`;

export const ImgContainer = styled.div`
  position: relative;
  aspect-ratio: 9 / 4;

  ${respondTo.down('lg')} {
    aspect-ratio: 9 / 6;
  }
`;
