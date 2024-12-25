import React from 'react';

import { CollapseProps as AntCollapseProps } from 'antd';

import * as S from './collapse.style';

export type CollapseProps = Omit<AntCollapseProps<any>, 'items'> & {
  items: AntCollapseProps['items'];
};

const Collapse = (props: CollapseProps) => {
  const { items, ...rest } = props;
  return items ? (
    <S.StyledCollapse
      expandIcon={({ isActive }) => (
        <S.Expand>
          <S.ExpandIcon className='icon-arrow-up' rotate={!!isActive} />
        </S.Expand>
      )}
      items={items}
      bordered={false}
      defaultActiveKey={['1']}
      expandIconPosition='end'
      {...rest}
    />
  ) : null;
};

export default Collapse;
