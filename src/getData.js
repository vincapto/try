import { birdsData, birdsDataEng, stageName, stageNameEng } from './data';

const menu = [
  { link: '/index.html', text: 'главная' },
  { link: '/quiz.html', text: 'викторина' },
  { link: '/gallery.html', text: 'галлерея' },
];
const menuEng = [
  { link: '/index.html', text: 'main' },
  { link: '/quiz.html', text: 'quiz' },
  { link: '/gallery.html', text: 'gallery' },
];

export function getLangData() {
  const lang = localStorage.getItem('lang');
  return lang
    ? { data: birdsData, stageList: stageName, menu }
    : { data: birdsDataEng, stageList: stageNameEng, menu: menuEng };
}

export function saveLang(lang = false) {
  localStorage.getItem('lang', lang);
}
