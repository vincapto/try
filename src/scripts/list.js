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
      <div class='bird__name'>
        ${name}
      </div>
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

export function createQuizContainer(
  head = '',
  player = '',
  list = '',
  desc = ''
) {
  return `
    <div class='quiz'>
      <div class='quiz__head'>
        <div class='quiz__score-wrapper'>   
          <h4>Score: </h4>      
          <div class='quiz__score'>        
          </div>  
        </div>  
      </div>
      <div class='quiz__player'>
        <img class='quiz__bird-placeholder' src='../assets/bird__placeholder.jpg'>
      </div>
      <div class='quiz__list'>
      </div>
      <div class='quiz__desc quiz--hide'>
        
      </div>
      <button class='btn quiz__btn'>Next Level</button>
    </div>
  `;
}
