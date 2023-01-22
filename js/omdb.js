const API_KEY = "3e3a05ae";
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;
const IMG_URL = `https://img.omdbapi.com/?apikey=${API_KEY}`;
const elForm = document.querySelector("[data-form]");
const elUl = document.querySelector("[data-ul]");
const elDivInfo = document.querySelector("[data-infos]");
const elPagination = document.querySelector("[data-movie-pagination]");

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const formData = new FormData(elForm);
  const name = formData.get("name");
  const year = formData.get("year-movie");
  const type = formData.get("type-movie");
  searchMovies(name, year, type);
});

async function searchMovies(query, year, type, page = 1) {
  elUl.innerHTML = `<div class="spinner-border text-primary spinner__loading" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;
  let res = await fetch(
    `${API_URL}&s=${query}&y=${year}&type=${type}&page=${page}`
  );
  const searchResult = await res.json();

  if (searchResult.Error) {
    alert(searchResult.Error);
    return;
  }

  renderMovies(searchResult.Search);
  renderPagination(
    Math.ceil(+searchResult.totalResults / 10),
    query,
    page,
    year,
    type
  );
}

async function getMovie(movieId) {
  const res = await fetch(`${API_URL}&i=${movieId}`);

  return await res.json();
}

function renderMovies(movies) {
  elUl.innerHTML = "";
  let html = "";
  movies.forEach((movie) => {
    const moviePosterUrl =
      movie.Poster === "N/A"
        ? "https://via.placeholder.com/300x445"
        : movie.Poster;
    html += `
      <div class="card-box shadow-lg mb-5 bg-body-tertiary rounded">
        <img class="img-card" src=${moviePosterUrl} alt=${movie.Title} />
        <li class="mb-1">${movie.Title}</li>
        <button class="btn btn-danger w-100 mb-2" data-info-btn="#test-modal" data-movie-id=${movie.imdbID}>Info</button>
      </div>
    `;
  });
  elUl.innerHTML = html;
}

function renderPagination(totalPages, query, page) {
  elPagination.innerHTML = "";
  let html = "";
  html += `<li class="page-item${+page === 1 ? " disabled" : ""}">
    <a class="page-link" data-movie-page=${
      +page - 1
    } data-movie-query="${query}"  href="?page=${+page - 1}">Previous</a>
  </li>`;
  for (let i = 1; i <= totalPages; i++) {
    html += `<li class="page-item${
      +page === i ? " active" : ""
    }"><a class="page-link" data-movie-page=${i} data-movie-query="${query}"  href="?page=${i}">${i}</a></li>`;
  }

  html += `<li class="page-item${+page === totalPages ? " disabled" : ""}">
  <Previous class="page-link" data-movie-page=${
    page + 1
  } data-movie-query="${query}"  href="?page=${page + 1}">Next</a>
</li>`;

  elPagination.innerHTML = html;
}
