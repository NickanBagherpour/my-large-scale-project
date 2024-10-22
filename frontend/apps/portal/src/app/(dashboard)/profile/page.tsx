'use client';

import styled from 'styled-components';

import { Button, Box, Select, TabsProps, Switch, Tabs, Chip } from '@oxygen/ui-kit';
import Container from 'libs/ui-kit/src/container/container';
import { useTr } from '@oxygen/translation';

const styledContainer = styled.div`
  //margin-left: 2rem;
  background-color: ${(props) => props.theme.background.main};
  width: 100%;
  height: 90vh;
`;

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

  return (
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
      </div>
    </Container>
  );
}
