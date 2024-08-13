import styled from '@emotion/styled';

export const StyledContainer = styled.div<any>`
  display: flex;
  flex-direction: column;
  // width: 100%;
  padding: 1rem 1.2rem 1rem 1.2rem;
  border: 1px solid transparent;
  border-radius: 0.3rem;
  box-sizing: content-box;
  font-size: 1.4rem;
  font-weight: 500;

  .message-box-container__top-row {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 1.3rem;
    .message-box-container__top-row__title {
      /*      font-size: 1.4rem;
      font-weight: 500;
      color: #555555;*/
      margin: 0.3rem 0;
    }
  }

  .message-box-container__clickable-item {
    cursor: pointer;
    color: ${(p) => p.theme.base.info};
  }

  .message-box-container__link-container {
    width: max-content;
    margin: 0.2rem 2.7rem 0 2.7rem !important;
    font-size: 1.4rem;
    font-weight: 500;
    display: flex;
    align-items: stretch;
    text-decoration: none;

    span {
      height: 1rem;

      .MuiSvgIcon-root {
        font-size: 2rem;
      }

      //padding: 0 2px;
      //margin-top: 0.4rem;
    }
  }
`;
