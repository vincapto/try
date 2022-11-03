import { RANGE_MAX, VOLUME_MAX } from '../env';

export function createLayout(header = '', main = '') {
  return `
  <header class='header container'>${header}</header>
  <main class='main container'>${main}</main>
  <footer class='footer container'>   
    <div class='content block'>
      <a href='https://github.com/vincapto'>GitHub</a>    
      <span>2022</span> 
      <a class='footer__link' href='https://rs.school/js/'>
        <img src='../assets/logo-school.svg'>
      </a>
    </div>
  </footer>
  `;
}

export function createMenu(list) {
  return `
    <div class='top'>
      <div class='bird-logo'>
        <img src='../assets/logo-bird.svg'>
      </div>
      <h5 class='quiz__score'></h5>
    </div>
    <nav class='menu'>        
      <ul class='menu__list'>
        ${list
          .map((a) => {
            return `<li class='menu__item'><a href='${a.link}'>${a.text}</a></li>`;
          })
          .join('')}
      </ul>
  </nav>
  `;
}

export function createPlayerTag() {
  return `
  <div class='player'>
    <button class='btn player__btn'><span class='paused player__playback'></span></button>
    <div class='player__track'>
      <div class='track-wrapper'>
        <input type='range' class='track' min=0 max=${RANGE_MAX} value=0 />
      </div>
      <div class='player__timer'>
        <span class='player__start'>00:00</span>
        <span class='player__end'>00:00</span>
      </div>
    </div>    
    <div class='player__volume'>
      <input type='range' class='volume' min=0 max=${VOLUME_MAX} value=50 />
    </div>        
  </div>
  `;
}

export function createBirdList(list) {
  const birdList = list
    .map((a) => {
      return createBird({ ...a });
    })
    .join('');
  return `
  <div class='bird-list'>
    ${birdList}
  </div>
  `;
}

export function createBird(
  { name, species, description, image, id },
  hide = false
) {
  return `
  <div class='bird '>
    <div class='bird__head'>
      <div class='bird__img-wrapper'>
        <img class='bird__img' src='${image}'>
      </div>
      <div class='bird__info'>
        <h4 class='bird__name'>
          ${name}
        </h4>
        ${hide ? `<div class="bird__species">${species}</div>` : ''}
        <div class='bird__player'>
          ${createPlayerTag()}
        </div>
    </div>
    </div>
    ${
      hide
        ? `<div class='bird__description'>
      <div class='bird__text'>
        ${description}
      </div>
    </div>`
        : ''
    }
    </div>
    <p class='bird__buffer'>Listen to bird</p>
  `;
}

export function createQuizListItem({ name, id = 0 }) {
  return `
    <div class='quiz__item disk' data-id=${id}>
      ${name}
    </div>
  `;
}

export function createQuizStageList(list) {
  return list.map((a, key) => createQuizStageItem(a, key)).join('');
}

export function createScoreBoard(score) {
  console.log(score);
  return `
    
      <h3>${
        score.length !== 0
          ? `Вы набрали ${score}`
          : 'Поздравляю! Вы набрали максимум баллов'
      }</h3>
      ${score.length !== 0 ? '<button class="btn">Играть снова</button>' : ''}
    
  `;
}

export function createQuizStageItem(item, id = 0) {
  const addClass = id !== 0 ? '' : 'stage__item--active';
  return `
    <div class='stage__item ${addClass}' data-id=${id}>
      <p>${item}</p>
    </div>
  `;
}

export function createGalleryList(data) {
  console.log(data.flat(1));
  const list = data
    .flat(1)
    .map((a) => {
      return `${createBird(a, createPlayerTag())}`;
    })
    .join('');
  return `<div class='gallery__list'>${list}</div>`;
}

export function createQuizContainer() {
  return `
    <div class='quiz'>
      <div class='quiz__head'>  
        <div class='quiz__stage stage'></div>
      </div>
      <div class='quiz__player block'>        
        <div class='quiz__bird-player'>         
        </div>
      </div>
      <div class='quiz__list'>
      </div>
      <div class='quiz__desc block quiz--hide'>        
      </div>
      <button class='btn quiz__btn'>Next Level</button>
    </div>
    <div class='board-score'></div>
  `;
}
