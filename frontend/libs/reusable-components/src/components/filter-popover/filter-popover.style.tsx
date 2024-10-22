import styled from 'styled-components';
import { Popover, PopoverProps } from 'antd';

type StyledPopoverProps = PopoverProps & {
  disabled?: boolean;
};

export const StyledFilterPopover = styled(Popover)<StyledPopoverProps>`
  //
`;

export const FilterButton = styled.div`
  width: 6rem;
  height: 4rem;
  min-width: 6rem;
  min-height: 4rem;
  padding: 0.4rem 0.8rem;
  background-color: ${(props) => props.theme.primary._50};
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: ${(props) => props.theme.primary.main};
  border-radius: 9999px;
  cursor: pointer;

  transition: transform 0.3s ease-in-out;

  & .icon-fill-arrow-down {
    font-size: 0.8rem;
  }

  & .icon-sort {
    font-size: 2.4rem;
  }

  & .rotate-up {
    animation: rotate-up 0.3s ease-in-out forwards;
  }

  & .rotate-down {
    animation: rotate-down 0.3s ease-in-out forwards;
  }

  @keyframes rotate-up {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(180deg);
    }
  }

  @keyframes rotate-down {
    0% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`;

export const ContentContainer = styled.div`
  min-width: 15rem;
`;

export const ContentItem = styled.div`
  > p {
    display: inline-flex;
    cursor: pointer;
    padding: 0.4rem;
    border-radius: 0.6rem;
    margin: 0;
    width: 100%;
  }

  & .active-item {
    background-color: ${(props) => props.theme.primary._50};
  }

  & .icon-item {
    color: ${(props) => props.theme.primary.main};
    margin-right: 0.4rem;
    font-size: 2rem;
  }
`;
