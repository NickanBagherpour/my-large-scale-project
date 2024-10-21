'use client';

import styled from 'styled-components';

const Div = styled.div`
  //margin-left: 2rem;
  background-color: ${(props) => props.theme.background._100};
  width: 100%;
  height: 90vh;
`;

export default function Index() {
  return <Div className='wrapper'>Hello from profile user!</Div>;
}
