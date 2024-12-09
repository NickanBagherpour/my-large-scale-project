import React from 'react';

import { Button, Table } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';

import * as S from './data-table.style';
import { useTr } from '@oxygen/translation';

export type TablePropsType = PageProps & {
  //
};
export const DataTable: React.FC<TablePropsType> = (props) => {
  // const {} = props;
  const [t] = useTr();
  return (
    <S.TableContainer>
      <S.Title>
        <S.TitleSpan>{t('upstream_tab.upstream_servers')}</S.TitleSpan>
        <Button color='secondary'>
          <S.Icon className='icon-plus' />
          {t('add_server')}
        </Button>
      </S.Title>
      <Table />
    </S.TableContainer>
  );
};
