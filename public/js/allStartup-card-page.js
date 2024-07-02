const cards = document.getElementsByClassName('card__inner');

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', function() {
    this.classList.toggle('is-flipped');
  });
}
