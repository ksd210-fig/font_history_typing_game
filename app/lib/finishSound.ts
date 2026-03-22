// 모달 열릴 때: Finish.wav

const FINISH_URL = "/Finish.wav";

let audio: HTMLAudioElement | null = null;

export function playFinishSound(): void {
  if (!audio) {
    audio = new Audio(FINISH_URL);
    audio.preload = "auto";
    void audio.load();
  }
  audio.currentTime = 0;
  void audio.play().catch(() => {});
}
