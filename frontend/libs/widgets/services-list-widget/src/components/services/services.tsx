import * as S from './services.style';
import { GridCard } from '@oxygen/reusable-components';
import { Table, Switch } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { ServiceType, ParamsType } from '../../types';
import { updatePagination, useAppDispatch, useAppState } from '../../context';
import Mockify from '@oxygen/mockify';
import { useTheme } from 'styled-components';

type Props = {
  data: ServiceType[];
  total?: number;
  searchTerm: string;
  isLoading: boolean;
  wordToHighlight: string;
  changeStatus: (status: boolean, name: string) => void;
  deleteService: (name: string, status: ParamsType) => void;
};

export default function Services(props: Props) {
  const { data, total, searchTerm, isLoading, wordToHighlight, changeStatus, deleteService } = props;
  const [t] = useTr();
  const dispatch = useAppDispatch();
  const { page } = useAppState();

  const theme = useTheme();

  const columns = [
    { title: `${t('row')}`, dataIndex: 'index', key: 'index' },
    {
      title: `${t('name')}`,
      dataIndex: 'name',
      key: 'name',
      render: (name) => <S.Name text={name} highlightColor={theme.secondary.main} wordToHighlight={wordToHighlight} />,
    },
    { title: `${t('persian_name')}`, dataIndex: 'persianName', key: 'persianName' },
    {
      title: `${t('scope')}`,
      dataIndex: 'scope',
      key: 'scope',
      render: (scope) => (
        <S.Name text={scope} highlightColor={theme.secondary.main} wordToHighlight={wordToHighlight} />
      ),
    },
    {
      title: 'url',
      dataIndex: 'url',
      key: 'url',
      render: (url) => <S.Url href='/'>{url}</S.Url>,
    },
    { title: `${t('version')}`, dataIndex: 'version', key: 'version' },
    {
      title: `${t('status')}`,
      dataIndex: 'status',
      key: 'status',
      render: (status, name) => (
        <span>
          {t('stopped')}
          <span style={{ margin: '0 1.2rem' }}>
            <Switch checked={status} onClick={() => changeStatus(status, name.name)} />
          </span>
          {t('operational')}
        </span>
      ),
    },
    {
      title: '',
      dataIndex: 'details',
      key: 'details',
      render: (url) => <S.Details href='/'>{t('detailed')}</S.Details>,
    },
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
      render: (name, status) => <S.Trash className='icon-trash' onClick={() => deleteService(name, status)} />,
    },
  ];

  const tableData = data.map((item, index) => ({ ...item, index: index + 1 }));

  // const showLoadMore = page * Mockify.CLIENTS_LIST_LIMIT <= (total ?? 0) && data.length >= Mockify.CLIENTS_LIST_LIMIT;

  return (
    <>
      <S.TableContainer>
        <Table dataSource={tableData} columns={columns} hasContainer={false} pagination={{ pageSize: 5 }} />
      </S.TableContainer>
    </>
  );
}
