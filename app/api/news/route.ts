import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { asset, url, note, source } = body || {}

    if (!asset || !url) {
      return NextResponse.json({ error: "asset + url required" }, { status: 400 })
    }

    // TODO: Replace console.log with whatever you want (Google Sheet, email, file, etc.)
    console.log(`[${asset}] ${url} ${note ? `— ${note}` : ""} (${source || "manual"})`)

    return NextResponse.json({ status: "ok", received: { asset, url } })
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "POST only - send { asset, url, note?, source? }" },
    { status: 405 }
  )
}
