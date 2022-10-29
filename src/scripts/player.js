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
  constructor(path, track) {
    this.path = path;
    this.state = false;
    this.run = true;
    this.setListener(path, track);
  }

  setListener(path, track) {
    this.state = false;
    this.run = true;
    this.audioElement = new Audio(path);
    this.audioElement.addEventListener('timeupdate', (event) => {
      if (this.run) {
        track.value = this.getCurrentStep();
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

  play(callback) {
    this.audioElement.addEventListener('loadeddata', () => {
      console.log('loaded');
    });
    if (this.state) {
      this.audioElement.pause();
      callback(this.state);
      this.state = false;
    } else {
      this.audioElement.play();
      callback(this.state);
      this.state = true;
    }
  }
}
