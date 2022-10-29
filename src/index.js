import './styles/index.scss';
import { createPlayerTag, birdPlayer } from './scripts/player';
import birdData from './data';

const audioDraft = birdData[0][0].audio;
const container = document.querySelector('.container');
container.innerHTML = createPlayerTag(audioDraft);

const playerButton = document.querySelector('.play-bird');
const volumeRange = document.querySelector('.volume');
const timeRange = document.querySelector('.time');
const rangeWrapper = document.querySelector('.range-wrapper');

const birdExample = new birdPlayer(audioDraft, timeRange);

timeRange.addEventListener('input', (event) => {
  watchTime(event.target.value);
});

rangeWrapper.addEventListener('mousedown', (event) => {
  birdExample.run = false;
});

rangeWrapper.addEventListener('mouseup', (event) => {
  birdExample.run = true;
});

volumeRange.addEventListener('input', (event) => {
  watchVolume(event.target.value);
});

playerButton.addEventListener('click', (event) => {
  birdExample.play(watchPlay);
});

function watchPlay(state) {
  const text = state ? 'PLAY' : 'STOP';
  playerButton.innerHTML = text;
}

function watchVolume(state) {
  birdExample.changeVolume(state);
}
function watchTime(state) {
  birdExample.changeTime(state);
}

// alert('song');
