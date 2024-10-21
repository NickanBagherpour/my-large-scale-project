'use client';

import styled, { useTheme } from 'styled-components';

import { Button, Box, Select, Switch, Tabs, Chip, Progress, Modal } from '@oxygen/ui-kit';
import { TabsProps } from 'antd';
import { useState } from 'react';

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
  console.log('close');
}

function clickAlert() {
  console.log('click');
}

function PreventCloseAlert(e) {
  e.preventDefault();
}

export default function Index() {
  const theme = useTheme();
  const [modalState, setModalState] = useState(false);
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
          <Progress isPrimary={true} percent={40} height={20} />
        </Box>

        <Modal
          title={'Delete'}
          open={modalState}
          centered={true}
          onCancel={() => setModalState(false)}
          maskClosable={false}
          footer={
            <Box>
              <Button color={'primary'} variant={'solid'} onClick={() => setModalState(false)}>
                Confirm
              </Button>
            </Box>
          }
        >
          <p>Modal Body</p>
        </Modal>

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
        <Div style={{ display: 'flex', gap: '3rem', margin: '2rem' }}>
          <Button color='primary'>primary</Button>
          <Button color='secondary'>secondary</Button>
          <Button color='warning'>warning</Button>
          <Button color='error'>error</Button>
        </Div>
        <Div style={{ display: 'flex', gap: '3rem', margin: '2rem' }}>
          <Button variant='solid'>solid</Button>
          <Button variant='filled'>filled</Button>
          <Button variant='outlined'>outlined</Button>
          <Button variant='dashed'>dashed</Button>
          <Button variant='text'>text</Button>
          <Button variant='link'>link</Button>
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
        <Div>
          <Button color={'danger'} variant={'solid'} onClick={() => setModalState(!modalState)}>
            open Modal
          </Button>
        </Div>
      </div>
    </Div>
  );
}
