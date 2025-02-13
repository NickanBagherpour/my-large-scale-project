'use client';

// import { useState, useEffect } from 'react';
// import { API } from '@stoplight/elements';
import '@stoplight/elements/styles.min.css';
import dynamic from 'next/dynamic';

import swagger from './swagger.json';
import * as S from './style';


interface APIProps {
  httpClient?: (url: string, options: RequestInit) => Promise<Response>;
}

const API = dynamic(() => import('@stoplight/elements').then((mod) => mod.API), {
  ssr: false,
});


const Index = () => {
  // const [mounted, setMounted] = useState(false);

  const customHttpClient = async (url: string, options: RequestInit) => {

    console.log('1312312313131313131313131', url);

    const proxyUrl = `${window.location.origin}/api/auth/proxy?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl, options);
    return response;
  };


  return (
    <S.Container className="container">
      <API
        layout={'responsive'}
        apiDescriptionDocument={swagger}
        hideSchemas={true}
        router="history"
        // layout="sidebar"
        // outerRouter={true}
        // tryItCredentialsPolicy="include"
        basePath="/docs"
        // tryItCorsProxy={'http://localhost:3000/api/auth/proxy?'}
        // tryItCorsProxy={`${window.location.origin}/api/auth/proxy?`}
        // tryItCredentialsPolicy={'same-origin'}
        // httpClient={customHttpClient}
        // staticRouterPath={'/docs'}
        // httpClient={customHttpClient}

      />
    </S.Container>
  );
};

export default Index;
