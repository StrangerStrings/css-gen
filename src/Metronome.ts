export class Metronome {
  private playing: boolean = false;
  private audioContext: AudioContext;
  private nextTickTime: number;
  private scheduleAheadTime = 0.1; // in seconds
  private _bpm: number;
  private tickLength: number;
  private intervalId: number | undefined;
  private beatCounter: number = 1;
  private beatCallback: (beat: number) => void;

  constructor(bpm: number, beatCallback: (beat: number) => void) {
    const AudioContext = window.AudioContext;
    this.audioContext = new AudioContext();
    this._bpm = bpm;
    this.tickLength = 60.0 / this._bpm;
    this.nextTickTime = this.audioContext.currentTime;
    this.beatCallback = beatCallback;
  }

  private scheduleTick() {
    this.beatCallback(this.beatCounter);
    this.beatCounter = this.beatCounter % 16 + 1;
    this.nextTickTime += this.tickLength;
  }

  stopstart() {
    if (this.playing) {
      this.stop();
    } else {
      this.start();
    }
  }

  start() {
    this.intervalId = window.setInterval(() => {
      while (this.nextTickTime < this.audioContext.currentTime + this.scheduleAheadTime) {
        this.scheduleTick();
      }
    }, this.scheduleAheadTime * 1000);
    this.playing = true;
  }
  
  stop() {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
    }
    this.playing = false;
  }

  resetBeat() {
    this.beatCounter = 1;
  }

  shift(fraction: number) {
    this.nextTickTime += this.tickLength * fraction;
  }

  set bpm(newBpm: number) {
    this._bpm = newBpm;
    this.tickLength = 60.0 / this._bpm;
  }
}
