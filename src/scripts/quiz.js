import { birdPlayer } from './player';
import { birdsData } from '../data';
import { createQuizListItem } from './list';

export class Stage {
  constructor(scoreElement, imgPlaceholder, namePlaceholder) {
    this.stageList = this.initDataStage();
    this.score = 0;
    this.stageScore = 5;
    this.imgPlaceholder = imgPlaceholder;
    this.namePlaceholder = namePlaceholder;
    this.scoreElement = scoreElement;

    this.clickedId = [];
    this.stagePass = false;
    this.updateQuizScore();
  }

  checkAnswer(id) {
    if (this.isCorrect(id)) {
      this.score += this.stageScore;
      this.stagePass = true;
      this.updateQuizScore();
      this.updateQuizImgPlaceholder(this.stagePass);
    } else if (!this.clickedId.includes(id)) {
      console.log(this.getAnswerId(), id);
      this.stageScore =
        this.stageScore !== 0 ? this.stageScore - 1 : this.stageScore;
      this.clickedId.push(id);
    }
  }

  isEnd(callback) {
    console.log('=========');
    console.log(`${this.score}/${(birdsData.length - 1) * 5} `);
    this.getStageId() !== birdsData.length - 1
      ? callback(`${this.score}/${(birdsData.length - 1) * 5} `)
      : '';
  }

  isCorrect(id) {
    return id == this.getAnswerId() && !this.stagePass;
  }

  getNameList(list) {
    return list
      .map((a) => {
        return createQuizListItem(a.name, a.id);
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

  initDataStage() {
    return this.generateStage(birdsData);
  }

  nextStage() {
    this.stagePass = false;
    this.stageScore = 5;
    this.clickedId = [];
    this.updateQuizImgPlaceholder();
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
        console.log('GET STAGW');
        index !== stage.length - 1 ? index++ : index;
        answer = this.getRandomInt(1, current.length);
      }
      return { current, answer, index: index };
    };
  }

  generateQuizBird(element) {
    const player = element.querySelector('.player');
    const imgElement = element.querySelector('.bird__img');
    const nameElement = element.querySelector('.bird__name');
    const speciesElement = element.querySelector('.bird__species');
    const textElement = element.querySelector('.bird__text');
    const timerStart = element.querySelector('.player__start');
    const timerEnd = element.querySelector('.player__end');
    this.quizAudio = new Quiz(player, '', timerStart, timerEnd).birdExample;
    // this.setRandomQuizBird();
    this.quizAudio.setListener(this.getBirdById(this.getRandomBirdId()).audio);
    return ({ image, name, species, description }) => {
      imgElement.src = image;
      nameElement.innerHTML = name;
      speciesElement.innerHTML = species;
      textElement.innerHTML = description;
    };
  }

  updateQuizImgPlaceholder(correct = false) {
    if (correct) {
      this.imgPlaceholder.src = this.getAnswerBird().image;
      console.log(this.namePlaceholder);
      this.namePlaceholder.innerHTML = this.getAnswerBird().name;
    } else {
      this.imgPlaceholder.src = '../assets/bird__placeholder.jpg';
      this.namePlaceholder.innerHTML = '******';
    }
  }

  initQuizBird(element) {
    this.birdElement = this.generateQuizBird(element);
  }

  updateQuizBird(id) {
    this.birdElement(this.getBirdById(id));
    this.quizAudio.clearPlayer();
    this.quizAudio.setListener(this.getBirdById(id).audio);
  }

  updateQuizScore() {
    console.log('SCORE UPDATE');
    this.scoreElement.innerText = this.score;
  }

  getRandomBirdId() {
    return this.getRandomInt(1, this.currentStage().length);
  }

  setRandomQuizBird() {
    this.updateQuizBird(this.getRandomBirdId());
  }

  getRandomInt(min = 1, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const answer = Math.floor(Math.random() * (max - min) + min);
    return answer;
  }
}

export class Quiz {
  constructor(element, audioDraft) {
    this.playerButton = element.querySelector('.play-bird');
    this.playerPause = element.querySelector('.player__btn-pause');
    this.volumeRange = element.querySelector('.volume');

    this.timeRange = element.querySelector('.time');
    this.rangeWrapper = element.querySelector('.range-wrapper');
    this.timerStart = element.querySelector('.player__start');
    this.timerEnd = element.querySelector('.player__end');

    this.setListener();
    this.birdExample = new birdPlayer(
      audioDraft,
      this.timeRange,
      this.watchPlay.bind(this),
      this.timerStart,
      this.timerEnd
    );

    this.volumeRange.style.background = this.birdExample.getBackgroundAt(50);
  }

  setListener() {
    this.timeRange.addEventListener('input', (event) => {
      this.watchTime(event.target.value);
      console.log(this.timerEnd);
      this.birdExample.setStartTime();
      console.log('ss');
    });

    this.rangeWrapper.addEventListener('mousedown', (event) => {
      this.birdExample.run = false;
    });

    this.rangeWrapper.addEventListener('mouseup', (event) => {
      this.birdExample.run = true;
    });

    this.volumeRange.addEventListener('input', (event) => {
      this.watchVolume(event.target.value);
      this.volumeRange.style.background = this.birdExample.getBackgroundAt(
        event.target.value
      );
    });

    this.playerButton.addEventListener('click', (event) => {
      this.birdExample.play();
    });
  }

  watchPlay(state) {
    const text = state ? 'PLAY' : 'STOP';
    this.playerPause.classList.toggle('paused');

    // this.playerButton.innerHTML = text;
  }

  watchVolume(state) {
    this.birdExample.changeVolume(state);
  }

  watchTime(state) {
    this.birdExample.changeTime(state);
  }
}
