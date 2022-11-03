import {
  createQuizContainer,
  createQuizStageList,
  createLayout,
} from './createComponent';

export default function initQuizContainer(element, stageName) {
  element.querySelector('body').innerHTML = createLayout();
  const quizContainer = element.querySelector('.container');
  quizContainer.innerHTML = createQuizContainer();
  const quizStage = element.querySelector('.quiz__stage');
  quizStage.innerHTML = createQuizStageList(stageName);
  const boardScore = element.querySelector('.board-score');
  const quizStageItemList = element.querySelectorAll('.quiz__stage-item');
  const quizList = element.querySelector('.quiz__list');
  const quizPlayer = element.querySelector('.quiz__bird-player');
  const quizDesc = element.querySelector('.quiz__desc');
  const quizBtn = element.querySelector('.quiz__btn');
  const quizScoreElement = element.querySelector('.quiz__score');
  return {
    boardScore,
    quizStageItemList,
    quizList,
    quizPlayer,
    quizDesc,
    quizBtn,
    quizScoreElement,
  };
}
