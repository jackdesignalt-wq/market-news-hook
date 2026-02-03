export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Market News Hook</h1>
        <p className="text-muted-foreground">
          API endpoint ready at <code className="bg-muted px-2 py-1 rounded text-sm">/api/news</code>
        </p>
        <div className="text-left bg-muted/50 p-4 rounded-lg">
          <p className="text-sm font-medium mb-2">Usage:</p>
          <pre className="text-xs overflow-x-auto">
{`POST /api/news
{
  "asset": "AAPL",
  "url": "https://example.com/news",
  "note": "Optional note",
  "source": "manual"
}`}
          </pre>
        </div>
      </div>
    </main>
  )
}
