import React, { useState } from 'react';

import { Button, Table } from '@oxygen/ui-kit';
import { PageProps } from '@oxygen/types';

import * as S from './data-table.style';
import { useTr } from '@oxygen/translation';
import { AddServerModal } from '../../../modals/add-server-modal/add-server-modal';
export type AddServerModalType = {
  addService: boolean;
};

export type TablePropsType = PageProps & {
  //
};
export const DataTable: React.FC<TablePropsType> = (props) => {
  // const {} = props;
  const [t] = useTr();

  const [modals, setModals] = useState<AddServerModalType>({
    addService: false,
  });

  const toggleModal = (modal: keyof AddServerModalType) => {
    setModals((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };
  return (
    <S.TableContainer>
      <S.Title>
        <S.TitleSpan>{t('upstream_tab.upstream_servers')}</S.TitleSpan>
        <Button color='secondary' onClick={() => toggleModal('addService')}>
          <S.Icon className='icon-plus' />
          {t('add_server')}
        </Button>
      </S.Title>
      <Table />
      <AddServerModal isOpen={modals.addService} toggle={() => toggleModal('addService')} />
    </S.TableContainer>
  );
};
