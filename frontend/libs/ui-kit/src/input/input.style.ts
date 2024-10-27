import styled from 'styled-components';
import { Input as AntInput } from 'antd';

export const InputWrapper = styled<any>(AntInput)`
  line-height: 0;

  // border-color: ${(p) => p.theme.border};

  .ant-input-prefix {
    padding-right: 0.8rem;
    padding-left: 0.5rem;
  }

  .ant-input-suffix {
    padding-right: 0.5rem;
    padding-left: 0.8rem;
  }

  & .ant-input-group-addon {
    padding-left: 6px;
    padding-right: 6px;
    font-size: 1.2rem;
  }
`;

export const PasswordWrapper = styled<any>(AntInput.Password)``;

export const TextAreaWrapper = styled<any>(AntInput.TextArea)``;

export const SearchWrapper = styled<any>(AntInput.Search)``;

export const GroupWrapper = styled<any>(AntInput.Group)``;

export const InputMoneyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //flex-wrap: wrap;
`;
