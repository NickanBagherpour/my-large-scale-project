import styled from 'styled-components';
import { looperGroup } from '../../assets';
import { respondTo } from '@oxygen/utils';
import { Button as UiKitButton } from '@oxygen/ui-kit';

export const Container = styled.div`
  border-radius: 1.8rem;
  padding: 3rem 4rem;
  border: ${(p) => `1px solid ${p.theme.border._300}`};
  text-decoration: none;
  transition: all 200ms;
  overflow: hidden;
  display: block;
  isolation: isolate;
  background-image: url('${looperGroup}');
  background-size: contain;
  background-repeat: no-repeat;
  /*! @noflip */
  background-position: left bottom;

  &&& {
    /* overridding ant buttons styles */
    border: 1px solid;
    border-color: ${(p) => p.theme.border._300};
    background-color: ${(p) => p.theme.background.main};
    filter: none;
    height: fit-content;

    &:hover {
      /* border-color: ${(p) => p.theme.primary._400}; */
      box-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
      opacity: 1;
    }
  }
`;

export const Button = styled(UiKitButton)`
  width: 100%;
`;
export const Discription = styled.div`
  width: 100%;
  background-color: red;
`;
export const Status = styled.div`
  width: 100%;
  background-color: green;
`;
export const Details = styled.div`
  width: 100%;
  background-color: blue;
`;
export const Divider = styled.div`
  width: 100%;
  background-color: #720563;
  display: flex;
  flex-direction: row;
  ${respondTo.down('sm')} {
    flex-direction: column;
  }
`;
