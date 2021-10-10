import Modal from "./Modal.js";

const searchInput = document.getElementById("search-field");
const navItems = document.getElementById("nav-items");

navItems.addEventListener("click", function (e) {
  const clicked = e.target;
  if (clicked.dataset?.for === "signup") {
    new Modal("signup");
  } else {
    new Modal("signin");
  }
});

const availableSearchs = [
  "MOVIES!",
  "FILMS!",
  "SERIES!",
  "TITLES!",
  "REVIEWS!",
];

function customNodeCreator(character) {
  searchInput.placeholder += character;

  return null;
}

function onRemoveNode() {
  if (searchInput.placeholder) {
    searchInput.placeholder = searchInput.placeholder.slice(0, -1);
  }
}

const typewriter = new Typewriter(null, {
  loop: true,
  delay: 75,
  onCreateTextNode: customNodeCreator,
  onRemoveNode: onRemoveNode,
});

typewriter.pauseFor(1200).typeString("Search for ");

let lastTerm;
availableSearchs.forEach((term, i, arr) => {
  if (i !== 0) {
    typewriter.deleteChars(lastTerm.length);
  } else if (i === availableSearchs.length - 1) {
    typewriter.deleteAll();
  }
  typewriter.typeString(term).pauseFor(2500);
  lastTerm = term;
});

typewriter.start();
