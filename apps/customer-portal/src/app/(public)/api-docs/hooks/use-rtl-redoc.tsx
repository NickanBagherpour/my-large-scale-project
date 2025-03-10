"use client"

import { useEffect } from "react"

/**
 * Hook to apply additional RTL fixes to Redoc after it's mounted
 */
export function useRtlRedoc() {
  useEffect(() => {
    // Function to apply RTL fixes to dynamically loaded content
    const applyRtlFixes = () => {
      // Fix code blocks that might be dynamically added
      const codeBlocks = document.querySelectorAll(".redoc-wrap pre, .redoc-wrap code")
      codeBlocks.forEach((block) => {
        block.setAttribute("dir", "ltr")
        ;(block as HTMLElement).style.textAlign = "left"
      })

      // Fix request/response examples
      const examples = document.querySelectorAll('.redoc-wrap [data-section-id] [class*="Example"]')
      examples.forEach((example) => {
        example.setAttribute("dir", "ltr")
        ;(example as HTMLElement).style.textAlign = "left"
      })
    }

    // Apply fixes immediately
    applyRtlFixes()

    // Set up a mutation observer to handle dynamically added content
    const observer = new MutationObserver((mutations) => {
      applyRtlFixes()
    })

    // Start observing the document with the configured parameters
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
    }
  }, [])
}

