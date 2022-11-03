import './styles/index.scss';
import { Stage } from './scripts/quiz';
import { Score } from './scripts/score';
import initQuiz from './scripts/initQuiz';
import {
  createBird,
  createQuizContainer,
  createQuizStageList,
  createScoreBoard,
} from './scripts/list';
import { birdsData, stageName } from './data';

const wrongAnswerAudio = getClickAudio('wrong');
const correctAnswerAudio = getClickAudio('correct');

const {
  quizStageItemList,
  quizList,
  quizPlayer,
  quizDesc,
  quizBtn,
  quizScoreElement,
} = initQuiz(document);

const stage = new Stage(birdsData);
const quizScore = new Score(quizScoreElement);

quizList.innerHTML = stage.getNameList(stage.currentStage());
quizPlayer.innerHTML = createBird({});
quizDesc.innerHTML = createBird({}, true);

const allPlayer = document.querySelectorAll('.bird-item');
const birdToListen = stage.initQuizBird(allPlayer[0]);
const birdFromList = stage.initQuizBird(allPlayer[1]);

stage.setDummy(birdToListen, stage.getAnswerBird().audio);
quizScore.setMaxStageScore(stage.currentStage());

quizList.addEventListener('click', (event) => {
  if (event.target !== quizList) {
    const option = event.target;
    const birdId = option.dataset.id;
    stage.updateQuizBird(birdFromList, birdId);
    if (!stage.stagePass) {
      if (stage.isCorrect(birdId)) {
        stage.updateQuizBird(birdToListen, stage.getAnswerId());
        callOptionClick(option, true);
      } else if (!stage.clickedId.includes(birdId)) {
        callOptionClick(option);
      }
    }
    quizDesc.classList.remove('quiz--hide');
    stage.checkAnswer(birdId);
  }
});

quizBtn.addEventListener('click', (event) => {
  stage.nextStage();
  stage.setDummy(birdToListen, stage.getAnswerBird().audio);
  quizScore.setMaxStageScore(stage.currentStage());
  quizList.innerHTML = stage.getNameList(stage.currentStage());
  toggleDisk([1, 0]);
  quizDesc.classList.add('quiz--hide');
});

function showBoard(score) {
  quizContent.classList.add('quiz--hide-content');
  boardScore.classList.add('board-score--show');
  boardScore.innerHTML = createScoreBoard(score);
}

function callOptionClick(element, correct = false) {
  element.classList.add(`disk--${correct ? 'active' : 'wrong'}`);
  correct ? quizScore.updateScoreElement() : quizScore.subScore();
  callAudioClick(correct);
}

function callAudioClick(correct = false) {
  correct ? correctAnswerAudio.play() : wrongAnswerAudio.play();
}

function toggleDisk(list) {
  list.forEach((a) =>
    quizStageItemList[stage.getStageId() - a].classList.toggle(
      'quiz__stage-item--active'
    )
  );
}

function getClickAudio(path) {
  const audio = new Audio(`./assets/${path}.mp3`);
  audio.playbackRate = 2.3;
  return audio;
}
