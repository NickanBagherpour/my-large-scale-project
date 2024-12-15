import styled, { css } from 'styled-components';
import { Radio as AntRadio } from 'antd';
import { respondTo } from '@oxygen/utils';
import { Dropdown } from '@oxygen/ui-kit';
import { MarkText, Button as UiKitButton } from '@oxygen/ui-kit';
import { LooperGroup } from '../../assets';
import RawGrid from '../grid/grid.style';

export const Radios = styled(AntRadio.Group)`
  margin-bottom: 2.4rem;
`;

export const Radio = styled(AntRadio)`
  font-size: 1.2rem;
`;

export const Grid = styled(RawGrid)`
  margin-bottom: 1.6rem;
`;

export const OrganizationContainer = styled.div`
  & .ant-card {
    background-color: ${(p) => p.theme.background._50};
  }
`;

export const RepresentativesInfoItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin: 1.6rem 0;

  span {
    line-height: 2.2rem;
    font-size: 1.4rem;
  }

  span:nth-child(1) {
    color: ${(p) => p.theme.text.primary};
    font-weight: 500;
  }
  span:nth-child(2) {
    color: ${(p) => p.theme.text.secondary};
    font-weight: 400;
  }
`;

export const Button = styled(UiKitButton)<{ $isSelected: boolean }>`
  border-radius: 1.8rem;
  padding: 1.6rem;
  border: ${(p) => `1px solid ${p.theme.border._300}`};
  text-decoration: none;
  transition: all 200ms;
  overflow: hidden;
  display: block;
  isolation: isolate;
  background-image: url('${LooperGroup}');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right bottom;

  &&& {
    /* overridding ant buttons styles */
    border: 1px solid;
    border-color: ${(p) => (p.$isSelected ? p.theme.primary.main : p.theme.border._300)};
    background-color: ${(p) => p.theme.background.main};
    filter: none;
    height: fit-content;

    &:hover {
      border-color: ${(p) => p.theme.primary._400};
      opacity: 1;
    }
  }
`;

export const Header = styled.p`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 0;
  gap: 2rem;
  color: ${(p) => p.theme.text.primary};
  font-size: 1.6rem;
  line-height: 2.5rem;
`;

export const Subtitle = styled.p`
  padding: 0;
  font-size: 1.2rem;
  text-align: start;
  color: ${(p) => p.theme.text.tertiary};
  margin: 0.6rem 0 0;
`;

export const TitleTxt = styled.p`
  font-weight: bold;
  font-size: 1.6rem;
  margin: 0;
  margin: 3.2rem 0 1.6rem 0;
`;

export const FirstStepContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 3.2rem;
  .label-switch {
    display: flex;
    align-items: end;

    div {
      gap: 1rem;
      display: flex;
      align-items: center;

      ${respondTo.down('md')} {
        align-items: start;
      }
    }
  }

  & .ant-form {
    flex: 1;
  }
`;

export const AggregatorContainer = styled.div`
  display: flex;

  & .label-switch {
    flex-grow: 1;
  }

  & .select-aggregator {
    flex-grow: 2;
  }
`;

export const Select = styled(Dropdown.Select)`
  min-width: 20rem;
`;

export const FirstForm = styled.div`
  margin: 4rem 0;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

export const TagPicker = styled.div`
  display: flex;
  flex-direction: row;

  ${respondTo.down('xs')} {
    flex-direction: column;
  }
  .ant-form-item {
    margin: 0;
    padding: 0 1.6rem 0 0;
    border-right: 1px solid ${(p) => p.theme.border.main};
    width: min-content;
    ${respondTo.down('xs')} {
      width: 100%;
      border-right: none;
      padding: 0;
    }
  }
  .ant-btn {
    ${respondTo.down('xs')} {
      width: 100%;
      margin-bottom: 1rem;
    }
  }
  .ant-tag {
    margin: 0.5rem 0 0.5rem 1.6rem !important;
  }
`;
export const Footer = styled.div`
  display: flex;
  height: 7.2rem;
  align-items: center;
  justify-content: end;
  border-top: 1px solid ${(p) => p.theme.border._100};
  gap: 1.2rem;
`;
