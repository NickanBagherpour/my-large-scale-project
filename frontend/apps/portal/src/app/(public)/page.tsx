'use client';

import styled from 'styled-components';

import { Button, Box ,Select} from '@oxygen/ui-kit';

const Div = styled.div`
  margin-left: 2rem;
  
`;

export default function Index() {
  return (
    <Div className='wrapper'>
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
          <Select defaultValue="lucy" style={{ width: 120 }}>
            <Select.Option value="jack">Jack</Select.Option>
            <Select.Option value="lucy">Lucy</Select.Option>
            <Select.Option value="disabled" disabled>
              Disabled
            </Select.Option>
            <Select.Option value="Yiminghe">yiminghe</Select.Option>
          </Select>
        </Div>
      </div>
    </Div>
  );
}
