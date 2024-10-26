'use client';

import styled from 'styled-components';

import { Button, Box, Select, TabsProps, Switch, Tabs, Chip, Container, Table } from '@oxygen/ui-kit';
import { FilterPopover, FilterType } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';

const styledContainer = styled.div`
  //margin-left: 2rem;
  background-color: ${(props) => props.theme.background.main};
  width: 100%;
  height: 90vh;
`;

const Div = styled.div`
  margin-left: 2rem;
  margin-bottom: 2rem;
`;

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'اطلاعات کلاینت',
    children: 'در این تب شما اطلاعات کلاینت‌ها را مشاهده می‌کنید',
  },
  {
    key: '2',
    label: 'سرویس‌ها',
    children: 'در این تب شما سرویس‌ها را مشاهده می‌کنید',
  },
  {
    key: '3',
    label: 'پلاگین‌ها',
    children: 'در این تب شما پلاگین‌ها را مشاهده می‌کنید',
  },
];

const content: FilterType[] = [
  {
    key: '1',
    title: 'جدیدترین',
    icon: 'icon-arrow-ascending',
  },
  {
    key: '2',
    title: 'قدیمی‌ترین',
    icon: 'icon-arrow-descending',
  },
];

export default function Index() {
  const [t] = useTr();

  function closeAlert() {
    console.log('close');
  }

  function clickAlert() {
    console.log('click');
  }

  function PreventCloseAlert(e) {
    e.preventDefault();
  }

  function onChange(key: string) {
    console.log('invoked filter : ', key);
  }

  const dataSource = [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    // ...
  ];

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      render: (age) => (
        <span style={{ fontWeight: age > 30 ? 'bold' : 'normal', color: age > 25 ? '#ff4d4f' : 'blue' }}>{age}</span>
      ),
    },
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    // ...
  ];

  return (
    <Box width={'100%'}>
      <Container title={t('field.customer')} subtitle={'(245)'}>
        <div className='container'>
          <div id='welcome'>
            <h1>
              <span> Hello there, </span>
              Welcome to Oxygen Portal 👋
            </h1>
          </div>

          <Box display={'flex'} color={'blue'}>
            This is Material
          </Box>
          <Box display={'flex'} color={'blue'}>
            متن فارسی
          </Box>

          <Button type={'primary'}>Click me</Button>

          <Div>
            <Select defaultValue='lucy' style={{ width: 120 }}>
              <Select.Option value='jack'>Jack</Select.Option>
              <Select.Option value='lucy'>Lucy</Select.Option>
              <Select.Option value='disabled' disabled>
                Disabled
              </Select.Option>
              <Select.Option value='Yiminghe'>yiminghe</Select.Option>
            </Select>
          </Div>
          <Div>
            <Switch />
          </Div>
          <Div>
            <Tabs defaultActiveKey='1' items={items} />
          </Div>
          <Div>
            <Chip onClick={() => clickAlert()}>chip</Chip>
            <Chip type='active' iconProp='checked icon-checkmark'>
              chip Active
            </Chip>
            <Chip type='active'>info Chip</Chip>
            <Chip type='active' closeIcon onClose={() => closeAlert()}>
              closeIcon Chip
            </Chip>
            <Chip type='active' closeIcon onClose={(e) => PreventCloseAlert(e)}>
              prevent close Chip
            </Chip>
          </Div>
          <Div style={{ padding: '2rem' }}>
            <FilterPopover filters={content} onChange={(key) => onChange(key)} initialValue={'2'}>
              <Button>Click me</Button>
            </FilterPopover>
          </Div>
          <Div>
            <Table
              dataSource={dataSource}
              columns={columns}
              hasContainer={false}
              scroll_x={5500}
              simpleTables={false}
            />
          </Div>
        </div>
      </Container>
    </Box>
  );
}
