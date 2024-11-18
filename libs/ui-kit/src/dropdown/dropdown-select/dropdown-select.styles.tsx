import styled from 'styled-components';
import { Space } from 'antd';

export const DropdownSelectContainer = styled.div<{ error: boolean }>`
  display: flex;
  flex-wrap: wrap;
  row-gap: 1.6rem;
  //margin:1rem 0;

  & .dropdown-button {
    border-color: ${(props) => (props.error ? props.theme.error.main : props.theme.border._500)};
    font-size: 1.4rem;
    font-weight: 500;
    padding: 0.8rem 1.6rem;

    &.ant-btn {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    & i {
      font-size: 1.8rem;
      transition: transform 0.3s ease-in-out;

      &.select-open {
        animation: rotate180steps 0.3s ease-in-out;
        transform: rotate(180deg);
      }

      @keyframes rotate180steps {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(180deg);
        }
      }
    }
  }
`;

export const StyledIcon = styled('i')`
  transition: transform 0.3s ease-in-out;

  &.select-open {
    animation: rotate180steps 0.3s ease-in-out;
    transform: rotate(180deg);
  }

  @keyframes rotate180steps {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(180deg);
    }
  }
`;

export const DropdownContainer = styled.div`
  & .ant-dropdown-menu-root {
    min-width: 30rem;
    max-width: 45rem;
    max-height: 30rem;
    box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.3);
  }

  & .ant-dropdown-menu-item {
    padding: 1.2rem 1.6rem 1.2rem 2.4rem;
    border-radius: 0.8rem;

    &:not(:last-child):not(:first-child) {
      margin-bottom: 0.8rem;
    }
  }

  & .ant-dropdown-menu-item-divider {
    background-color: ${(props) => props.theme.border._300};
    margin: 0.8rem 0.4rem;
  }

  & label span:last-of-type {
    font-size: 1.6rem;
    line-height: 2.5rem;
  }

  & .ant-checkbox-inner {
    width: 1.8rem; /* Desired width */
    height: 1.8rem; /* Desired height */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & .ant-checkbox-checked .ant-checkbox-inner::after {
    width: 0.5rem; /* Adjust tick size */
    height: 1.2rem; /* Adjust tick size */
  }

  //& .ant-checkbox-wrapper span:last-of-type{
  //  text-overflow: ellipsis;
  //  overflow: hidden;
  //  white-space: nowrap;
  //  max-width: 90%;
  //}

  & .ant-checkbox-checked {
    background-color: ${(props) => props.theme.background.main};
  }
`;

export const StyledSpace = styled(Space)`
  display: flex;
  flex-flow: row-reverse;
  gap: 0.8rem;
  align-items: center;
`;
