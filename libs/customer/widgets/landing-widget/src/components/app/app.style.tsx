import styled from 'styled-components';
import looper from 'apps/customer-portal/public/assets/images/looper.svg';

export const Main = styled.div`
  background: ${(p) => p.theme.background._50};
`;

export const WithBg = styled.div`
  background-image: url(${looper});
  background-repeat: none;
  background-size: cover;
`;
