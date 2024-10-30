'use client';

import styled from 'styled-components';

import {
  Button,
  Box,
  Select,
  TabsProps,
  Switch,
  Tabs,
  Chip,
  Container,
  Table,
  Divider,
  MenuItemType,
} from '@oxygen/ui-kit';
import { FilterPopover, FilterType } from '@oxygen/reusable-components';
import { useTr } from '@oxygen/translation';
import { CardWithToggle } from '@oxygen/reusable-components';
import { WidgetWrapper } from '@oxygen/layouts';
import React from 'react';


export default function Index() {
  const [t] = useTr();

  return (
    <WidgetWrapper>
      <Container title={t('Business Portal')}>

        <div className='container'>
          <div id='welcome'>
            <h1>
              <span> Hello there, </span>
              Welcome to Oxygen Portals 👋
            </h1>
            <h2>This is Business Portal</h2>
          </div>
        </div>

      </Container>
    </WidgetWrapper>
  );
}
