// 맞은 글자: typewriter-single-key-type-1.wav (재생마다 피치 ±5%)

const KEYSTROKE_URL = "/typewriter-single-key-type-1.wav";

let context: AudioContext | null = null;
let bufferPromise: Promise<AudioBuffer> | null = null;

function getContext(): AudioContext {
  if (!context) {
    context = new AudioContext();
  }
  return context;
}

function loadBuffer(ctx: AudioContext): Promise<AudioBuffer> {
  if (!bufferPromise) {
    bufferPromise = fetch(KEYSTROKE_URL)
      .then((res) => res.arrayBuffer())
      .then((ab) => ctx.decodeAudioData(ab));
  }
  return bufferPromise;
}

function ratioToDetuneCents(ratio: number): number {
  return 1200 * Math.log2(ratio);
}

export function playKeystrokeSound(): void {
  const ctx = getContext();
  void ctx.resume();

  void loadBuffer(ctx)
    .then((buffer) => {
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const ratio = 0.95 + Math.random() * 0.1;
      source.detune.value = ratioToDetuneCents(ratio);
      source.connect(ctx.destination);
      source.start(0);
    })
    .catch(() => {});
}
