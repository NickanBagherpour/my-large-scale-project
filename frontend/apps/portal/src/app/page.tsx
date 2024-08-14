'use client';

import { Button, Box } from '@oxygen-portal/ui-kit';

export default function Index() {
  return (
    <div className="wrapper">
      <div className="container">
        <div id="welcome">
          <h1>
            <span> Hello there, </span>
            Welcome to Oxygen Portal 👋
          </h1>
        </div>

        <Box display={'flex'} marginY={'2rem'} color={'blue'}>
          This is Material
        </Box>

        <Button variant={'contained'}>Click me</Button>

      </div>
    </div>
  );
}
