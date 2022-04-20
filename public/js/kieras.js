const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
const btn = document.getElementById('kolorgenerator');
const colorBox = document.getElementById('kolorBox');
const kolorinput = document.getElementById('color');
const nazwaKoloru = document.querySelector('.nazwakoloru');
var hexColor = '#';
var probaValur = document.getElementById('.nazwisko');

function getRandomNumber() {
  return Math.floor(Math.random() * hex.length);
}

btn.addEventListener('click', changeColor);

function changeColor() {
  for (let i = 0; i < 6; i++) {
    hexColor += hex[getRandomNumber()];
  }

  colorBox.style.background = hexColor;
  nazwaKoloru.value = hexColor;

  hexColor = '#';
}
