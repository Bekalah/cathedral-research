// tiny tesseract pub/sub bridge (append-only simple implementation)
const channels = {};
export const tesseract = {
  publish(channel, payload) {
    (channels[channel] || []).forEach(h => {
      try { h(payload); } catch(e){ console.warn('tesseract handler', e); }
    });
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('tesseract:' + channel, { detail: payload }));
    }
  },
  subscribe(channel, handler) {
    channels[channel] = channels[channel] || [];
    channels[channel].push(handler);
    return () => { channels[channel] = (channels[channel] || []).filter(h => h !== handler); };
  }
};
if (typeof window !== 'undefined') window.tesseract = window.tesseract || tesseract;
