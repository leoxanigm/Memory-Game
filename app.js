// TODO

/*
* Add levels increasing number of cards
* Improve style
* Change images that have free use licence
* Change score to accomodate number of clicks and add leaderboard
*/

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('grid');
  const scoreEl = document.getElementById('score');
  const disableClick = document.getElementById('disable-click');
  const replayBtn = document.getElementById('replay');
  const gridCardCount = 12;
  const imgCount = 10;
  const currGridImg = [];

  let cardsChosen = [];
  let score = 0;

  for (let i = 1; i <= imgCount; i++) {
    currGridImg.push(`img/${i}.jpg`);
  }

  currGridImg.sort(item => 0.5 - Math.random());
  currGridImg.splice(gridCardCount / 2, currGridImg.length - 1);
  currGridImg.push(...currGridImg);
  currGridImg.sort(item => 0.5 - Math.random());

  const createBoard = () => {
    for (let i = 0; i < gridCardCount; i++) {
      let card = document.createElement('img');
      card.classList.add('card');
      card.setAttribute('src', 'img/0.jpg');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      grid.appendChild(card);
    }
  };

  function flipCard() {
    let cardId = this.getAttribute('data-id');
    cardsChosen.push({ item: this, src: currGridImg[cardId] });

    this.setAttribute('src', currGridImg[cardId]);

    if (cardsChosen.length > 1) {
      disableClick.style.display = 'block';
      if (cardsChosen[0].src === cardsChosen[1].src) {
        cardsChosen[0].item.removeEventListener('click', flipCard);
        cardsChosen[1].item.removeEventListener('click', flipCard);
        cardsChosen = [];
        score++;
        scoreEl.textContent = score;
        disableClick.style.display = 'none';
      } else {
        setTimeout(function() {
          cardsChosen[0].item.setAttribute('src', 'img/0.jpg');
          cardsChosen[1].item.setAttribute('src', 'img/0.jpg');
          cardsChosen = [];
          disableClick.style.display = 'none';
        }, 500);
      }
    }
  }

  replayBtn.addEventListener('click', () => {location.reload()})

  createBoard();
});
