import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const { asset, url, note, source } = body

  if (!asset || !url) {
    return NextResponse.json({ error: 'asset + url required' }, { status: 400 })
  }

  // TODO: Replace console.log with whatever you want (Google Sheet, email, file, etc.)
  console.log(`[${asset}] ${url} ${note ? `— ${note}` : ''} (${source || 'manual'})`)

  return NextResponse.json({ status: 'ok', received: { asset, url } })
}

export async function GET() {
  return NextResponse.json({ error: 'POST only' }, { status: 405 })
}
