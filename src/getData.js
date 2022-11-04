import {
  birdsData,
  birdsDataEng,
  stageName,
  stageNameEng,
  indexData,
  indexDataEng,
} from './data';

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
  const lang = getLang();
  if (lang) console.log('a');
  else console.log('b');
  return getLang()
    ? { data: birdsData, stageList: stageName, menu, indexData }
    : {
        data: birdsDataEng,
        stageList: stageNameEng,
        menu: menuEng,
        indexData: indexDataEng,
      };
}

export function getLang() {
  const lang = localStorage.getItem('lang');
  return lang ? JSON.parse(lang) : false;
}

export function saveLang(lang = false) {
  localStorage.setItem('lang', JSON.stringify(lang));
}
