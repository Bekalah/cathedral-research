// packages/labs/audio/audio-core.ts// packages/labs/audio/audio-core.ts

// Lightweight Audio core for experimental labs.// Lightweight Audio core for experimental labs.

// ND-safe: requires explicit startOnGesture() to resume AudioContext.// ND-safe: requires explicit startOnGesture() to resume AudioContext.

import { cathedralMatrix } from "../../tesseract-bridge/ConnectionMatrix.js";import { cathedralMatrix } from "../../tesseract-bridge/ConnectionMatrix.js";

import * as Tone from "tone";import * as Tone from "tone";



class AudioCore {class AudioCore {

  private master: Tone.Gain | null = null;  private master: Tone.Gain | null = null;

  private analyser: Tone.Analyser | null = null;  private analyser: Tone.Analyser | null = null;

  private synths: Record<string, Tone.PolySynth> = {};  private synths: Record<string, Tone.PolySynth> = {};

  private inited = false;  private inited = false;



  async init(){  async init(){

    if(this.inited) return;    if(this.inited) return;

    // prepare master but do not start audio until user gesture    // prepare master but do not start audio until user gesture

    this.master = new Tone.Gain(0.06);    this.master = new Tone.Gain(0.06);

    this.analyser = new Tone.Analyser("fft", 1024);    this.analyser = new Tone.Analyser("fft", 1024);

    // connect analyser -> master -> destination only after startOnGesture    // connect analyser -> master -> destination only after startOnGesture

    // create a default voice for quick testing    // create a default voice for quick testing

    this.createVoice("voice-default");    this.createVoice("voice-default");

    this.inited = true;    this.inited = true;

    cathedralMatrix.emit("audioInited", { ok: true });    cathedralMatrix.emit("audioInited", { ok: true });

  }  }



  async startOnGesture(){  async startOnGesture(){

    // call from explicit user gesture (button). Tone.start() will resume audio on some browsers.    // call from explicit user gesture (button). Tone.start() will resume audio on some browsers.

    await Tone.start();    await Tone.start();

    if(!this.master) this.master = new Tone.Gain(0.06);    if(!this.master) this.master = new Tone.Gain(0.06);

    if(!this.analyser) this.analyser = new Tone.Analyser("fft", 1024);    if(!this.analyser) this.analyser = new Tone.Analyser("fft", 1024);

    // connect master -> destination and analyser probe    // connect master -> destination and analyser probe

    this.master.toDestination();    this.master.toDestination();

    // connect every synth to master if not already    // connect every synth to master if not already

    Object.values(this.synths).forEach(s=> s.connect(this.master!));    Object.values(this.synths).forEach(s=> s.connect(this.master!));

    // a simple analyser chain: insert a player node tapped by an analyser for getValue()    // a simple analyser chain: insert a player node tapped by an analyser for getValue()

    const dummy = new Tone.Noise().start();    const dummy = new Tone.Noise().start();

    const dumGain = new Tone.Gain(0.00001).connect(this.analyser!).connect(this.master!);    const dumGain = new Tone.Gain(0.00001).connect(this.analyser!).connect(this.master!);

    dummy.connect(dumGain);    dummy.connect(dumGain);

    cathedralMatrix.emit("audioStarted", { time: Date.now() });    cathedralMatrix.emit("audioStarted", { time: Date.now() });

  }  }



  createVoice(id:string){  createVoice(id:string){

    if(this.synths[id]) return id;    if(this.synths[id]) return id;

    const p = new Tone.PolySynth(Tone.Synth, {    const p = new Tone.PolySynth(Tone.Synth, {

      envelope:{ attack: 0.02, decay:0.2, sustain:0.25, release:0.6 },      envelope:{ attack: 0.02, decay:0.2, sustain:0.25, release:0.6 },

      oscillator:{ type:"sine" }      oscillator:{ type:"sine" }

    });    });

    // don't auto-connect to destination; keep manual control    // don't auto-connect to destination; keep manual control

    this.synths[id] = p;    this.synths[id] = p;

    return id;    return id;

  }  }



  trigger(id:string, freq:number, dur=1.2){  trigger(id:string, freq:number, dur=1.2){

    const s = this.synths[id];    const s = this.synths[id];

    if(!s) return;    if(!s) return;

    s.connect(this.master || Tone.getContext().destination);    s.connect(this.master || Tone.getContext().destination);

    s.triggerAttackRelease(freq, dur);    s.triggerAttackRelease(freq, dur);

    cathedralMatrix.emit("toneChange", { id, hz: Math.round(freq) });    cathedralMatrix.emit("toneChange", { id, hz: Math.round(freq) });

  }  }



  setMasterGain(v:number){  setMasterGain(v:number){

    if(this.master) this.master.gain.value = v;    if(this.master) this.master.gain.value = v;

  }  }



  getFFT(): Float32Array | null {  getFFT(): Float32Array | null {

    try{    try{

      const val = this.analyser?.getValue();      const val = this.analyser?.getValue();

      if(!val) return null;      if(!val) return null;

      // Tone.Analyser returns number[] or Float32Array; normalise into Float32Array      // Tone.Analyser returns number[] or Float32Array; normalise into Float32Array

      return (val as any) instanceof Float32Array ? (val as Float32Array) : Float32Array.from(val as number[]);      return (val as any) instanceof Float32Array ? (val as Float32Array) : Float32Array.from(val as number[]);

    }catch(e){    }catch(e){

      return null;      return null;

    }    }

  }  }

}}



export const audioCore = new AudioCore();export const audioCore = new AudioCore();

export default audioCore;export default audioCore;
