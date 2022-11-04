import './styles/index.scss';
import { birdsData, stageName } from './data';
import { Stage } from './scripts/quiz';
import { Bird } from './scripts/bird';
import { createGalleryList } from './scripts/createComponent';
import { initGalleryContainer } from './scripts/initQuiz';
import { getLangData } from './getData';

const { data, menu } = getLangData();

initGalleryContainer(document, data, menu);
