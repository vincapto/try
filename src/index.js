import './styles/index.scss';
import { Quiz, Stage } from './scripts/quiz';
import { createPlayerTag, birdPlayer } from './scripts/player';
import {
  createBird,
  createBirdList,
  createQuizContainer,
  createQuizListItem,
} from './scripts/list';

import birdData from './data';

const audioDraft = birdData[0][0].audio;
const quizContainer = createQuizContainer();
const birdContent = document.querySelector('.bird-content');

birdContent.innerHTML = quizContainer;

const quizList = document.querySelector('.quiz__list');
const quizPlayer = document.querySelector('.quiz__player');
const quizDesc = document.querySelector('.quiz__desc');
const quizBtn = document.querySelector('.quiz__btn');

const stage = new Stage();

quizList.innerHTML = stage.getNameList(stage.currentStage());
quizPlayer.innerHTML = createPlayerTag();
quizDesc.innerHTML = createBird(stage.currentStage());

const birdPlayerQuiz = document.querySelector('.bird__player');
birdPlayerQuiz.innerHTML = createPlayerTag();
stage.initQuizBird(document.querySelector('.bird-item'));

const allPlayer = document.querySelectorAll('.player');

const birdExample = new Quiz(allPlayer[0], audioDraft).birdExample;
birdExample.setListener(stage.getAnswerBird().audio);

quizList.addEventListener('click', (event) => {
  if (event.target !== quizList) {
    const birdId = event.target.dataset.id;
    stage.updateQuizBird(birdId);
    quizDesc.classList.remove('quiz--hide');
  }
});

quizBtn.addEventListener('click', (event) => {
  stage.nextStage();
  quizList.innerHTML = stage.getNameList(stage.currentStage());
  quizDesc.classList.add('quiz--hide');
  stage.setRandomQuizBird();
  birdExample.clearPlayer();
  birdExample.setListener(stage.getAnswerBird().audio);
});
