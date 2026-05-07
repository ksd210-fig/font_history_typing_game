// Web Audio API 공통 플레이어 팩토리

let sharedContext: AudioContext | null = null;

function getContext(): AudioContext {
  if (!sharedContext) {
    sharedContext = new AudioContext();
  }
  return sharedContext;
}

export function createAudioPlayer(url: string) {
  let bufferPromise: Promise<AudioBuffer> | null = null;

  function loadBuffer(ctx: AudioContext): Promise<AudioBuffer> {
    if (!bufferPromise) {
      bufferPromise = fetch(url)
        .then((res) => res.arrayBuffer())
        .then((ab) => ctx.decodeAudioData(ab));
    }
    return bufferPromise;
  }

  return function play(detuneCents = 0): void {
    const ctx = getContext();
    void ctx.resume();
    void loadBuffer(ctx)
      .then((buffer) => {
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        if (detuneCents !== 0) source.detune.value = detuneCents;
        source.connect(ctx.destination);
        source.start(0);
      })
      .catch(() => {});
  };
}
