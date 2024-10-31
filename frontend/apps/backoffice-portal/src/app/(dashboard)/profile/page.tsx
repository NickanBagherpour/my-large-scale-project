'use client';

import styled from 'styled-components';

import {
  Button,
  Box,
  Select,
  TabsProps,
  Switch,
  Tabs,
  Chip,
  Container,
  Table,
  Divider,
  MenuItemType,
} from '@oxygen/ui-kit';
import { FilterPopover, FilterType } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
import { CardWithToggle } from '@oxygen/reusable-components';
import { WidgetWrapper } from '@oxygen/backoffice/layouts';
import React from 'react';

const styledContainer = styled.div`
  //margin-left: 2rem;
  background-color: ${(props) => props.theme.background.main};
  width: 100%;
  height: 90vh;
`;
const TagInputContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  & .ant-tag {
    background-color: ${(props) => props.theme.border._50};
    border: 0;
    min-height: 3.7rem;
    color: ${(props) => props.theme.text.primary};
  }
`;

const Div = styled.div`
  margin-left: 2rem;
  margin-bottom: 2rem;
`;
const dropdownOptions: MenuItemType[] = [
  { label: 'Client Flow', key: 'option1' },
  { label: 'Password Flow', key: 'option2' },
  { label: 'Implicit Flow', key: 'option4' },
  { label: 'Refresh Token', key: 'option5' },
  { label: 'Client Flow', key: 'option6' },
  { label: 'Password Flow', key: 'option7' },
  { label: 'Authorization Code Flow', key: 'option8' },
  { label: 'Implicit Flow', key: 'option9' },
  { label: 'Refresh Token', key: 'option10' },
];

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
  const [checkedItems, setCheckedItems] = React.useState<any[]>([]);
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

  const handleCheckboxChange = (e, values, value) => {
    //console.log('handleCheckboxChange', value, values);
    /* e.stopPropagation(); // Prevent dropdown from closing
     e.preventDefault(); // Prevent default behavior
     setCheckedItems((prev) => {
       const existingItem = prev.find((item) => item.value === value);
       if (existingItem) {
         return prev.filter((item) => item.value !== value);
       } else {
         const optionToAdd = dropdownOptions.find((option) => option.value === value);
         return optionToAdd ? [...prev, { label: optionToAdd.label, value }] : prev;
       }
     });*/
  };

  const dataSource = [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    { id: 3, name: 'John Doe', age: 25 },
    { id: 4, name: 'Jane Smith', age: 30 },
    { id: 5, name: 'John Doe', age: 25 },
    { id: 6, name: 'Jane Smith', age: 30 },
    { id: 7, name: 'John Doe', age: 25 },
    { id: 8, name: 'Jane Smith', age: 30 },
    { id: 9, name: 'John Doe', age: 25 },
    { id: 10, name: 'Jane Smith', age: 30 },
    { id: 11, name: 'John Doe', age: 25 },
    { id: 12, name: 'Jane Smith', age: 30 },
    { id: 13, name: 'John Doe', age: 25 },
    { id: 14, name: 'Jane Smith', age: 30 },
    { id: 15, name: 'John Doe', age: 25 },
    { id: 16, name: 'Jane Smith', age: 30 },
    // ...
  ];

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      render: (age) => <span style={{ color: age > 25 ? '#ff4d4f' : 'blue' }}>{age}</span>,
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
    <WidgetWrapper>
      <Container title={t('field.customer')} subtitle={'(245)'}>
        <CardWithToggle
          title={'اعتبارسنجی درخواست جدید'}
          subtitle={'Rate Limit'}
          icon={'icon-setting'}
          defaultChecked={false}
          disabled={false}
          // customStyle={customStyles}
          handleIconClick={(e) => console.log('handle click from usage', e)}
        />
        {/*<TagInputContainer>*/}
        {/*  <TagInput*/}
        {/*    title={' اضافه‌کردن Grant Type'}*/}
        {/*    options={dropdownOptions}*/}
        {/*    multiSelect={true}*/}
        {/*    onChange={handleCheckboxChange}*/}
        {/*    loading={false}*/}
        {/*    defaultValue={*/}
        {/*      [*/}
        {/*        {*/}
        {/*        label: "Client Flow",*/}
        {/*        value: "option1"*/}
        {/*      },*/}
        {/*      {*/}
        {/*        label: "Password Flow",*/}
        {/*        value: "option2"*/}
        {/*      }*/}
        {/*      ]*/}
        {/*    }*/}
        {/*  />*/}
        {/*  {checkedItems.length > 0 && <Divider type='vertical' style={{ height: 'auto' }} />}*/}
        {/*  {checkedItems.map((item) => {*/}
        {/*    return (*/}
        {/*      <React.Fragment key={item.value}>*/}
        {/*        <Chip*/}
        {/*          className={'chip-style'}*/}
        {/*          closable={true}*/}
        {/*          onClose={(e) => {*/}
        {/*            // handleCheckboxChange(item.value, e);*/}
        {/*          }}*/}
        {/*        >*/}
        {/*          {item?.label}*/}
        {/*        </Chip>*/}
        {/*      </React.Fragment>*/}
        {/*    );*/}
        {/*  })}*/}
        {/*</TagInputContainer>*/}
        <div className='container'>
          <div id='welcome'>
            <h1>
              <span> Hello there, </span>
              Welcome to Oxygen Portals 👋
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
            <Table dataSource={dataSource} columns={columns} hasContainer={false} pagination={{ pageSize: 5 }} />
          </Div>
        </div>
      </Container>
    </WidgetWrapper>
  );
}
