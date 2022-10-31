import './styles/index.scss';
import { createPlayerTag, birdPlayer } from './scripts/player';
import {
  createBird,
  createBirdList,
  createQuizContainer,
  createQuizListItem,
} from './scripts/list';

import birdData from './data';

const audioDraft = birdData[0][0].audio;
const container = document.querySelector('.container');
const quizContainer = createQuizContainer();
const birdContent = document.querySelector('.bird-content');
const birdSlide = createBirdList(birdData[0]);

birdContent.innerHTML = quizContainer;

const quizList = document.querySelector('.quiz__list');
const quizPlayer = document.querySelector('.quiz__player');
const quizDesc = document.querySelector('.quiz__desc');
const quizBtn = document.querySelector('.quiz__btn');
quizBtn.disabled = true;
const currentStage = generateStage(birdData);

quizList.innerHTML = getNameList(currentStage(true).current);

quizList.addEventListener('click', (event) => {
  if (event.target !== quizList) {
    const birdId = event.target.dataset.id;
    updateBird(getStageBird(birdId));
    // quizDesc.innerHTML = birdItem;
    console.log(currentStage().answer == birdId);
    quizDesc.classList.remove('quiz--hide');
    if (currentStage().answer == birdId) {
      quizBtn.disabled = false;
    }
  }
});

quizPlayer.innerHTML = createPlayerTag(audioDraft);
quizDesc.innerHTML = createBird(currentStage().current);
const updateBird = getBirdELement();

const birdPlayerQuiz = document.querySelector('.bird__player');
birdPlayerQuiz.innerHTML = createPlayerTag(audioDraft);

const playerButton = document.querySelector('.play-bird');
const volumeRange = document.querySelector('.volume');
const timeRange = document.querySelector('.time');
const rangeWrapper = document.querySelector('.range-wrapper');

const birdExample = new birdPlayer(audioDraft, timeRange);

birdExample.setListener(getStageBird(currentStage().answer).audio);

quizBtn.addEventListener('click', (event) => {
  quizList.innerHTML = getNameList(currentStage(true).current);
  quizDesc.classList.add('quiz--hide');
  quizBtn.disabled = true;

  birdExample.setListener(getStageBird(currentStage().answer).audio);
});

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

function getNameList(list) {
  return list
    .map((a) => {
      return createQuizListItem(a.name, a.id);
    })
    .join('');
}

function getBirdELement() {
  const imgElement = document.querySelector('.bird__img');
  const nameElement = document.querySelector('.bird__name');
  const speciesElement = document.querySelector('.bird__species');
  const playerElement = document.querySelector('.bird__player');
  const textElement = document.querySelector('.bird__text');
  return ({ image, name, species, description }) => {
    console.log(image);
    imgElement.src = image;
    nameElement.innerHTML = name;
    speciesElement.innerHTML = species;
    textElement.innerHTML = description;
  };
}

function getStageBird(id) {
  return currentStage()
    .current.filter((a) => {
      return a.id == id;
    })
    .pop();
}

function generateStage(list) {
  let index = 0;
  const stage = list;
  let answer = getRandomInt(0, stage[index].length);
  return (move = false) => {
    const current = stage[index];
    console.log(current);
    if (move) {
      index !== stage.length - 1 ? index++ : index;
      answer = getRandomInt(0, current.length);
    }
    return { current, answer };
  };
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const answer = Math.floor(Math.random() * (max - min) + min);
  return answer;
}
