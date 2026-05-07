// 틀린 글자: Wrong.wav
import { createAudioPlayer } from "./audioPlayer";

const play = createAudioPlayer("/Wrong.wav");

export function playWrongSound(): void {
  play();
}
