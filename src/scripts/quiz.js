import { Bird } from './bird';
import { createQuizListItem } from './createComponent';

export class Stage {
  constructor(quizData) {
    this.stageList = this.initDataStage(quizData);
    this.clickedId = [];
    this.stageLength = quizData.length;
  }

  initDataStage(quizData) {
    return this.generateStage(quizData);
  }

  initQuizBird(element) {
    return new Bird(element);
  }

  setDummy(element, audio = '') {
    element.updateBird({
      image: '../assets/bird__placeholder.jpg',
      name: '******',
      audio,
    });
  }

  updateQuizBird(element, id) {
    console.log(this.getBirdById(id));
    console.log(element);
    element.updateBird(this.getBirdById(id));
  }

  checkAnswer(id) {
    this.isCorrect(id)
      ? (this.stagePass = true)
      : !this.clickedId.includes(id)
      ? this.clickedId.push(id)
      : '';
  }

  isEnd(callback) {
    this.getStageId() !== stageLength.length - 1 ? callback(`' 1 '`) : '';
  }

  isCorrect(id) {
    return id == this.getAnswerId() && !this.stagePass;
  }

  getNameList(list) {
    return list
      .map((a) => {
        return createQuizListItem({ ...a });
      })
      .join('');
  }

  getAnswerBird() {
    return this.getBirdById(this.getAnswerId());
  }

  getAnswerId() {
    return this.stageList().answer;
  }

  getBirdById(id) {
    return this.currentStage(id)
      .filter((a) => {
        return a.id == id;
      })
      .pop();
  }

  nextStage() {
    this.stagePass = false;
    this.clickedId = [];
    return this.stageList(true).current;
  }

  getStageId() {
    return this.stageList().index;
  }

  currentStage() {
    return this.stageList().current;
  }

  generateStage(list) {
    let index = 0;
    const stage = list;
    let answer = this.getRandomInt(1, stage[index].length);
    return (move = false) => {
      const current = stage[index];
      if (move) {
        index !== stage.length - 1 ? index++ : index;
        answer = this.getRandomInt(1, current.length);
      }
      return { current, answer, index: index };
    };
  }

  getRandomBirdId() {
    return this.getRandomInt(1, this.currentStage().length);
  }

  getRandomInt(min = 1, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
