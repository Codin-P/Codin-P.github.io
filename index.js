
const API = "143f476b"
const baseURL = "http://www.omdbapi.com/?apikey=143f476b&"
const btn = document.querySelector("button")
const input = document.querySelector("input")
const movies = document.querySelector("#movies")
const watchList = document.querySelector("#watchlist")
const watchListHeader = document.querySelector("#watchlist-header")
const watchListLink = document.querySelector("#watchlist-link")

const getMovieData = async (params) => {

  const fullURL = baseURL + params
  const response = await fetch(fullURL)
  const data = await response.json()
  
  if(params[0] === "t") {
  renderMovie(data)
  }
  else if(params[0] === "i") {
    localStorage.setItem(params.substring(3), JSON.stringify(data))
  }
}


const renderMovie = (movie) => {

  document.querySelector("#movies img").style.display = "none";
  document.querySelector("#movies h2").style.display = "none";
  
  movies.insertAdjacentHTML("beforeend", `
  <div class="movie">
    <div class="poster">
      <img src=${movie.Poster}>
    </div>
    <div class="movie-data">
      <div class="title-rating">
        <h3>${movie.Title}</h3>
        <p><i class="fa-solid fa-star"></i> ${movie.Ratings[0].Value.match(/^[\d.]*/)}</p>
      </div>
      <ul class="facts">
        <li>${movie.Runtime}</li>
        <li>${movie.Genre}</li>
        <li><i class="fa-solid fa-circle-plus" id="${movie.imdbID}" data-title=${movie.imdbID}></i> Watchlist</li>
      </ul>
      <p class="plot">${movie.Plot}</p>
    </div>
  </div>`)
}


document.addEventListener("click", event => {

  event.preventDefault();

  if(event.target === btn) {
    console.log(input.value)
    getMovieData(`t=${input.value}`)
    input.value = ""
  }

  else if (event.target.dataset.title) {
    console.log(event.target.dataset)
    getMovieData(`i=${event.target.id}`)
    // localStorage.setItem(params.substring(3), JSON.stringify(data))
  }

  else if (event.target === document.querySelector("#index-link")) {
    window.location.assign("index.html");
  }

  else if (event.target === document.querySelector("#watchlist-link")) {
    window.location.assign("watchlist.html");
  }

  // else if(event.target === addBtn) {
  //   window.location.assign("index.html");
  // }

})

const getAllLocalStorageItems = () => {
  if (localStorage.length === 0) {
    watchListHeader.style.display = "block"
    watchListLink.style.display = "block"
  } else {
    watchListHeader.style.display = "none"
    watchListLink.style.display = "none"
  for (let i = 0; i < localStorage.length; i++) {
    let movie = JSON.parse(localStorage.getItem(localStorage.key(i)))
    watchList.insertAdjacentHTML ("beforeend", `<div class="movie">
    <div class="poster">
      <img src=${movie.Poster}>
    </div>
    <div class="movie-data">
      <div class="title-rating">
        <h3>${movie.Title}</h3>
        <p><i class="fa-solid fa-star"></i> ${movie.Ratings[0].Value.match(/^[\d.]*/)}</p>
      </div>
      <ul class="facts">
        <li>${movie.Runtime}</li>
        <li>${movie.Genre}</li>
        <li><i class="fa-solid fa-circle-minus" id="${movie.imdbID}" data-title=${movie.imdbID}></i> remove</li>
      </ul>
      <p class="plot">${movie.Plot}</p>
    </div>
  </div>`)
  }
  } // end of else-block
}

getAllLocalStorageItems();

// remove function => löscht Film aus local Storage und ruft localStorage erneut ab, update...