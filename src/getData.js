import { birdsData, birdsDataEng, stageName, stageNameEng } from './data';

export function getLangData() {
  const lang = localStorage.getItem('lang');
  return lang
    ? { data: birdsData, stageList: stageName }
    : { data: birdsDataEng, stageList: stageNameEng };
}

export function saveLang(lang = false) {
  localStorage.getItem('lang', lang);
}
