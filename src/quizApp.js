import './styles/index.scss';
import { Stage } from './scripts/quiz';
import { Score } from './scripts/score';
import { initQuizContainer } from './scripts/initQuiz';
import { createBird, createScoreBoard } from './scripts/createComponent';
import { getLangData } from './getData';

const { stageList, data, menu } = getLangData();
const wrongAnswerAudio = getClickAudio('wrong');
const correctAnswerAudio = getClickAudio('correct');

const {
  boardBtn,
  boardScore,
  quizStageItemList,
  quizList,
  quizPlayer,
  quizDesc,
  quizBtn,
  quizContent,
  quizScoreElement,
} = initQuizContainer(document, stageList, menu);

const stage = new Stage(data);
const quizScore = new Score(quizScoreElement);

quizList.innerHTML = stage.getNameList(stage.currentStage());
quizPlayer.innerHTML = createBird({});
quizDesc.innerHTML = createBird({}, true);

const allPlayer = document.querySelectorAll('.bird');
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
        stage.isEnd(showBoard, quizScore.getResultScore(data));
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
  const boardBtn = boardScore.querySelector('.btn');
  boardBtn.removeEventListener('click', repeatGame);
  boardBtn.addEventListener('click', repeatGame);
}

function repeatGame() {
  stage.repeatQuiz();
  quizScore.clearScore();
  stage.setDummy(birdToListen, stage.getAnswerBird().audio);
  quizScore.setMaxStageScore(stage.currentStage());
  quizList.innerHTML = stage.getNameList(stage.currentStage());
  quizDesc.classList.add('quiz--hide');
  quizContent.classList.remove('quiz--hide-content');
  boardScore.classList.remove('board-score--show');
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
      'stage__item--active'
    )
  );
}

function getClickAudio(path) {
  const audio = new Audio(`./assets/${path}.mp3`);
  audio.playbackRate = 2.3;
  return audio;
}
