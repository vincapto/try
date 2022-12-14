import { RANGE_MAX } from '../env';

export class Player {
  constructor(track, callback) {
    this.callback = callback;
    this.state = false;
    this.run = true;
    this.track = track;
  }

  setListener(path, watchLoad = () => {}) {
    this.state = false;
    this.audioElement = new Audio(path);
    console.log('listener call');
    this.audioElement.addEventListener('loadeddata', () => {
      console.log('----loaded', this.audioElement.duration);
      this.track.setEnd(this.audioElement);
      watchLoad();
    });
    this.audioElement.addEventListener('timeupdate', (event) => {
      if (this.run) {
        console.log(this.audioElement.currentTime);
        this.track.setStart(
          this.getCurrentStep(),
          this.audioElement.currentTime
        );
      }
    });
    this.audioElement.addEventListener('ended', (event) => {
      this.audioElement.currentTime = 0;
      this.track.clearTrack();
      this.state = false;
      this.callback(this.state);
    });
  }

  getStep() {
    return RANGE_MAX / this.audioElement.duration;
  }

  getCurrentStep() {
    return this.getStep() * this.audioElement.currentTime;
  }

  changeTime(value = 1) {
    this.audioElement.currentTime =
      value * (this.audioElement.duration / RANGE_MAX);
    this.track.updateTrack(value);
  }

  changeVolume(value = 50) {
    this.audioElement.volume = value * 0.01;
  }

  stopPlayer() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.state = false;
      this.callback(this.state);
    }
  }

  setWatcher(watch) {
    this.watch = watch;
  }

  clearPlayer() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.state = false;
      this.audioElement.currentTime = 0;
      this.audioElement = null;
    }
    this.callback(this.state);
    // this.state = false;
    this.run = false;
    this.track.updateTrack(0);
  }

  play() {
    console.log('---------------------------', this.state);
    this.run = true;
    this.watch.callStop(this);
    if (this.state) {
      this.stopPlayer();
    } else {
      this.audioElement.play();
      this.state = true;
      this.callback(this.state);
    }
  }
}
