export default (req, res) => {
  if (req.method !== 'POST') return res.status(405).end('POST only');
  const { asset, url, note, source } = req.body || {};
  if (!asset || !url) return res.status(400).json({ error: 'asset + url required' });

  // TODO: Replace console.log with whatever you want (Google Sheet, email, file, etc.)
  console.log(`[${asset}] ${url} ${note ? `— ${note}` : ''} (${source || 'manual'})`);

  return res.json({ status: 'ok', received: { asset, url } });
};
