// 틀린 글자: Wrong.wav

const WRONG_URL = "/Wrong.wav";

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
    bufferPromise = fetch(WRONG_URL)
      .then((res) => res.arrayBuffer())
      .then((ab) => ctx.decodeAudioData(ab));
  }
  return bufferPromise;
}

export function playWrongSound(): void {
  const ctx = getContext();
  void ctx.resume();

  void loadBuffer(ctx)
    .then((buffer) => {
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
    })
    .catch(() => {});
}
