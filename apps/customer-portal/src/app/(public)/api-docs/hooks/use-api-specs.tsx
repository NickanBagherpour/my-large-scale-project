"use client"

import { useState, useEffect } from "react"
import type { ApiOption } from "../components/api-selector"

/**
 * Custom hook to manage API specifications
 */
export function useApiSpecs(initialOption: ApiOption) {
  const [selectedOption, setSelectedOption] = useState<ApiOption>(initialOption)
  const [spec, setSpec] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const loadSpecification = async (option: ApiOption) => {
    setLoading(true)
    setError(null)

    try {
      // Fetch from API endpoint instead of direct import
      const response = await fetch(`/api/auth/api-doc?version=${option.value}`)

      if (!response.ok) {
        throw new Error(`Failed to load API specification: ${response.statusText}`)
      }

      const data = await response.json()
      setSpec(data)
    } catch (error) {
      console.error("Error loading OpenAPI spec:", error)
      setError("Failed to load API specification. Please try again later.")

      // Try to load default spec as fallback
      try {
        const fallbackResponse = await fetch("/api/auth/api-doc?version=default")
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json()
          setSpec(fallbackData)
          setError("Using default API specification due to loading error.")
        }
      } catch (fallbackError) {
        console.error("Error loading fallback spec:", fallbackError)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSpecification(selectedOption)
  }, [selectedOption])

  const selectApiOption = (option: ApiOption) => {
    setSelectedOption(option)
  }

  return {
    selectedOption,
    spec,
    loading,
    error,
    selectApiOption,
    refreshSpec: () => loadSpecification(selectedOption),
  }
}

