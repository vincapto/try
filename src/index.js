import './styles/index.scss';
import { getLangData } from './getData';
// import { Bird } from './bird';
import {
  createQuizContainer,
  createQuizStageList,
  createLayout,
  createMenu,
  createGalleryList,
} from './scripts/createComponent';

function createIndexDoneItem(item) {
  return `
    <li class='about__item'>
      <h4>${item.title}</h4>
      ${createIndexDoneSubList(item.list)}
    </lic>
  `;
}

function createIndexDoneSubList(list) {
  return `
    <ul class='sublist'>
      ${list
        .map((a) => {
          return `<li class='sublist__item'>${a}</li>`;
        })
        .join('')}
    </ul>
  `;
}

function createIndexDoneList(list) {
  return `
    <ul>
      ${list.map((a) => createIndexDoneItem(a)).join('')}
    </ul>
  `;
}

function initIndexContainer(element, indexData, menu) {
  element.querySelector('body').innerHTML = createLayout(createMenu(menu));
  const indexContainer = element.querySelector('.main');
  indexContainer.innerHTML = createIndexDoneList(indexData);
  return {};
}

const { indexData, menu } = getLangData();

initIndexContainer(document, indexData, menu);
