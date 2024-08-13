import styled from '@emotion/styled';

export const OverLay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ModalWrapper = styled.div<any>`
  position: relative;
  min-width: 10rem;
  min-height: 10rem;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  overflow: hidden;
  outline: none;
  padding: 0;
  margin: 0;
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  background-color: ${(props) => props.theme.base.surface};
`;
