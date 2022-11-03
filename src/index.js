import './styles/index.scss';
import { Stage } from './scripts/quiz';
import { Bird } from './scripts/bird';
import { Score } from './scripts/score';
import { createPlayerTag, Player } from './scripts/player';
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
const quizScoreElement = document.querySelector('.quiz__score');

const stage = new Stage(birdsData);
const quizScore = new Score(quizScoreElement);

quizList.innerHTML = stage.getNameList(stage.currentStage());

quizPlayer.innerHTML = createBird(stage.getAnswerBird());
quizDesc.innerHTML = createBird(stage.getAnswerBird(), true);

const allPlayer = document.querySelectorAll('.bird-item');

console.log(allPlayer);

// const birdPlayerQuiz = allPlayer[1];
// birdPlayerQuiz.innerHTML = createPlayerTag();

const birdFromList = stage.initQuizBird(allPlayer[1]);

const birdToListen = stage.initQuizBird(allPlayer[0]);

stage.setDummy(birdToListen, stage.getAnswerBird().audio);
quizScore.setMaxStageScore(stage.currentStage());
// const birdExample = new Bird(allPlayer[0], audioDraft).birdPlayer;
// birdExample.setListener(stage.getAnswerBird().audio);

quizList.addEventListener('click', (event) => {
  if (event.target !== quizList) {
    const birdId = event.target.dataset.id;
    stage.updateQuizBird(birdFromList, birdId);

    if (!stage.stagePass) {
      if (stage.isCorrect(birdId)) {
        stage.updateQuizBird(birdToListen, stage.getAnswerId());
        event.target.classList.add('disk--active');
        correctAnswerAudio.play();
        quizScore.updateScoreElement();
      } else if (!stage.clickedId.includes(birdId)) {
        event.target.classList.add('disk--wrong');
        wrongAnswerAudio.play();
        quizScore.subScore();
      }
    }
    quizDesc.classList.remove('quiz--hide');
    stage.checkAnswer(birdId);
  }
});

function showBoard(score) {
  quizContent.classList.add('quiz--hide-content');
  boardScore.classList.add('board-score--show');
  boardScore.innerHTML = createScoreBoard(score);
}

quizBtn.addEventListener('click', (event) => {
  stage.nextStage();
  stage.setDummy(birdToListen, stage.getAnswerBird().audio);
  quizScore.setMaxStageScore(stage.currentStage());
  // stage.isEnd(showBoard);
  quizList.innerHTML = stage.getNameList(stage.currentStage());

  quizStageItemList[stage.getStageId() - 1].classList.remove(
    'quiz__stage-item--active'
  );

  quizStageItemList[stage.getStageId()].classList.add(
    'quiz__stage-item--active'
  );
  // quizDesc.classList.add('quiz--hide');

  // birdExample.clearPlayer();
  // birdExample.setListener(stage.getAnswerBird().audio);
});
