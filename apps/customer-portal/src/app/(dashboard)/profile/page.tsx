'use client';

import { Container } from '@oxygen/ui-kit';
import { useTr } from '@oxygen/translation';
import { WidgetWrapper } from '@oxygen/customer/layouts';
import React, { useEffect } from 'react';
import { client } from '@oxygen/client';
import { useSession } from 'next-auth/react';

export default function Index() {
  const [t] = useTr();

  const { data: session } = useSession();

  console.log('session from client component', session);

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await client.get('/api/auth/ip');
        return response.data; // This will contain the IP address
      } catch (error) {
        console.error('Error fetching IP:', error);
        throw error; // Re-throw the error for further handling if needed
      }
    };

    fetchIp();
  }, []);


  return (
    <WidgetWrapper>
      <Container title={t('Customer Portal')}>
        <div className="container">
          <div id="welcome">
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
