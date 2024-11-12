import { respondTo } from '@oxygen/utils';

import styled from 'styled-components';

export const Wrapper = styled.div<any>`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media print {
    @page {
      margin: 0;
    }
  }

  .receipt-header i.icon-check {
    font-size: 2rem;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(p) => p.theme.base.successBackgroundLight};
    color: ${(p) => p.theme.base.success};
  }

  .receipt-top-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .receipt-body {
    font-size: 1.6rem;
    border: 3px solid ${(p) => p.theme.base.orange};
    border-top: 15px solid ${(p) => p.theme.base.orange};
    border-radius: 15px;
    padding: ${(props) => (props.isCompact ? '2rem 3rem 2rem 3rem' : '2rem 5rem 4rem 5rem')};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* margin-bottom: 3rem; */
    .receipt-top-header {
      padding-bottom: ${(props) => (props.isCompact ? '0rem' : '10rem')};
    }

    .banner-result {
      text-align: center;
      font-weight: 600;
      margin-top: 3rem;
      /* color: ${(p) => p.theme.base.textSecondary}; */
    }

    .title {
      width: 97%;
      margin-top: ${(props) => (props.isCompact ? '3rem' : '5.4rem')};
      font-weight: 500;

      p {
        border-bottom: 1px solid ${(p) => p.theme.base.border};
        margin: 0.8rem 0;
        padding-bottom: 1rem;
      }
    }

    .title:nth-of-type(1) {
      margin-top: 0;
    }

    .info-section {
      margin-top: 1rem;
      width: 90%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-row-gap: 1.6rem;
      grid-column-gap: 10%;

      ${respondTo.down('sm')} {
        grid-template-columns: repeat(1, 1fr);
      }

      .wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;

        .property-title {
          display: flex;
          align-items: center;
          flex: 0.5;
          white-space: nowrap;
          @media print {
            flex: 1;
          }
        }

        .property-value {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          color: ${(p) => p.theme.base.textSecondary};
        }
      }
    }
  }

  .receipt-footer {
    margin: 6rem 0 0;
    width: 97%;
  }

  .footer-item {
    margin: 0;
    font-size: 1.4rem;
    color: ${(props) => props.theme.base.textPrimary};

    &:first-child {
      margin-bottom: 0.8rem;
    }
  }

  @media print {
    .receipt-body {
      padding: 2rem 5rem 3rem 5rem;
      .receipt-top-header {
        padding-bottom: 0;
      }
      .title {
        margin-top: 1rem;
      }
    }
  }
`;

export const LogoContainer = styled.div`
  /* margin-bottom: 3rem; */
`;
