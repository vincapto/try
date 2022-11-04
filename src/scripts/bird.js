import { Player } from './player';
import { Track } from './track';

export class Bird {
  constructor(element) {
    this.initPlayerElement(element);
    this.initDescriptionElement(element);
    this.initAudioElement();
    this.initListener();
  }

  initAudioElement() {
    this.track = new Track(this.timeRange, this.timerStart, this.timerEnd);
    this.birdPlayer = new Player(this.track, this.watchPlay.bind(this));
    this.volumeRange.style.background = this.track.getBackgroundAt(50);
  }

  updateBird({
    image = '',
    name = '',
    species = '',
    description = '',
    audio = '',
  }) {
    this.imgElement.src = image;
    this.nameElement.innerHTML = name;
    this.birdPlayer.clearPlayer();
    audio ? this.birdPlayer.setListener(audio) : '';
    this.checkElementExist(this.speciesElement, species);
    this.checkElementExist(this.textElement, description);
  }

  checkElementExist(element, value) {
    element ? (element.innerHTML = value) : '';
  }

  initPlayerElement(element) {
    this.playerButton = element.querySelector('.player__btn');
    this.playerPause = element.querySelector('.player__playback');
    this.volumeRange = element.querySelector('.volume');
    this.timeRange = element.querySelector('.track');
    this.rangeWrapper = element.querySelector('.track-wrapper');
    this.timerStart = element.querySelector('.player__start');
    this.timerEnd = element.querySelector('.player__end');
  }

  initDescriptionElement(element) {
    this.player = element.querySelector('.player');
    this.imgElement = element.querySelector('.bird__img');
    this.nameElement = element.querySelector('.bird__name');
    this.timerStart = element.querySelector('.player__start');
    this.timerEnd = element.querySelector('.player__end');
    this.speciesElement = element.querySelector('.bird__species');
    this.textElement = element.querySelector('.bird__text');
  }

  initListener() {
    this.timeRange.addEventListener('input', (event) => {
      this.watchTime(event.target.value);
      this.birdPlayer.changeTime(event.target.value);
    });

    this.rangeWrapper.addEventListener('mousedown', (event) => {
      this.birdPlayer.run = false;
    });

    this.rangeWrapper.addEventListener('mouseup', (event) => {
      this.birdPlayer.run = true;
    });

    this.volumeRange.addEventListener('input', (event) => {
      this.watchVolume(event.target.value);
      this.volumeRange.style.background = this.track.getBackgroundAt(
        event.target.value
      );
    });

    this.playerButton.addEventListener('click', (event) => {
      this.birdPlayer.play();
    });
  }

  watchPlay(state) {
    !state
      ? this.playerPause.classList.remove('paused')
      : this.playerPause.classList.add('paused');
  }

  watchVolume(state) {
    this.birdPlayer.changeVolume(state);
  }

  watchTime(state) {
    this.birdPlayer.changeTime(state);
  }
}
