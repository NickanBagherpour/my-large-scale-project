'use client';

import { Container } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { WidgetWrapper } from '@oxygen/customer/layouts';
import React from 'react';

export default function Index() {
  const [t] = useTr();

  return (
    <WidgetWrapper>
      <Container title={t('Customer Portal')}>
        <div className='container'>
          <div id='welcome'>
            <h1>
              <span> Hello there, </span>
              Welcome to Oxygen Portals 👋
            </h1>
            <h2>This is Customer Portal</h2>
          </div>
        </div>
      </Container>
    </WidgetWrapper>
  );
}
