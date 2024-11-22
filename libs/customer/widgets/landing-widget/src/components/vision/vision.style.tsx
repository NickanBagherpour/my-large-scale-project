import styled from 'styled-components';
import { SectionTitle } from '../section-title/section-title.style';
import { PaddingBox } from '../padding-box/padding-box.style';
import { respondTo } from '@oxygen/utils';

export const Container = styled(PaddingBox)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16rem;

  ${respondTo.down('lg')} {
    flex-direction: column;
  }
`;

export const Title = styled(SectionTitle)`
  margin-bottom: 4rem;
`;

export const Desc = styled.p`
  color: ${(p) => p.theme.text.tertiary};
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 2.22;
  max-width: 57.4rem;
  ${respondTo.down('lg')} {
    max-width: 100%;
  }
`;

export const ImgContainer = styled.div`
  position: relative;
  width: 46.1rem;
  aspect-ratio: 461 / 343;

  ${respondTo.down('lg')} {
    width: 70%;
    margin-inline: auto;
  }
`;
