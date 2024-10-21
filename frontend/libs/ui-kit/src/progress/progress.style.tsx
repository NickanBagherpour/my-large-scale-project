import styled from 'styled-components';
import { Progress as AntProgress } from 'antd';

export const StyledProgress = styled(AntProgress)`
  .ant-progress-outer {
    //display: flex;
    //flex-direction: row-reverse;

    .ant-progress-text {
      margin-right: 1rem;
    }
    .ant-progress-inner {
      //display: flex;
      //flex-direction: row-reverse;
      .ant-progress-bg {
        //padding: 0.8rem;
      }
    }
  }
`;
