const notes = {
  bass: [
    { name: 'F', symbol: 's' },
    { name: 'G', symbol: 't' },
    { name: 'A', symbol: 'u' },
    { name: 'B', symbol: 'v' },
    { name: 'C', symbol: 'w' },
    { name: 'D', symbol: 'x' },
    { name: 'E', symbol: 'y' },
    { name: 'F', symbol: 'z' },
    { name: 'G', symbol: '{' },
    { name: 'A', symbol: '|' },
    { name: 'B', symbol: '}' },
    { name: 'C', symbol: '~' },
  ],
  alto: [
    { name: 'E', symbol: 's' },
    { name: 'F', symbol: 't' },
    { name: 'G', symbol: 'u' },
    { name: 'A', symbol: 'v' },
    { name: 'B', symbol: 'w' },
    { name: 'C', symbol: 'x' },
    { name: 'D', symbol: 'y' },
    { name: 'E', symbol: 'z' },
    { name: 'F', symbol: '{' },
    { name: 'G', symbol: '|' },
    { name: 'A', symbol: '}' },
    { name: 'B', symbol: '~' },
  ],
  treble: [
    { name: 'C', symbol: 'r' },
    { name: 'D', symbol: 's' },
    { name: 'E', symbol: 't' },
    { name: 'F', symbol: 'u' },
    { name: 'G', symbol: 'v' },
    { name: 'A', symbol: 'w' },
    { name: 'B', symbol: 'x' },
    { name: 'C', symbol: 'y' },
    { name: 'D', symbol: 'z' },
    { name: 'E', symbol: '{' },
    { name: 'F', symbol: '|' },
    { name: 'G', symbol: '}' },
  ],
};
let place = -1;
let time;
let timer;
const success = document.getElementById('success');
const error = document.getElementById('error');
let errors;
let lastError = -1;
let currentNotes = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function init() {
  time = 0.00;
  errors = 0;
  currentNotes = shuffle(notes[document.getElementById('clef').innerText]);
  document.getElementsByTagName('body')[0].setAttribute('data-playing', 'true');
  timer = setInterval(() => {
    time += 0.01;
    document.getElementById('time').innerHTML = `${time.toFixed(2)} seconds spent.`;
  }, 10);
  success.innerText = 'Go!';
  error.innerText = '';
  next();
}

function next() {
  place += 1;
  if (place >= currentNotes.length) {
    clearInterval(timer);
    document.getElementsByTagName('body')[0].setAttribute('data-playing', 'false');
    document.getElementsByTagName('body')[0].setAttribute('data-finished', 'true');
    success.innerText = "You're done! You got " + (place - errors) + "/" + currentNotes.length + " correct. It took you an average of " + (Math.floor((time * 100 / currentNotes.length)) / 100) + " seconds per note.";
    error.innerText = "";
    place = -1;
    return false;
  }
  document.getElementById('note').innerText = currentNotes[place].symbol;
}

function checkAnswer(note) {
  if (place < 0) return false;
  if (note === currentNotes[place].name) {
    error.innerText = "";
    success.innerText = "Great!";
    next();
  } else if (lastError !== place) {
    success.innerText = "";
    error.innerText = "Whoops! Try again.";
    lastError = place;
    errors += 1;
  }
}

window.addEventListener('keypress', (e) => {
  if (e.key) {
    checkAnswer(e.key.toUpperCase());
  }
});
