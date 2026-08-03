/**
 * Audio Manager using Web Audio API to synthesize retro game sound effects
 * directly in the browser without external static assets.
 */

class AudioManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // AudioContext will be initialized on first user interaction to comply with browser policies.
    if (typeof window !== "undefined" && window.localStorage) {
      this.isMuted = localStorage.getItem("olimpiade_muted") === "true";
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof window.AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    // Resume context if it was suspended (common browser security policy)
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("olimpiade_muted", String(muted));
    }
  }

  public getMute(): boolean {
    return this.isMuted;
  }

  public playCorrect() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      
      // Play a happy arpeggio (C5 then G5)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(783.99, now + 0.08); // G5
      
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {
      console.warn("Web Audio API failed or blocked:", e);
    }
  }

  public playIncorrect() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      
      // Play a low, brief buzzing sound (F3 down to C3)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "triangle";
      osc.frequency.setValueAtTime(174.61, now); // F3
      osc.frequency.linearRampToValueAtTime(130.81, now + 0.25); // C3
      
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {
      console.warn("Web Audio API failed or blocked:", e);
    }
  }

  public playPop() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {
      console.warn("Web Audio API failed or blocked:", e);
    }
  }

  public playComplete() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      
      // Play an uplifting, triumphant major chord progression (C5 -> E5 -> G5 -> C6)
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, index) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + index * 0.1);
        
        gain.gain.setValueAtTime(0.12, now + index * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, now + index * 0.1 + 0.5);
        
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        
        osc.start(now + index * 0.1);
        osc.stop(now + index * 0.1 + 0.5);
      });
    } catch (e) {
      console.warn("Web Audio API failed or blocked:", e);
    }
  }

  public playSparkle() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // High twinkling notes
      [1046.5, 1318.5, 1567.98, 2093.0].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.08, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.25);
      });
    } catch (e) {
      console.warn("Sparkle audio error:", e);
    }
  }

  public playRobotBeep() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(880, now + 0.08);
      osc.frequency.setValueAtTime(660, now + 0.16);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.28);
    } catch (e) {
      console.warn("Robot audio error:", e);
    }
  }

  private bgmInterval: ReturnType<typeof setInterval> | null = null;

  public startBgm() {
    if (this.isMuted || this.bgmInterval) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      // Gentle C-Major Pentatonic cheerful loop (C4, D4, E4, G4, A4, C5)
      const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
      let step = 0;

      this.bgmInterval = setInterval(() => {
        if (this.isMuted || !this.ctx) return;
        const now = this.ctx.currentTime;
        const note = scale[step % scale.length];
        step++;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(note, now);
        gain.gain.setValueAtTime(0.03, now); // Very soft low volume
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
      }, 500); // 120 bpm soft pulse
    } catch (e) {
      console.warn("BGM error:", e);
    }
  }

  public stopBgm() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const audioManager = new AudioManager();
