var notes = {
  "bass": [
    {"name": "F", "symbol": "s"},
    {"name": "G", "symbol": "t"},
    {"name": "A", "symbol": "u"},
    {"name": "B", "symbol": "v"},
    {"name": "C", "symbol": "w"},
    {"name": "D", "symbol": "x"},
    {"name": "E", "symbol": "y"},
    {"name": "F", "symbol": "z"},
    {"name": "G", "symbol": "{"},
    {"name": "A", "symbol": "|"},
    {"name": "B", "symbol": "}"}
  ],
  "alto": [],
  "treble": []
}
var place;
var time;
var timer;
var success = document.getElementById("success");
var error = document.getElementById("error");
var errors;
var currentNotes = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function init() {
  place = -1;
  time = 0.00;
  errors = 0;
  currentNotes = shuffle(notes[document.getElementById("clef").innerText]);
  document.getElementsByTagName("body")[0].setAttribute("data-playing", "true");
  timer = setInterval(function () {
    time+=0.01;
    document.getElementById("time").innerHTML=time.toFixed(2)+" seconds spent.";
  }, 10);
  success.innerText = "Go!";
  error.innerText = "";
}
