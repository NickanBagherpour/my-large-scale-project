import styled, { css } from 'styled-components';
import { Input as AntInput } from 'antd';

function getSize(p: any) {
  switch (p.size) {
    case 'large':
      return css`
        height: 40px;
      `;
    case 'middle':
      return css`
        height: 32px;
      `;
    case 'small':
      return css`
        height: 24px;
      `;
  }
}

export const InputWrapper = styled(AntInput)`
  ${(p) => getSize(p)};

  .ant-input-prefix {
    padding-right: 0.8rem;
    padding-left: 0.5rem;

    i {
      color: ${(props) => props.theme.text.tertiary};
    }
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

  &,
  & .ant-input-number-group-addon {
    font-size: 1.4rem;
  }
`;

export const PasswordWrapper = styled(AntInput.Password)``;

export const OTPWrapper = styled(AntInput.OTP)``;

export const TextAreaWrapper = styled(AntInput.TextArea)``;

export const SearchWrapper = styled(AntInput.Search)``;

export const GroupWrapper = styled(AntInput.Group)``;

export const InputMoneyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //flex-wrap: wrap;
`;
export const SubtitleText = styled.p`
  font-weight: 500;
  font-size: 1.8rem;
  color: ${(p) => p.theme.text.primary};
`;
