import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  try {
    let visitCount = (await kv.get('visitCount')) || 0;
    if (req.method === 'POST') {
      visitCount += 1;
      await kv.set('visitCount', visitCount);
    }
    res.status(200).json({ visitCount });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}