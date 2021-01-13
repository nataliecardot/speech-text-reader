const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');
const textBox = document.getElementById('text-box');

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
    <p class="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    // Set text to speak
    setTextMessage(text);
    speakText();

    // Add active class for box shadow to be added in CSS, remove after 0.8s
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

// Init speech synthesis utterance (which takes care of speaking text)
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  // Create an option for each voice in array
  voices.forEach((voice) => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} (${voice.lang})`;

    voicesSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  // message is an instance of SpeechSynthesisUtterance class (instantiated above)
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

function removeTextBoxExitListener() {
  document.removeEventListener('click', timeoutFn);
}

function timeoutFn(e) {
  if (
    textBox.classList.contains('show') &&
    e.target !== textBox &&
    !textBox.contains(e.target) &&
    e.target !== toggleBtn
  ) {
    textBox.classList.remove('show');
    removeTextBoxExitListener();
  }
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.addEventListener('click', () => {
  textBox.classList.toggle('show');

  if (textBox.classList.contains('show')) {
    // Need the timeout so the transform for .text-box.show in CSS has time to take effect (per time, 1s, in transition property set in .text-box ruleset)
    setTimeout(() => document.addEventListener('click', timeoutFn), 1000);
  }
});

// Close btn (can close text box by clicking toggle text box or clicking close button)
closeBtn.addEventListener('click', () => {
  textBox.classList.remove('show');
});

// Change voice
voicesSelect.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

// Not needed in Chrome because voiceschanged event fires on page load, calling getVoices due to event listener (voiceschanged fires because the list of voices changes when Chrome finishes making an API call to get the list of voices available only to Chrome users). See https://stackoverflow.com/questions/65688030/why-is-the-voiceschanged-event-fired-on-page-load?noredirect=1#comment116140455_65688030
// getVoices();
