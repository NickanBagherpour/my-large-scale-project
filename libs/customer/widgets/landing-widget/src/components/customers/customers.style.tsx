import styled from 'styled-components';

export const Container = styled.section`
  margin-bottom: 16rem;
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
