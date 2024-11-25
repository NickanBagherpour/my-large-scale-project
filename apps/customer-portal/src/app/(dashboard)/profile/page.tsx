'use client';

import React from 'react';

import { Container } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { WidgetWrapper } from '@oxygen/customer/layouts';
import { EmptyState } from '@oxygen/reusable-components';

export default function Index() {
  const [t] = useTr();

  return (
    <WidgetWrapper>
      <Container title={t('common.dashboard')}>
        <EmptyState description={t('message.no_request')} />
      </Container>
    </WidgetWrapper>
  );
}
