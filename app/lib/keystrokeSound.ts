// 맞은 글자: typewriter-single-key-type-1.wav (재생마다 피치 ±5%)
import { createAudioPlayer } from "./audioPlayer";

const play = createAudioPlayer("/typewriter-single-key-type-1.wav");

function ratioToDetuneCents(ratio: number): number {
  return 1200 * Math.log2(ratio);
}

export function playKeystrokeSound(): void {
  const ratio = 0.95 + Math.random() * 0.1;
  play(ratioToDetuneCents(ratio));
}
