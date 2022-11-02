import './styles/index.scss';
import { birdsData, stageName } from './data';
import {
  createBird,
  createBirdList,
  createQuizContainer,
  createQuizListItem,
  createQuizStageList,
  createScoreBoard,
  createGalleryList,
} from './scripts/list';

const container = document.querySelector('.container');

container.innerHTML = createGalleryList(birdsData);
