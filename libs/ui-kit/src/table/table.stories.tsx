import { Meta, StoryFn } from '@storybook/react';
import { Table, TableProps, PaginationType, ColumnsType } from './table';
import { TFunction } from 'i18next';
import { DefaultTheme } from 'styled-components/dist/types';
import { MobileColumnType } from './mobile-columns';

export function getMobileColumns(props?: Props): ColumnsType<any> {
  const badgeColor = props?.theme?.error?._600;
  return [
    {
      title: '',
      dataIndex: '',
      // align: 'center',
      render: (value, record, index) => {
        const columns: MobileColumnType[] = [
          {
            title: 'Name',
            value: value?.name,
          },
          {
            title: 'Role',
            value: value.role,
          },
        ];
        return <Table.MobileColumns columns={columns} />;
      },
    },
  ];
}
const argTypes = {
  variant: {
    options: ['simple', 'complex'],
    control: {
      type: 'radio',
    },
    description: 'Defines the visual style of the table.',
    defaultValue: 'simple',
  },
  paginationType: {
    options: [PaginationType.PAGINATED, PaginationType.INCREMENTAL],
    control: {
      type: 'radio',
    },
    description: 'Defines the pagination type of the table.',
    defaultValue: PaginationType.PAGINATED,
  },
  hasContainer: {
    control: 'boolean',
    description: 'Wraps the table with a container if true.',
    defaultValue: false,
  },
  title: {
    control: 'text',
    description: 'Optional title for the table.',
    defaultValue: 'Table Title',
  },
  captionChildren: {
    control: 'text',
    description: 'Content to display in the table caption.',
    defaultValue: 'Additional caption content here.',
  },
  isLastPage: {
    control: 'boolean',
    description: 'Indicates if the table is on the last page when using incremental pagination.',
    defaultValue: false,
  },
  loading: {
    control: 'boolean',
    description: 'Indicates if the table is loading.',
    defaultValue: false,
  },
};

export default {
  title: 'UI-Kit/Table',
  component: Table,
  argTypes: argTypes,
} as Meta;

// Template for reusable stories
const Template: StoryFn<TableProps> = (args) => <Table {...args} />;

// Default Story
export const Default = Template.bind({});
Default.args = {
  columns: [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
  ],
  dataSource: [
    { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
    { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
    { key: '3', name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park' },
  ],
  pagination: { current: 1, pageSize: 5, total: 15 },
  title: 'Default Table',
};

// All Variants Story
export const AllVariants: StoryFn = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h3>Variants</h3>
      <div>
        <h4>Simple Table</h4>
        <Table
          variant='simple'
          columns={[
            { title: 'Name', dataIndex: 'name', key: 'key' },
            { title: 'Age', dataIndex: 'age', key: 'key' },
          ]}
          dataSource={[
            { key: '1', name: 'Alice', age: 25 },
            { key: '2', name: 'Bob', age: 30 },
            { key: '3', name: 'Sara', age: 35 },
          ]}
          pagination={{ current: 1, pageSize: 5, total: 10 }}
          rowKey={'key'}
        />
      </div>
      <div>
        <h4>Complex Table</h4>
        <Table
          variant='complex'
          columns={[
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Age', dataIndex: 'age', key: 'age' },
            { title: 'Location', dataIndex: 'location', key: 'location' },
          ]}
          dataSource={[
            { key: '1', name: 'Charlie', age: 35, location: 'Paris' },
            { key: '2', name: 'Diana', age: 40, location: 'Berlin' },
            { key: '3', name: 'Sara', age: 40, location: 'Tehran' },
          ]}
          pagination={{ current: 1, pageSize: 5, total: 10 }}
        />
      </div>
      <div>
        <h4>With mobile columns </h4>
        <Table
          mobileColumns={getMobileColumns()}
          columns={[
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Role', dataIndex: 'role', key: 'role' },
          ]}
          dataSource={[
            { key: '1', name: 'Eve', role: 'Designer' },
            { key: '2', name: 'Frank', role: 'Engineer' },
          ]}
        />
      </div>
      <div>
        <h4>Incremental Pagination</h4>
        <Table
          paginationType={PaginationType.INCREMENTAL}
          columns={[
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Role', dataIndex: 'role', key: 'role' },
          ]}
          dataSource={[
            { key: '1', name: 'Eve', role: 'Designer' },
            { key: '2', name: 'Frank', role: 'Engineer' },
          ]}
          isLastPage={false}
          loading={false}
        />
      </div>
      <div>
        <h4>With Title</h4>
        <Table
          columns={[
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Role', dataIndex: 'role', key: 'role' },
          ]}
          dataSource={[
            { key: '1', name: 'Eve', role: 'Designer' },
            { key: '2', name: 'Frank', role: 'Engineer' },
          ]}
          isLastPage={false}
          loading={false}
          title={'TABLE TITLE   '}
        />
      </div>
      <div>
        <h4>With Caption </h4>
        <Table
          columns={[
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Role', dataIndex: 'role', key: 'role' },
          ]}
          dataSource={[
            { key: '1', name: 'Eve', role: 'Designer' },
            { key: '2', name: 'Frank', role: 'Engineer' },
          ]}
          title='Table Title'
          captionChildren={<div style={{ color: 'red' }}>Caption</div>}
        />
      </div>
    </div>
  );
};
AllVariants.storyName = 'All Variants';
AllVariants.parameters = {
  docs: {
    storyDescription:
      'Displays all variations of the Table component, including different variants and pagination styles.',
  },
};
type Props = {
  t?: TFunction;
  theme?: DefaultTheme;
};
