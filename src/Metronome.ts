export class Metronome {
  private playing: boolean = false;
  private audioContext: AudioContext;
  private nextTickTime: number;
  private scheduleAheadTime = 0.1; // in seconds
  private _bpm: number;
   _beatsInLoop: number = 32;
  private tickLength: number;
  private intervalId: number | undefined;
  private beatCounter: number = 0;
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
    console.log('ticking');
    
    this.beatCallback(this.beatCounter);
    this.beatCounter = (this.beatCounter + 1) % this._beatsInLoop;
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
    this.resetBeat();
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
    this.resetBeat();
    this.playing = false;
  }

  resetBeat() {
    this.beatCounter = 0;
  }

  shift(shiftAmount: number) {
    if (shiftAmount >= 1) {
      this.beatCounter = (this.beatCounter + shiftAmount) % this._beatsInLoop;
    } else {
      this.nextTickTime += this.tickLength * shiftAmount;
    }
  }

  changeBpm(change: number) {
    this._bpm += change;
    this.tickLength = 60.0 / this._bpm;
  }

  beatsInLoop(newValue: number) {
    this._beatsInLoop = newValue;
    // todo: make this counter reset... only reset if it's getting smaller
    //        and try stay on the same beat (whatever that means - 7 goes to 3 i think)
    this.beatCounter = 0;
  }
}
