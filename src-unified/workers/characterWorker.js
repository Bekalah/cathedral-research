// characterWorker.js - Off-main-thread character task runner
// Contract: receives { type, payload } and returns { ok, data } messages

self.onmessage = async (e) => {
  const msg = e.data || {};
  try {
    switch (msg.type) {
      case 'GENERATE_ART': {
        // Lightweight, deterministic placeholder for long-running generative tasks
        const seed = (msg.payload?.seed ?? 1) >>> 0;
        const points = generateSacredGeometry(seed, 128);
        self.postMessage({ ok: true, data: { points, seed } });
        break;
      }
      case 'SOUND_PATTERN': {
        const seed = (msg.payload?.seed ?? 2) >>> 0;
        const pattern = pseudoRandomSequence(seed, 64);
        self.postMessage({ ok: true, data: { pattern, seed } });
        break;
      }
      default:
        self.postMessage({ ok: false, error: 'Unknown message type' });
    }
  } catch (err) {
    self.postMessage({ ok: false, error: String(err) });
  }
};

function pseudoRandomSequence(seed, length) {
  let x = seed >>> 0;
  const out = [];
  for (let i = 0; i < length; i++) {
    x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
    out.push((x >>> 0) / 0xffffffff);
  }
  return out;
}

function generateSacredGeometry(seed, n) {
  // Generate a simple rosette/polygon for preview, off-thread
  const pts = [];
  const prng = pseudoRandomSequence(seed, n);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const r = 0.6 + prng[i] * 0.3;
    pts.push({ x: Math.cos(a) * r, y: Math.sin(a) * r });
  }
  return pts;
}
