const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    image: './img/drink.jpg',
    text: `I'm thirsty`,
  },
  {
    image: './img/food.jpg',
    text: "I'm hungry",
  },
  {
    image: './img/tired.jpg',
    text: "I'm tired",
  },
  {
    image: './img/hurt.jpg',
    text: "I'm hurt",
  },
  {
    image: './img/happy.jpg',
    text: "I'm happy",
  },
  {
    image: './img/angry.jpg',
    text: "I'm angry",
  },
  {
    image: './img/sad.jpg',
    text: "I'm sad",
  },
  {
    image: './img/scared.jpg',
    text: "I'm scared",
  },
  {
    image: './img/outside.jpg',
    text: 'I want to go outside',
  },
  {
    image: './img/home.jpg',
    text: 'I want to go home',
  },
  {
    image: './img/school.jpg',
    text: 'I want to go to school',
  },
  {
    image: './img/grandma.jpg',
    text: `I want to go to grandma's`,
  },
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p className="info">${text}</p>
  `;

  // TODO: speak event

  main.appendChild(box);
}
