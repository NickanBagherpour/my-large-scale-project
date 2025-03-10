import * as S from './clients.style';
import { GridCard } from '@oxygen/reusable-components';
import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { ROUTES } from '@oxygen/utils';
import { type Clients } from '../../types';
import { CLIENTS_PAGE_SIZE } from '../../utils/consts';
import { Pagination } from '@oxygen/ui-kit';

type Props = {
  clients: Clients;
};

export default function Clients(props: Props) {
  const {
    clients: { content, totalElements },
  } = props;
  const dispatch = useAppDispatch();
  const { page, searchTerm } = useAppState();

  const changePage = (page: number) => {
    updatePagination(dispatch, page);
  };

  return (
    <>
      <S.Grid>
        {content.map(({ isActive, clientName, createDate, organizationName }, idx) => (
          <GridCard
            key={idx}
            title={clientName}
            subTitle={organizationName}
            status={isActive ? 'active' : 'inactive'}
            date={createDate}
            wordToHighlight={searchTerm}
            href={`${ROUTES.BACKOFFICE.CLIENT_DETAILS}?client-name=${clientName}`}
            hasSetting
            isHeaderLtr
          />
        ))}
      </S.Grid>

      <Pagination
        current={page}
        total={totalElements}
        pageSize={CLIENTS_PAGE_SIZE}
        showSizeChanger={false}
        align='center'
        onChange={changePage}
        hideOnSinglePage
      />
    </>
  );
}
