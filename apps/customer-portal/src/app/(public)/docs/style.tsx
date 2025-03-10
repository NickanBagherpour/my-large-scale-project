import styled from "styled-components"
import { cssVar } from "@oxygen/utils"

// Styled components for the API docs
export const ApiDocsContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  overflow: hidden;

  /* Custom styling for Stoplight Elements using CSS variables */

  & elements-api {
    /* Core variables */
    --elements-border-radius: 8px;
    --elements-header-background: #2a2f45;
    --elements-header-color: white;
    --elements-border-color: #e0e0e0;
    --elements-primary-color: #3b82f6;

    /* Additional variables for better customization */
    --elements-sidebar-width: 280px;
    --elements-sidebar-background: #f8fafc;
    --elements-sidebar-border-color: #e2e8f0;
    --elements-sidebar-item-hover-background: #f1f5f9;
    --elements-sidebar-item-active-background: #e2e8f0;
    --elements-sidebar-item-active-color: #1e293b;

    /* Typography */
    --elements-heading-font-family: var(${cssVar.iransansFont});
    --elements-body-font-family: var(${cssVar.iransansFont});
    --elements-code-font-family: monospace;

    /* Make it take full height */
    height: 100% !important;
    display: block !important;
  }

  & elements-api > div {
    height: 100vh !important;
    min-height: 100vh !important;
  }

  div#mosaic-provider-react-aria-0-1 {
    min-height: 100vh;
  }

  .sl-prose {
    font-size: 14px;
  }

  .sl-font-prose, .sl-font-ui, .sl-prose {
    font-family: var(${cssVar.iransansFont});
  }

  .sl-code-highlight {
    text-align: end;
  }

  .sl-ml-16 {
    margin-left: 64px;
  }

  div[data-testid="two-column-right"].sl-relative {
    /*! @noflip */
    direction: ltr;
  }

  div.sl-overflow-y-auto > a[href^="https://stoplight.io"] {
    display: none;
  }

  div.sl-drawer a[href^="https://stoplight.io"] {
    display: none;
  }

  .sl-drawer.left {
    /*! @noflip */
    right: 0;
  }

  .TryItPanel, .sl-panel {
    /*! @noflip */
    direction: ltr;
  }

  .sl-prose ul:not(.contains-task-list) > li:before, .sl-prose ul:not(.contains-task-list) > ol > li:before {
    left: -1.6rem;
  }

  div.JsonSchemaViewer {
    /*! @noflip */
    direction: ltr;
  }

  .sl-panel__content-wrapper {
    text-align-last: right;
  }

  /* Additional styling for better appearance */

  .sl-elements-api {
    border: none !important;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  /* Improve scrolling behavior */

  .sl-overflow-y-auto {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
  }

  .sl-overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }

  .sl-overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
  }

  .sl-overflow-y-auto::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  /* Fix sidebar scroll issue */
  /* Target the sidebar container */

  .sl-flex.sl-flex-col.sl-h-full {
    height: auto !important;
    min-height: 0 !important;
    max-height: none !important;
  }

  /* Target the sidebar navigation */

  nav.sl-px-5.sl-overflow-y-auto {
    height: auto !important;
    min-height: 0 !important;
    max-height: none !important;
    overflow: visible !important;
  }

  /* Target the sidebar items container */

  .sl-flex.sl-flex-col.sl-mt-5 {
    height: auto !important;
    overflow: visible !important;
  }

  /* Only show scrollbar when content overflows viewport height */

  .sl-overflow-y-auto {
    overflow-y: auto !important;
    max-height: calc(100vh - 60px) !important; /* Adjust based on header height */
  }

  /* Fix for sidebar layout */

  .sl-elements-api > div > div:first-child {
    height: 100% !important;
  }
`

export const Header = styled.header`
  background-color: #2a2f45;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;

  h1 {
    margin: 0;
    font-size: 1.5rem;
  }
`

export const Main = styled.main`
  flex: 1;
  position: relative;
  overflow: hidden;

  & div#elements-container {
    height: 100%;
    width: 100%;
  }

  & .hidden {
    display: none;
  }

  /* Ensure the elements-api takes full height */
  & .elements-api-instance {
    height: 100% !important;
    width: 100% !important;
  }
`

export const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  z-index: 10;
  gap: 1rem;

  p {
    font-size: 1rem;
    color: #4b5563;
  }
`

