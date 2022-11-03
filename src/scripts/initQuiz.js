import {
  createQuizContainer,
  createQuizStageList,
  createLayout,
  createMenu,
} from './createComponent';

export default function initQuizContainer(element, stageName, menu) {
  element.querySelector('body').innerHTML = createLayout(createMenu(menu));
  const quizContainer = element.querySelector('.main');
  quizContainer.innerHTML = createQuizContainer();
  const quizContent = element.querySelector('.quiz');
  const quizStage = element.querySelector('.quiz__stage');
  quizStage.innerHTML = createQuizStageList(stageName);
  const boardScore = element.querySelector('.board-score');
  const quizStageItemList = element.querySelectorAll('.stage__item');
  const quizList = element.querySelector('.quiz__list');
  const quizPlayer = element.querySelector('.quiz__player');
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
    quizContent,
  };
}
