import styled from 'styled-components';
import { SectionTitle } from '../section-title/section-title.style';

export const Container = styled.section`
  margin-bottom: 16rem;

  & .slick-slide > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Title = styled(SectionTitle)`
  margin-bottom: 8rem;
`;

export const ImgContainer = styled.div`
  position: relative;
  height: 8rem;
  width: auto;
  max-width: 12rem;

  & img {
    object-fit: contain;
  }
`;
