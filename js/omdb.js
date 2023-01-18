const API_KEY = "3e3a05ae";
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;
const IMG_URL = `http://img.omdbapi.com/?apikey=${API_KEY}`;
const elForm = document.querySelector("[data-form]");
const elUl = document.querySelector("[data-ul]");
const elTemplate = document.querySelector("[data-template]");

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const formData = new FormData(elForm);
  const name = formData.get("name");
  searchMovies(name);
});

async function searchMovies(query) {
  const res = await fetch(`${API_URL}&s=${query}`);
  const searchResult = await res.json();

  renderMovies(searchResult.Search);
}

function renderMovies(movies) {
  elUl.innerHTML = "";
  movies.forEach((movie) => elUl.append(createDiv(movie)));
}

function createDiv(movie) {
  const elDivBox = elTemplate.content.cloneNode(true);

  elDivBox.querySelector("img").src = movie.Poster;
  elDivBox.querySelector("li").textContent = movie.Title;

  return elDivBox;
}