const RANGE_MAX = 500;
const VOLUME_MAX = 100;
const RANGE_SCALE = 0.5;
export function createPlayerTag(state = false) {
  // const text = state ? 'PLAY' : 'STOP';
  return `
  <div class='player'>
    <button class='btn player__btn play-bird'><span class='player__btn-pause'></span></button>
    <div class='player__track'>
        <div class='range-wrapper'>
          <input type='range' class='time' min=0 max=${RANGE_MAX} value=0 />
        </div>
          <div class='player__timer'>
            <span class='player__start'>00:00</span>
            <span class='player__end'>00:00</span>
          </div>
    </div>    
    <div class='player__volume'>
      <input type='range' class='volume' min=0 max=${VOLUME_MAX} value=50 />
    </div>        
  </div>
  `;
}

export class birdPlayer {
  constructor(path, track, callback, start, end) {
    console.log('WATCH BIRD');
    this.callback = callback;
    this.path = path;
    this.state = false;
    this.track = track;
    this.run = true;
    this.start = start;

    this.end = end;
    // this.setListener(path, track);
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
    this.audioElement.pause();
    this.audioElement.currentTime = 0;
    this.audioElement = null;
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
