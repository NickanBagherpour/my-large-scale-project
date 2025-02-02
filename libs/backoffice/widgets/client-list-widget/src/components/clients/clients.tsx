import * as S from './clients.style';
import { GridCard } from '@oxygen/reusable-components';
import { updatePagination, useAppDispatch, useAppState } from '../../context';
import { ROUTES } from '@oxygen/utils';
import { Clients } from '../../types';
import { CLIENTS_PAGE_SIZE } from '../../utils/consts';
import { Pagination } from '@oxygen/ui-kit';

type Props = {
  data: Clients;
  searchTerm: string;
};

export default function Clients(props: Props) {
  const {
    data: { content, totalElements },
    searchTerm,
  } = props;
  const dispatch = useAppDispatch();
  const { page } = useAppState();

  const changePage = (page: number) => {
    updatePagination(dispatch, page);
  };

  return (
    <>
      <S.Grid>
        {content.map(({ isActive, clientId, clientName, createDate, organizationName }, idx) => (
          <GridCard
            key={idx}
            title={clientName}
            subTitle={organizationName}
            status={isActive ? 'active' : 'inactive'}
            date={createDate}
            wordToHighlight={searchTerm}
            href={`${ROUTES.BACKOFFICE.CLIENT_DETAILS}?client-id=${clientId}`}
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
      />
    </>
  );
}
