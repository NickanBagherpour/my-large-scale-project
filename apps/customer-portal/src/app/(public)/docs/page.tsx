'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Script from 'next/script';

// Import your swagger JSON
import swagger from './swagger.json';
import * as S from './style';
import { Loading } from '@oxygen/ui-kit';

export default function ApiDocsPage() {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to fix sidebar scroll issues
  const fixSidebarScroll = useCallback(() => {
    if (containerRef.current) {
      // Find the sidebar elements
      const sidebar = containerRef.current.querySelector('nav.sl-px-5.sl-overflow-y-auto');
      const sidebarContainer = containerRef.current.querySelector('.sl-flex.sl-flex-col.sl-h-full');
      const sidebarItems = containerRef.current.querySelector('.sl-flex.sl-flex-col.sl-mt-5');

      if (sidebar) {
        // Check if content is shorter than the viewport
        const sidebarContent = sidebar.querySelector('ul') || sidebar;
        const contentHeight = sidebarContent.scrollHeight;
        const viewportHeight = window.innerHeight - 60; // Adjust for header

        if (contentHeight <= viewportHeight) {
          // Content fits, remove scrollbar
          ;(sidebar as HTMLElement).style.overflowY = 'visible'
          ;(sidebar as HTMLElement).style.height = 'auto'
          ;(sidebar as HTMLElement).style.maxHeight = 'none';
        } else {
          // Content doesn't fit, ensure scrollbar works properly
          ;(sidebar as HTMLElement).style.overflowY = 'auto'
          ;(sidebar as HTMLElement).style.maxHeight = `${viewportHeight}px`;
        }
      }

      // Fix container heights
      if (sidebarContainer) {
        ;(sidebarContainer as HTMLElement).style.height = 'auto'
        ;(sidebarContainer as HTMLElement).style.minHeight = '0';
      }

      if (sidebarItems) {
        ;(sidebarItems as HTMLElement).style.height = 'auto'
        ;(sidebarItems as HTMLElement).style.overflow = 'visible';
      }
    }
  }, []);

  // Function to ensure elements take full height
  const ensureFullHeight = useCallback(() => {
    if (containerRef.current) {
      const elementsApi = containerRef.current.querySelector('elements-api');
      if (elementsApi) {
        // Force height on the element and its children
        elementsApi.setAttribute('style', 'height: 100% !important; display: block !important;');

        // Find the main content div
        const mainContent = elementsApi.querySelector('div');
        if (mainContent) {
          mainContent.setAttribute('style', 'height: 100vh !important; min-height: 100vh !important;');
        }

        // Find other important containers
        const containers = elementsApi.querySelectorAll('.sl-elements-api, .sl-overflow-y-auto');
        containers.forEach((container) => {
          ;(container as HTMLElement).style.height = '100%'
          ;(container as HTMLElement).style.minHeight = '100%';
        });

        // Fix sidebar scroll issues
        fixSidebarScroll();
      }
    }
  }, [fixSidebarScroll]);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (isReady && containerRef.current) {
      setIsLoading(true);

      // Create the elements-api element programmatically
      const elementsApi = document.createElement('elements-api');
      elementsApi.setAttribute('layout', 'responsive');
      elementsApi.setAttribute('router', 'memory');
      elementsApi.setAttribute('apiDescriptionDocument', JSON.stringify(swagger));
      elementsApi.setAttribute('hideSchemas', 'true');
      elementsApi.setAttribute('hideTryIt', 'true');
      elementsApi.setAttribute('hideExport', 'true');

      // Add class for styling
      elementsApi.className = 'elements-api-instance';

      // Listen for the component to be fully loaded
      elementsApi.addEventListener('ready', () => {
        setIsLoading(false);
        // Apply height fixes after component is ready
        setTimeout(() => {
          ensureFullHeight();
        }, 100);
      });

      // Clear and append
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(elementsApi);

      // Fallback in case the ready event doesn't fire
      setTimeout(() => {
        setIsLoading(false);
        ensureFullHeight();
      }, 2000);

      // Add resize listener to ensure height is maintained
      window.addEventListener('resize', ensureFullHeight);

      return () => {
        window.removeEventListener('resize', ensureFullHeight);
      };
    }
  }, [isReady, ensureFullHeight]);

  return (
    <S.ApiDocsContainer>
      <S.Main>
        {/* Load Stoplight Elements script */}
        <Script
          src="https://unpkg.com/@stoplight/elements/web-components.min.js"
          onLoad={() => setIsReady(true)}
          strategy="afterInteractive"
        />

        {/* Loading indicator */}
        {(isLoading || !isReady) && (
          <S.LoadingContainer>
            <Loading />
            <p>Loading API documentation...</p>
          </S.LoadingContainer>
        )}

        {/* Container for the elements-api component */}
        <div ref={containerRef} id="elements-container" className={isLoading || !isReady ? 'hidden' : ''} />
      </S.Main>
    </S.ApiDocsContainer>
  );
}

