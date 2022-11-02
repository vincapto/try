import { createPlayerTag } from './player';

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

export function createBird({ name, species, description, image, id }) {
  return `
  <div class='bird-item bird-item${id} '>
    <div class='bird__head'>
      <div class='bird__img-wrapper'>
        <img class='bird__img' src='${image}'>
      </div>
      <div class='bird__info'>
        <h4 class='bird__name'>
          ${name}
        </h4>
        <div class='bird__species'>
          ${species}
        </div>
        <div class='bird__player'>
        </div>
    </div>

    </div>
    <div class='bird__description'>
      <div class='bird__text'>
        ${description}
      </div>
    </div>
    </div>
    <p class='bird__buffer'>Listen to bird</p>
  `;
}

export function createQuizListItem(item, id = 0) {
  return `
    <div class='quiz__item disk' data-id=${id}>
      ${item}
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
  const addClass = id !== 0 ? '' : 'quiz__stage-item--active';
  return `
    <div class='quiz__stage-item ${addClass}' data-id=${id}>
      <p>${item}</p>
    </div>
  `;
}

export function createGalleryList(data) {
  console.log(data.flat(1));
  const list = data
    .flat(1)
    .map((a) => {
      return `<div class='bird-item'>${createPlayerTag(a)}</div>`;
    })
    .join('');
  return list;
}

export function createQuizContainer(
  head = '',
  player = '',
  list = '',
  desc = ''
) {
  return `
    <div class='quiz'>
      <div class='quiz__head'>  
        <div class='menu'>        
          <div class='bird-logo'>
            <img src='../assets/logo-bird.svg'>
          </div>
          <a href='/about.html'>Gallery</a>
          
        </div>
        <div class='quiz__stage'></div>
      </div>
      <div class='quiz__player'>
        <img class='quiz__bird-placeholder' src='../assets/bird__placeholder.jpg'>
        <div class='quiz__bird-player'>
          <div class='quiz__player-head'>
            <h3 class='quiz__bird-name'>****</h3>          
            <div class='quiz__score-wrapper'>   
              <h5>Score: 
                <span class='quiz__score'></span>  
              </h5>      
            </div>              
          </div>
        </div>
      </div>
      <div class='quiz__list'>
      </div>
      <div class='quiz__desc quiz--hide'>        
      </div>
      <button class='btn quiz__btn'>Next Level</button>
    </div>
    <div class='board-score'></div>
  `;
}
