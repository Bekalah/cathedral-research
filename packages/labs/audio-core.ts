// Clean Audio Core for Cathedral Research Labs
// Lightweight Audio core for experimental sound art and cymatic visualization

import * as Tone from "tone";

class AudioCore {
  private master: Tone.Gain | null = null;
  private analyser: Tone.Analyser | null = null;
  private synths: Record<string, Tone.PolySynth> = {};
  private inited = false;

  async init() {
    if (this.inited) return;

    // prepare master but do not start audio until user gesture
    this.master = new Tone.Gain(0.06);
    this.analyser = new Tone.Analyser("fft", 1024);

    // create a default voice for quick testing
    this.createVoice("voice-default");
    this.inited = true;

    console.log("AudioCore initialized");
  }

  async startOnGesture() {
    // call from explicit user gesture (button). Tone.start() will resume audio on some browsers.
    await Tone.start();

    if (!this.master) this.master = new Tone.Gain(0.06);
    if (!this.analyser) this.analyser = new Tone.Analyser("fft", 1024);

    // connect master -> destination and analyser probe
    this.master.toDestination();

    // connect every synth to master if not already
    Object.values(this.synths).forEach(s => s.connect(this.master!));

    // a simple analyser chain: insert a player node tapped by an analyser for getValue()
    const dummy = new Tone.Noise().start();
    const dumGain = new Tone.Gain(0.00001).connect(this.analyser!).connect(this.master!);
    dummy.connect(dumGain);

    console.log("AudioCore started on user gesture");
  }

  createVoice(id: string) {
    if (this.synths[id]) return id;

    const p = new Tone.PolySynth(Tone.Synth, {
      envelope: { attack: 0.02, decay: 0.2, sustain: 0.25, release: 0.6 },
      oscillator: { type: "sine" }
    });

    // don't auto-connect to destination; keep manual control
    this.synths[id] = p;
    return id;
  }

  trigger(id: string, freq: number, dur = 1.2) {
    const s = this.synths[id];
    if (!s) return;

    s.connect(this.master || Tone.getContext().destination);
    s.triggerAttackRelease(freq, dur);

    console.log("Tone triggered:", { id, hz: Math.round(freq) });
  }

  setMasterGain(v: number) {
    if (this.master) this.master.gain.value = v;
  }

  getFFT(): Float32Array | null {
    try {
      const val = this.analyser?.getValue();
      if (!val) return null;

      // Tone.Analyser returns number[] or Float32Array; normalise into Float32Array
      if (val instanceof Float32Array) {
        return val;
      }
      if (Array.isArray(val)) {
        return Float32Array.from(val);
      }
      return new Float32Array(1024);
    } catch (e) {
      return null;
    }
  }
}

export const audioCore = new AudioCore();
export default audioCore;
