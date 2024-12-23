import styled from 'styled-components';

export const DatePickerContainer = styled.div`
  & .ant-picker {
    min-height: 4rem;
  }

  & .anticon {
    font-size: 2.4rem;
  }

  & .ant-picker-suffix {
    position: absolute;
    margin: 0;
    right: 0;
  }

  & .ant-picker-clear {
    position: absolute;
    /* left: 0; */
    width: fit-content;
  }

  & .ant-picker-input {
    input {
      /* margin-left: 4rem; */
    }
  }
`;
