'use client';

import { Box } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { WidgetWrapper } from '@oxygen/customer/layouts';
import React from 'react';

export default function Index() {
  const [t] = useTr();

  return (
    <WidgetWrapper>
      <Box className='container'>
        <div id='welcome'>
          <h1>
            <span> Auth Page </span>
            Welcome to Auth Page 👋
          </h1>
          <h2>This is Customer Portal</h2>
        </div>
      </Box>
    </WidgetWrapper>
  );
}

// 'use client';

// import AuthWidget from '@oxygen/customer/widgets/auth-widget';

// export default function Index(props) {
//   return <AuthWidget parentProps={props} />;
// }
