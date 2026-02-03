"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
  const [asset, setAsset] = useState("")
  const [url, setUrl] = useState("")
  const [note, setNote] = useState("")
  const [source, setSource] = useState("")
  const [result, setResult] = useState<{ status?: string; error?: string } | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ asset, url, note, source }),
      })
      const data = await res.json()
      setResult(data)
      if (data.status === "ok") {
        setAsset("")
        setUrl("")
        setNote("")
        setSource("")
      }
    } catch {
      setResult({ error: "Failed to submit" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Market News Hook</CardTitle>
          <CardDescription>
            Submit market news for tracking. Send asset ticker and news URL.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="asset">Asset Ticker *</Label>
              <Input
                id="asset"
                placeholder="AAPL, BTC, SPY..."
                value={asset}
                onChange={(e) => setAsset(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="url">News URL *</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="note">Note (optional)</Label>
              <Textarea
                id="note"
                placeholder="Brief description..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="source">Source (optional)</Label>
              <Input
                id="source"
                placeholder="manual, webhook, rss..."
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </div>

            <Button type="submit" disabled={loading} className="mt-2">
              {loading ? "Submitting..." : "Submit News"}
            </Button>

            {result && (
              <div
                className={`p-3 rounded-md text-sm ${
                  result.status === "ok"
                    ? "bg-green-500/10 text-green-600 border border-green-500/20"
                    : "bg-destructive/10 text-destructive border border-destructive/20"
                }`}
              >
                {result.status === "ok" ? "Successfully submitted!" : result.error}
              </div>
            )}
          </form>

          <div className="mt-6 pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              API Endpoint: <code className="bg-muted px-1 py-0.5 rounded">POST /api/news</code>
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
