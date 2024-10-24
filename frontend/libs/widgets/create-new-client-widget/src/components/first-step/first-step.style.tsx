import styled from 'styled-components';

export const FirtStepContainer = styled.div`
  .cards-title {
    font-weight: bold;
    font-size: 1.6rem;
  }

  .tag-input {
    border-right: 1px solid ${(p) => p.theme.border.main};
    display: flex;
    align-items: center;
    flex: 1;
    padding-right: 1rem;
  }

  .tags {
    width: max-content;
  }

  .seperator {
    margin-bottom: 1.6rem;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
