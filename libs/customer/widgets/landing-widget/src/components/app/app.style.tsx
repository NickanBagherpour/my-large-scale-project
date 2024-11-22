import styled from 'styled-components';
import looper from 'apps/customer-portal/public/assets/images/looper.svg';

export const WithBg = styled.div`
  background: ${(p) => p.theme.background._50};
  background-image: url(${looper});
  background-repeat: no-repeat;
  background-size: cover;
`;
