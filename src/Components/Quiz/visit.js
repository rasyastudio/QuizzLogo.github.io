// api/visit.js
import { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv'; // Vercel KV untuk menyimpan data

export default async function handler(req, res) {
  try {
    // Ambil jumlah kunjungan saat ini
    let visitCount = (await kv.get('visitCount')) || 0;

    if (req.method === 'POST') {
      // Tambah 1 ke kunjungan
      visitCount = visitCount + 1;
      await kv.set('visitCount', visitCount);
    }

    // Kembalikan jumlah kunjungan
    res.status(200).json({ visitCount });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}