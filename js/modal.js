document.addEventListener("click", (evt) => {
  OnBtnInfoClick(evt);
  OnModalCloseClick(evt);
  onModalOutsideClick(evt);
  onPageClick(evt);
});

function OnBtnInfoClick(evt) {
  const el = evt.target.closest("[data-info-btn]");

  if (!el) return;

  const modalSelector = el.dataset.infoBtn;
  const movieId = el.dataset.movieId;
  const elModal = document.querySelector(modalSelector);
  elModal.querySelector("[data-spinner]").classList.remove("d-none");
  elModalSpinner = elModal.querySelector("[data-spinner]");

  fillModal(movieId, elModalSpinner);

  elModal.classList.add("show");
}

function OnModalCloseClick(evt) {
  const el = evt.target.closest("[data-modal-close]");

  if (!el) return;

  //   el.parentElement.parentElement.classList.remove("show");
  el.closest("[data-modal]").classList.remove("show");
}

function onModalOutsideClick(evt) {
  const el = evt.target;

  if (!el.matches("[data-modal]")) return;

  el.classList.remove("show");
}

function onPageClick(evt) {
  const el = evt.target.closest("[data-movie-page]");

  if (!el) return;
  evt.preventDefault();
  searchMovies(el.dataset.movieQuery, el.dataset.moviePage);
}

async function fillModal(movieId, elModalSpinner) {
  try {
    elModalSpinner.classList.remove("d-none");
    const movie = await getMovie(movieId);
    elDivInfo.querySelector(
      "[data-title]"
    ).textContent = `Name: ${movie.Title}`;
    elDivInfo.querySelector("[data-year]").textContent = `Year: ${movie.Year}`;
    elDivInfo.querySelector(
      "[data-rated]"
    ).textContent = `Rated: ${movie.Rated}`;
    elDivInfo.querySelector(
      "[data-released]"
    ).textContent = `Released: ${movie.Released}`;
    elDivInfo.querySelector(
      "[data-runtime]"
    ).textContent = `Time: ${movie.Runtime}`;
    elDivInfo.querySelector(
      "[data-genre]"
    ).textContent = `Genre: ${movie.Genre}`;
    elDivInfo.querySelector(
      "[data-director]"
    ).textContent = `Director: ${movie.Director}`;
    elDivInfo.querySelector(
      "[data-writer]"
    ).textContent = `Writer: ${movie.Writer}`;
    elDivInfo.querySelector(
      "[data-actors]"
    ).textContent = `Actors: ${movie.Actors}`;
    elDivInfo.querySelector("[data-plot]").textContent = `Plot: ${movie.Plot}`;
    elDivInfo.querySelector(
      "[data-language]"
    ).textContent = `Language: ${movie.Language}`;
    elDivInfo.querySelector(
      "[data-awards]"
    ).textContent = `Awards: ${movie.Awards}`;
    elDivInfo.querySelector(
      "[data-ImdbRatings]"
    ).textContent = `IMDb Rating: ${movie.imdbRating}`;
    elDivInfo.querySelector(
      "[data-id]"
    ).textContent = `IMDb Id: ${movie.imdbID}`;
    elDivInfo.querySelector("[data-type]").textContent = `Type: ${movie.Type}`;
  } catch (error) {
    alert(error)
  } finally {
    elModalSpinner.classList.add("d-none");
  }
}
