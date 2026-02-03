export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST only' });
  }

  const { asset, url } = req.body || {};

  console.log('Received market news webhook:', { asset, url });

  return res.status(200).json({ received: true, asset, url });
}
