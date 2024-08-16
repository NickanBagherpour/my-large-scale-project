'use client';

import styled from '@emotion/styled';

import { Button, Box, Icons, MobileDatePicker } from '@oxygen-portal/ui-kit';

const Div = styled.div`
  margin-left: 2rem;
  display: inline;
`;

export default function Index() {
  return (
    <div className='wrapper'>
      <div className='container'>
        <div id='welcome'>
          <h1>
            <span> Hello there, </span>
            Welcome to Oxygen Portal 👋
          </h1>
        </div>

        <Box display={'flex'} marginY={'2rem'} color={'blue'}>
          This is Material
        </Box>
        <Box display={'flex'} marginY={'2rem'} color={'blue'}>
          متن فارسی
        </Box>

        <Icons.PDFIcon />
        <Button variant={'contained'}>Click me</Button>

        <Div>
          <MobileDatePicker
            label={'from_date'}
            placeholder={'primary_date'}
            // format="YYYY/MM/DD"
            views={['year', 'month', 'day']}
            closeOnSelect
            // value={fromDate && new Date(fromDate)}
            // maxDate={toDate ? new Date(toDate) : new Date()}
            // onChange={(date: Date) => updateFilters({ key: 'fromDate', value: date?.toISOString() })}
          />
        </Div>
      </div>
    </div>
  );
}
