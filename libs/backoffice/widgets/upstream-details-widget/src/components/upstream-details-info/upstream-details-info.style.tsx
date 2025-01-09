import styled from 'styled-components';
import { Input as KitInput, Divider as KitDivider, Button as KitButton } from '@oxygen/ui-kit';
import { respondTo } from '@oxygen/utils';
import { FilterPopover as KitFilterPopover } from '@oxygen/reusable-components';

export const UpstreamDetailsInfoContainer = styled.section`
  /* margin: 2.8rem 0 4rem 0; */
  margin-top: 2.4rem;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

// export const InfoHeader = styled.div`
//   background-color: red;
//   padding: 0.4rem 0.8rem;
// `;
// export const InfoContent = styled.div`
//   background-color: ${(props) => props.theme.border._100};
//   padding: 02.4rem;
//   border-radius: 0.8rem;
// `;

// export const Title = styled.span`
//   font-size: 1.6rem;
//   font-weight: 500;
//   line-height: 2.5rem;
// `;
export const Container = styled.div`
  margin-top: 2.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3.6rem;
  max-height: fit-content;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding-inline: 0.8rem;
  margin-bottom: 1.6rem;

  ${respondTo.down('sm')} {
    flex-direction: column;
  }
`;

export const TabName = styled.h2`
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.5rem;
  margin-inline-end: auto;
  margin-block: 0;
`;

export const Btns = styled.div`
  display: flex;
  gap: 2rem;

  ${respondTo.down('sm')} {
    justify-content: space-between;
    width: 100%;
  }
`;

export const Icon = styled.i`
  font-size: 1.8rem;
`;
