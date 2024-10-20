'use client';

import styled, { useTheme } from 'styled-components';

import { Button, Box, Select, Switch, Tabs, Chip, Progress } from '@oxygen/ui-kit';
import type { TabsProps } from 'antd';

const Div = styled.div`
  margin-left: 2rem;
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

function closeAlert() {
  console.log('delete');
}

export default function Index() {
  const theme = useTheme();
  return (
    <Div className='wrapper'>
      <div className='container'>
        <div id='welcome'>
          <h1>
            <span> Hello there, </span>
            Welcome to Oxygen Portal 👋
          </h1>
        </div>

        <Box width='60%'>
          <Progress isPrimary={true} percent={100} />
        </Box>

        <Box display={'flex'} color={'blue'}>
          This is Material
        </Box>
        <Box display={'flex'} color={'blue'}>
          متن فارسی
        </Box>

        <Box display={'flex'} flexDirection={'column'} style={{ gap: '1rem', margin: '1rem' }} width='min-content'>
          <Button variant={'solid'} color={'warning'}>
            Add
          </Button>
          <Button variant={'dashed'} color={'warning'}>
            Add
          </Button>
          <Button variant={'text'} color={'warning'}>
            Add
          </Button>
          <Button variant={'outlined'} color={'warning'}>
            Add
          </Button>
          <Button variant={'filled'} color={'warning'}>
            Add
          </Button>

          <Button variant={'link'} color={'warning'}>
            Add
          </Button>
          <Button variant={'solid'} color={'warning'}>
            Add
          </Button>
        </Box>

        <Box display={'flex'} flexDirection={'column'} style={{ gap: '1rem', margin: '1rem' }} width='min-content'>
          <Button variant={'dashed'} color={'danger'}>
            Add
          </Button>
          <Button variant={'text'} color={'danger'}>
            Add
          </Button>
          <Button variant={'outlined'} color={'danger'}>
            Add
          </Button>
          <Button variant={'filled'} color={'danger'}>
            Add
          </Button>
          {/*<Button color={'danger'}>Add</Button>*/}
          <Button variant={'link'} color={'danger'}>
            Add
          </Button>
          <Button variant={'solid'} color={'danger'}>
            Add
          </Button>
        </Box>

        {/*<Box display={'flex'} flexDirection={'column'} style={{gap:'1rem', margin: '1rem'}} width='min-content' >*/}
        {/*  <Button variant={'dashed'} color={'secondary'}>Add</Button>*/}
        {/*  <Button variant={'text'} color={'secondary'}>Add</Button>*/}
        {/*  <Button variant={'outlined'} color={'secondary'}>Add</Button>*/}
        {/*  <Button variant={'filled'} color={'secondary'}>Add</Button>*/}
        {/*  /!*<Button color={'secondary'}>Add</Button>*!/*/}
        {/*  <Button variant={'link'} color={'secondary'}>Add</Button>*/}
        {/*  <Button variant={'solid'} color={'secondary'}>Add</Button>*/}
        {/*  <Button variant={'solid'} color={'warning'}>ASDFAS</Button>*/}
        {/*</Box>*/}

        <Box display={'flex'} flexDirection={'column'} style={{ gap: '1rem', margin: '1rem' }} width='min-content'>
          {/*<Button variant={'dashed'} color={'danger'}>a</Button>*/}
          {/*<Button variant={'text'} color={'danger'}>a</Button>*/}
          {/*<Button variant={'outlined'} color={'danger'}>a</Button>*/}
          {/*<Button variant={'filled'} color={'danger'}>a</Button>*/}
          {/*<Button color={'danger'}>a</Button>*/}
          {/*<Button variant={'link'} color={'danger'}>a</Button>*/}
          {/*<Button variant={'solid'} color={'danger'}>a</Button>*/}
        </Box>

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
          <Chip>chip</Chip>
          <Chip active>chip Active</Chip>
          <Chip active closeIcon onClose={() => closeAlert()}>
            closeIcon Chip
          </Chip>
        </Div>
      </div>
    </Div>
  );
}
