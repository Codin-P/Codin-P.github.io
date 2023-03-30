
const API = "143f476b"
const baseURL = "http://www.omdbapi.com/?apikey=143f476b&t="

const btn = document.querySelector("button")
const input = document.querySelector("input")
const movies = document.querySelector("#movies")
const watchList = document.querySelector("#watchlist")
const watchListHeader = document.querySelector("#watchlist-header")
const watchListLink = document.querySelector("#watchlist-link")
const placeHolder = document.querySelector("#placeholder")

const getMovieData = async (params) => {

  const fullURL = baseURL + params
  const response = await fetch(fullURL)
  const data = await response.json()
  
  return data
}


const renderMovie = (movie) => {

  try {
    document.querySelector("#movies img").style.display = "none";
    document.querySelector("#movies h2").style.display = "none";
  }
  catch(err) {
    console.error(err)
  }
  
  movies.innerHTML = `
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
        <li><i class="fa-solid fa-circle-plus" id="${movie.Title}" data-title=${movie.Title}></i> Watchlist</li>
      </ul>
      <p class="plot">${movie.Plot}</p>
    </div>
  </div>`
}


document.addEventListener("click", event => {

  event.preventDefault();

  if(event.target === btn) {
    getMovieData(input.value)
      .then(data => { 
        renderMovie(data)})
    input.value = ""
  }

  else if (event.target.dataset.title) {
    console.log(event.target.id)
    getMovieData(event.target.id).then(data => 
      localStorage.setItem(event.target.id, JSON.stringify(data)))
  }

  else if (event.target === document.querySelector("#index-link")) {
    window.location.assign("index.html");
  }

  else if (event.target === document.querySelector("#watchlist-link")) {
    window.location.assign("watchlist.html");
  }

  else if(event.target.dataset.remove) {
    console.log(event.target.id)
    localStorage.removeItem(event.target.id)
    
    console.log(document.getElementById(event.target.dataset.remove))
    document.getElementById(event.target.dataset.remove).outerHTML = ""
    
  }

})

const getAllMoviesFromLocalStorage = () => {
  if (localStorage.length === 0) {
    placeHolder.style.display = "flex";
  } else {
    placeHolder.style.display = "none";
  for (let i = 0; i < localStorage.length; i++) {
    let movie = JSON.parse(localStorage.getItem(localStorage.key(i)))
    watchList.insertAdjacentHTML ("beforeend", `<div class="movie" id=${movie.Title}>
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
        <li><i class="fa-solid fa-circle-minus" id="${movie.Title}" data-remove=${movie.Title}></i> remove</li>
      </ul>
      <p class="plot">${movie.Plot}</p>
    </div>
  </div>`)
  }
  }
}

try {
  getAllMoviesFromLocalStorage();
}
catch(error) {
  console.error(error)
}