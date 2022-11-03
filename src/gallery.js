import './styles/index.scss';
import { birdsData, stageName } from './data';
import { Stage } from './scripts/quiz';
import { Bird } from './scripts/bird';
import { createGalleryList } from './scripts/createComponent';

const container = document.querySelector('.container');
const audioDraft = birdsData[0][0].audio;
container.innerHTML = createGalleryList(birdsData);
const allPlayer = document.querySelectorAll('.player');
const flatAudioList = birdsData.flat(1);
allPlayer.forEach((a, key) => {
  new Bird(a, flatAudioList[key].audio).birdPlayer.setListener(
    flatAudioList[key].audio
  );
});
// const birdExample = new Quiz(allPlayer[0], audioDraft).birdExample;
// birdExample.setListener(audioDraft);
