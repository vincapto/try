import { saveLang } from '../getData';
import { Bird } from './bird';
import {
  createQuizContainer,
  createQuizStageList,
  createLayout,
  createMenu,
  createGalleryList,
} from './createComponent';
import { WatchPlayer } from './watchPlayer';

export function initQuizContainer(element, stageName, menu) {
  initLayout(element, menu);
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

export function initLayout(element, menu) {
  element.querySelector('body').innerHTML = createLayout(createMenu(menu));
  const switchRu = element.querySelector('.switch__eng');
  const switchEng = element.querySelector('.switch__ru');
  switchRu.addEventListener('click', (event) => {
    saveLang(false);
    console.log('call LANG');
    window.location.reload();
  });
  switchEng.addEventListener('click', (event) => {
    saveLang(true);
    console.log('call LANG ENGH');
    window.location.reload();
  });
  return element;
}

export function initGalleryContainer(element, data, menu) {
  initLayout(element, menu);
  const galleryContainer = element.querySelector('.main');
  galleryContainer.innerHTML = createGalleryList(data);
  const allPlayer = document.querySelectorAll('.player');
  const flatAudioList = data.flat(1);
  console.log(allPlayer);
  const birdList = [...allPlayer].map((a, key) => {
    const bird = new Bird(a, flatAudioList[key].audio).birdPlayer;
    bird.setListener(flatAudioList[key].audio);
    return bird;
  });
  const watchPlayer = new WatchPlayer(birdList);
  birdList.forEach((a) => {
    console.log(a);
    a.setWatcher(watchPlayer);
  });
  return {};
}
