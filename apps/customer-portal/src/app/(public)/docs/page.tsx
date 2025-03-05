'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

import swagger from './swagger.json';
import * as S from './style';

export default function ApiDocsPage() {
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null)

/*  useEffect(() => {
    // Add Stoplight Elements styles
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/@stoplight/elements/styles.min.css';
    document.head.appendChild(link);

    return () => {
      // Clean up on unmount
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);*/


  useEffect(() => {
    if (isReady && containerRef.current) {
      // Create the elements-api element programmatically
      const elementsApi = document.createElement("elements-api")
      elementsApi.setAttribute("layout", "responsive")
      elementsApi.setAttribute("router", "hash")
      elementsApi.setAttribute("apiDescriptionDocument", JSON.stringify(swagger))

      // Clear and append
      containerRef.current.innerHTML = ""
      containerRef.current.appendChild(elementsApi)
    }
  }, [isReady])


  return (
    <S.ApiDocsContainer>
      <S.Header>
        <h1>API Documentation</h1>
      </S.Header>

      <S.Main>
        {/* Load Stoplight Elements script */}
        <Script
          src="https://unpkg.com/@stoplight/elements/web-components.min.js"
          onLoad={() => setIsReady(true)}
          strategy="afterInteractive"
        />

        {/* Render the elements-api component once the script is loaded */}
   {/*     {isReady && (
          <elements-api
            // apiDescriptionUrl="https://raw.githubusercontent.com/stoplightio/studio-demo/master/reference/todos/openapi.yaml"
            apiDescriptionDocument={JSON.stringify(swagger)}
            layout="responsive"
            hideSchemas={true}
            basePath="/docs"
            router="memory"
          />
        )}*/}

        {/* Container for the elements-api component */}
        <div ref={containerRef} id="elements-container" />
      </S.Main>
    </S.ApiDocsContainer>
  );
}

