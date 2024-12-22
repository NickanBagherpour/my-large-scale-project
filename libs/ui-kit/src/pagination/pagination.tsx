import { PaginationProps } from 'antd';
import * as S from './pagination.style';

export function Pagintion(props: PaginationProps) {
  return <S.Pagination {...props} />;
}
