import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Map of version identifiers to file paths
const API_SPEC_MAPPING: Record<string, string> = {
  "OXYGEN_SERVICES": "public/api-specs/oxygen-services.json",
  "OXYGEN_SERVICES_V2": "public/api-specs/oxygen-services-v2.json",
  "USER_MANAGEMENT": "public/api-specs/user-management.json",
  "DEFAULT": "public/api-specs/oxygen-services.json",
}

// External API endpoints (optional)
const EXTERNAL_API_ENDPOINTS: Record<string, string> = {
  "EXTERNAL_V1": "https://your-api-domain.com/specs/v1.json",
  "EXTERNAL_V2": "https://your-api-domain.com/specs/v2.json",
}

export async function GET(request: NextRequest) {
  try {
    // Get the version from query parameters
    const searchParams = request.nextUrl.searchParams
    const version = searchParams.get("version") || "default"

    // Check if we need to fetch from an external endpoint
    if (version.startsWith("EXTERNAL_")) {
      const externalUrl = EXTERNAL_API_ENDPOINTS[version]

      if (!externalUrl) {
        return NextResponse.json({ error: "External API specification not found" }, { status: 404 })
      }

      // Fetch from external URL
      const response = await fetch(externalUrl)

      if (!response.ok) {
        throw new Error(`Failed to fetch external API spec: ${response.statusText}`)
      }

      const data = await response.json()
      return NextResponse.json(data)
    }

    // Get the file path from the mapping
    const filePath = API_SPEC_MAPPING[version]

    if (!filePath) {
      return NextResponse.json({ error: "API specification version not found" }, { status: 404 })
    }

    // Read the file from the file system
    const absolutePath = path.join(process.cwd(), filePath)

    // Check if file exists
    if (!fs.existsSync(absolutePath)) {
      return NextResponse.json({ error: "API specification file not found" }, { status: 404 })
    }

    // Read and parse the JSON file
    const fileContent = fs.readFileSync(absolutePath, "utf8")
    const jsonData = JSON.parse(fileContent)

    // Return the JSON data
    return NextResponse.json(jsonData)
  } catch (error) {
    console.error("Error serving API specification:", error)

    return NextResponse.json({ error: "Failed to load API specification" }, { status: 500 })
  }
}

