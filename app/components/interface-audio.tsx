"use client";

import { useEffect } from "react";

export default function InterfaceAudio() {
  useEffect(() => {
    let audioContext: AudioContext | null = null;

    function playInterfaceClick() {
      audioContext ??= new AudioContext();
      if (audioContext.state === "suspended") {
        void audioContext.resume();
      }

      const playTone = (
        frequency: number,
        duration: number,
        volume: number,
        type: OscillatorType = "sine",
      ) => {
        if (!audioContext) return;

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const now = audioContext.currentTime;

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, now);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(volume, now + 0.002);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        oscillator.start(now);
        oscillator.stop(now + duration);
      };

      playTone(1850, 0.028, 0.012, "triangle");
      window.setTimeout(() => playTone(2850, 0.012, 0.005), 8);
    }

    document.addEventListener("click", playInterfaceClick, true);
    return () => {
      document.removeEventListener("click", playInterfaceClick, true);
      if (audioContext) void audioContext.close();
    };
  }, []);

  return null;
}
