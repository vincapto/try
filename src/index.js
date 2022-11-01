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

const wrongAnswerAudio = new Audio('./assets/wrong.mp3');
const correctAnswerAudio = new Audio('./assets/correct.mp3');
wrongAnswerAudio.playbackRate = 2;
correctAnswerAudio.playbackRate = 2;

const audioDraft = birdData[0][0].audio;
const quizContainer = createQuizContainer();
const birdContent = document.querySelector('.bird-content');

birdContent.innerHTML = quizContainer;

const quizList = document.querySelector('.quiz__list');
const quizPlayer = document.querySelector('.quiz__player');
const quizDesc = document.querySelector('.quiz__desc');
const quizBtn = document.querySelector('.quiz__btn');
const quizScore = document.querySelector('.quiz__score');
const quizImgPlaceholder = document.querySelector('.quiz__bird-placeholder');

const stage = new Stage(quizScore, quizImgPlaceholder);

quizList.innerHTML = stage.getNameList(stage.currentStage());
quizPlayer.insertAdjacentHTML('beforeend', createPlayerTag());
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
    if (!stage.stagePass) {
      if (stage.isCorrect(birdId)) {
        event.target.classList.add('disk--active');
        correctAnswerAudio.play();
      } else if (!stage.clickedId.includes(birdId)) {
        event.target.classList.add('disk--wrong');
        wrongAnswerAudio.play();
      }
    }
    quizDesc.classList.remove('quiz--hide');
    stage.checkAnswer(birdId);
    console.log(stage.score);
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
