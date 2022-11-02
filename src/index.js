import './styles/index.scss';
import { Quiz, Stage } from './scripts/quiz';
import { createPlayerTag, birdPlayer } from './scripts/player';
import {
  createBird,
  createBirdList,
  createQuizContainer,
  createQuizListItem,
  createQuizStageList,
  createScoreBoard,
} from './scripts/list';

import { birdsData, stageName } from './data';

const wrongAnswerAudio = new Audio('./assets/wrong.mp3');
const correctAnswerAudio = new Audio('./assets/correct.mp3');
wrongAnswerAudio.playbackRate = 2;
correctAnswerAudio.playbackRate = 2;

const audioDraft = birdsData[0][0].audio;
const quizContainer = createQuizContainer();
const birdContent = document.querySelector('.bird-content');

birdContent.innerHTML = quizContainer;
const boardScore = document.querySelector('.board-score');
const quizContent = document.querySelector('.quiz');
const quizStageList = document.querySelector('.quiz__stage');
quizStageList.innerHTML = createQuizStageList(stageName);

const quizStageItemList = document.querySelectorAll('.quiz__stage-item');
const quizList = document.querySelector('.quiz__list');

const quizPlayer = document.querySelector('.quiz__bird-player');
const quizDesc = document.querySelector('.quiz__desc');
const quizBtn = document.querySelector('.quiz__btn');
const quizScore = document.querySelector('.quiz__score');
const quizImgPlaceholder = document.querySelector('.quiz__bird-placeholder');
const quizNamePlaceholder = document.querySelector('.quiz__bird-name');

const stage = new Stage(quizScore, quizImgPlaceholder, quizNamePlaceholder);

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

function showBoard(score) {
  quizContent.classList.add('quiz--hide-content');
  boardScore.classList.add('board-score--show');
  boardScore.innerHTML = createScoreBoard(score);
}

quizBtn.addEventListener('click', (event) => {
  stage.nextStage();
  stage.isEnd(showBoard);
  quizList.innerHTML = stage.getNameList(stage.currentStage());

  quizStageItemList[stage.getStageId() - 1].classList.remove(
    'quiz__stage-item--active'
  );

  quizStageItemList[stage.getStageId()].classList.add(
    'quiz__stage-item--active'
  );
  quizDesc.classList.add('quiz--hide');
  stage.setRandomQuizBird();
  birdExample.clearPlayer();
  birdExample.setListener(stage.getAnswerBird().audio);
});
