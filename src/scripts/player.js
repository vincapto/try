export function createPlayerTag(state = false) {
  const text = state ? 'PLAY' : 'STOP';
  return `
  <div class='player'>
    <div class='player__track'>
      <div class='range-wrapper'>
        <input type='range' class='time' min=0 max=100 value=0 />
      </div>
    </div>
    <div class='player__volume'>
      <input type='range' class='volume' min=0 max=100 value=50 />
    </div>    
    <button class='play-bird'>${text}</button>
  </div>
  `;
}

export class birdPlayer {
  constructor(path, track, callback) {
    console.log('WATCH BIRD');
    this.callback = callback;
    this.path = path;
    this.state = false;
    this.track = track;
    this.run = true;
    // this.setListener(path, track);
  }

  setListener(path) {
    this.state = false;
    this.audioElement = new Audio(path);
    console.log('listener call');
    this.audioElement.addEventListener('loadeddata', () => {
      console.log('----loaded');
    });
    this.audioElement.addEventListener('timeupdate', (event) => {
      if (this.run) {
        this.track.value = this.getCurrentStep();
        console.log(this.audioElement.currentTime);
      }
    });
    this.audioElement.addEventListener('ended', (event) => {
      this.audioElement.currentTime = 0;
    });
  }

  getStep() {
    const duration = this.audioElement.duration;
    const step = 100 / duration;
    return step;
  }

  getCurrentStep() {
    return this.getStep() * this.audioElement.currentTime;
  }

  changeTime(value = 1) {
    const current = value * (this.audioElement.duration / 100);
    this.audioElement.currentTime = current;
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
