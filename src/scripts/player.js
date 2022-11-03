export const RANGE_MAX = 500;
export const VOLUME_MAX = 100;
export const RANGE_SCALE = 0.5;

class Track {
  constructor(track, start, end) {
    this.track = track;
    this.start = start;
    this.end = end;
  }

  getBackgroundAt(fill) {
    return (
      'linear-gradient(to right, rgb(0, 188, 140) 0%, rgb(61, 133, 140) ' +
      fill +
      '%, rgb(115, 115, 115) ' +
      fill +
      '%, rgb(115, 115, 115) 100%)'
    );
  }

  fillTrack(value) {
    const fill = (value / RANGE_MAX) * 100;
    return this.getBackgroundAt(fill);
  }

  getTimerFormat(current) {
    const str = current + '';
    if (str.length < 2) {
      return '0' + str;
    } else {
      return str;
    }
  }

  getTimerDisplay(time) {
    const minutes = this.getTimerFormat(parseInt(time / 60));
    const seconds = this.getTimerFormat(time % 60);
    return { minutes, seconds };
  }

  setTime(element, audio) {
    const { minutes, seconds } = this.getTimerDisplay(
      audio.duration.toFixed(0)
    );
    element.innerText = `${minutes}:${seconds}`;
  }

  setStart(audio) {
    this.setTime(this.start, audio);
  }

  setEnd(audio) {
    this.setTime(this.end, audio);
  }
}

export class Player {
  constructor(path, track, callback, start, end) {
    console.log(track);
    this.callback = callback;
    this.path = path;
    this.state = false;
    this.run = true;
    this.track = new Track(track, start, end);
    this.track = track;
    this.start = start;
    this.end = end;
  }

  getBackgroundAt(fill) {
    return (
      'linear-gradient(to right, rgb(0, 188, 140) 0%, rgb(61, 133, 140) ' +
      fill +
      '%, rgb(115, 115, 115) ' +
      fill +
      '%, rgb(115, 115, 115) 100%)'
    );
  }

  fillTrack(value) {
    const fill = (value / RANGE_MAX) * 100;
    return this.getBackgroundAt(fill);
  }

  getTimerFormat(current) {
    const str = current + '';
    if (str.length < 2) {
      return '0' + str;
    } else {
      return str;
    }
  }

  getTimerDisplay(time) {
    const minutes = this.getTimerFormat(parseInt(time / 60));
    const seconds = this.getTimerFormat(time % 60);
    return { minutes, seconds };
  }

  setEndTime() {
    const { minutes, seconds } = this.getTimerDisplay(
      this.audioElement.duration.toFixed(0)
    );
    this.end.innerText = `${minutes}:${seconds}`;
  }

  setStartTime() {
    const { minutes, seconds } = this.getTimerDisplay(
      this.audioElement.currentTime.toFixed(0)
    );
    this.start.innerText = `${minutes}:${seconds}`;
  }

  setListener(path) {
    this.state = false;
    this.audioElement = new Audio(path);
    console.log('listener call');
    this.audioElement.addEventListener('loadeddata', () => {
      console.log('----loaded', this.audioElement.duration);
      this.setEndTime(this.audioElement.duration);
    });
    this.audioElement.addEventListener('timeupdate', (event) => {
      if (this.run) {
        this.track.value = this.getCurrentStep();
        this.track.style.background = this.fillTrack(this.track.value);
        console.log(this.audioElement.currentTime);
        this.setStartTime();
      }
    });
    this.audioElement.addEventListener('ended', (event) => {
      this.audioElement.currentTime = 0;
    });
  }

  getStep() {
    const duration = this.audioElement.duration;
    const step = RANGE_MAX / duration;
    return step;
  }

  getCurrentStep() {
    return this.getStep() * this.audioElement.currentTime;
  }

  changeTime(value = 1) {
    const current = value * (this.audioElement.duration / RANGE_MAX);
    this.audioElement.currentTime = current;
    this.track.style.background = this.fillTrack(this.track.value);
  }

  changeVolume(value = 50) {
    console.log(value * 0.01);
    this.audioElement.volume = value * 0.01;
  }

  clearPlayer() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
      this.audioElement = null;
    }
    this.state = false;
    this.run = false;
    this.track.value = 0;
    this.track.style.background = this.getBackgroundAt(0);
  }

  play() {
    this.run = true;
    if (this.state) {
      this.audioElement.pause();
      this.callback(this.state);
      this.state = false;
    } else {
      this.audioElement.play();
      this.callback(this.state);
      this.state = true;
    }
  }
}
