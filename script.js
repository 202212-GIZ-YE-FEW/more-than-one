"use strict";

// Constants for the base URLs of The Movie Database API and images
const TMDB_BASE_URL = "https://api.themoviedb.org/3"; // API base URL
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185"; // Actor/Actress profile image URL
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780"; // Movie backdrop image URL
const POSTER_BASE_URL = "http://image.tmdb.org/t/p/w500/";
const CONTAINER = document.querySelector(".container"); // Container for displaying movie data

// ! Don't touch this function please
// Function to automatically run on page load and fetch movie data
const autoRun = async () => {
  // Fetch the list of movies
  const movies = await fetchMovies();
  // Render the list of movies on the page
  renderMovies(movies.results);
};

// ! Don't touch this function please
// Function to construct the URL for The Movie Database API
const constructUrl = (path) => {
  // Return the constructed URL by combining the base URL, API path, and API key
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

// ! You may need to add to this function, definitely don't delete it.
// Function to retrieve and display the details of a movie
const movieDetails = async (movie) => {
  // Fetch the details of the movie
  const movieRes = await fetchMovie(movie.id);
  // Render the details of the movie on the page
  renderMovie(movieRes);
};

// * This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
// Function to fetch the list of currently playing movies
const fetchMovies = async () => {
  // Construct the URL for the API endpoint
  const url = constructUrl(`movie/now_playing`);
  // Fetch the response from the API
  const res = await fetch(url);
  // Return the JSON data from the response
  return res.json();
};

// ! Don't touch this function please. This function is to fetch one movie.
// Function to fetch the details of a movie
const fetchMovie = async (movieId) => {
  // Construct the URL for the API endpoint using the movie's ID
  const url = constructUrl(`movie/${movieId}`);
  // Fetch the response from the API
  const res = await fetch(url);
  // Return the JSON data from the response
  return res.json();
};

// * You'll need to play with this function in order to add features and enhance the style.
// Function to render the list of currently playing movies on the page
const renderMovies = (movies) => {
  // Loop through each movie in the list
  movies.map((movie) => {
    // Create a div for the movie
    const movieDiv = document.createElement("div");
    // Set the inner HTML of the div to display the movie's poster and title
    movieDiv.innerHTML = `<img src="${
      BACKDROP_BASE_URL + movie.backdrop_path
    }" alt="${movie.title} poster"> <h3>${movie.title}</h3>`;
    // Add a click event listener to the div to display the movie's details when clicked
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    // Append the movie div to the container element
    CONTAINER.appendChild(movieDiv);
  });
};

// * You'll need to play with this function in order to add features and enhance the style.
/**
 * Renders the movie details in the DOM
 * @param {Object} movie - The movie object that contains the movie details
 */
//

const renderMovie = (movie) => {
  const backdropBaseUrl = "https://image.tmdb.org/t/p/w1280";

  CONTAINER.innerHTML = `
      <div class="row"> 
        <div class="col-md-4"> 
          <img id="movie-backdrop" src="${
            backdropBaseUrl + movie.backdrop_path
          }"> 
        </div> 
        <div class="col-md-8"> 
          <h2 id="movie-title">${movie.title}</h2>
          <p id="movie-release-date"><b>Release Date:</b> ${
            movie.release_date
          }</p> 
          <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p> 
          <h3>Overview:</h3> 
          <p id="movie-overview">${movie.overview}</p> 
          <p id="movie-language"><b>Language:</b> ${
            movie.original_language
          }</p> 
          <p id="movie-production">
          <b>Production Companies:</b> 
          ${movie.production_companies
            .map(
              (productionCompany) =>
                productionCompany.name +
                `<img src="${
                  backdropBaseUrl + productionCompany.logo_path
                }" width="50">`
            )
            .join(", ")}
        </p>
        
       
          <p id="movie-director"><b>Director:
          <p id="vote_average">${movie.vote_average}<b>vote_average:
          <p id="movie-genres">
  <b>Genres:</b> 
  ${movie.genres.map((genre) => genre.name).join(", ")}
</p>
<b>vote_average:
        </div>
      </div> 
      <h3>Actors:</h3> 
      <ul id="actors" class="list-unstyled"></ul> 
      <div id="trailer-container"> 
      </div>
      <div id="related-movies"> 
      </div>
    `;
  // console.log(movie);
  fetchActors(movie.id);
  fetchDirector(movie.id);
  fetchTrailer(movie.id);
  fetchRelatedMovies(movie.id);
};

// Renders the Actor details in the DOM

const fetchActors = (movieId) => {
  const ACTORS_URL = constructUrl(`movie/${movieId}/credits`);
  fetch(ACTORS_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (Array.isArray(data.cast)) {
        const actors = data.cast.slice(0, 5).map((actor) => {
          console.log(actor);
          return `
            <li class=" list-unstyled media my-3">
              <img src="${
                PROFILE_BASE_URL + actor.profile_path
              }" alt="" class="mr-3" width="120">
              <div class="media-body">
                <h5 class="mt-0 mb-1">${actor.name}</h5>
                <p>Character: ${actor.character}</p>
               
              </div>
            </li>
          `;
        });
        document.querySelector("#actors").innerHTML = actors.join("");
      } else {
        console.error("The 'data.cast' property is not an array");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

// Renders the Director job in the DOM

const fetchDirector = (movieId) => {
  const CREDITS_URL = constructUrl(`movie/${movieId}/credits`);
  fetch(CREDITS_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (Array.isArray(data.crew)) {
        const director = data.crew.find((member) => member.job === "Director");
        if (director) {
          document.querySelector("#movie-director").innerHTML = `
            <p class="media my-3">
              Director: ${director.name}
            </p>
          `;
        } else {
          console.error("No director found for this movie");
        }
      } else {
        console.error("The 'data.crew' property is not an array");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

// Renders the Trailer viedio in the DOM

const fetchTrailer = (movieId) => {
  const TRAILER_URL = constructUrl(`movie/${movieId}/videos`);
  fetch(TRAILER_URL)
    .then((response) => response.json())
    .then((data) => {
      if (data.results.length) {
        const trailerKey = data.results[0].key;
        const trailerEmbedUrl = `https://www.youtube.com/embed/${trailerKey}`;
        const trailerContainer = document.querySelector("#trailer-container");
        trailerContainer.innerHTML = `
          <iframe
            width="560"
            height="315"
            src="${trailerEmbedUrl}"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        `;
      } else {
        console.error("No trailer found");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
//Renders the Get a list of similar movies. This is not the same as the "Recommendation" system you see on the website. in the DOM
const fetchRelatedMovies = (movieId) => {
  const RELATED_MOVIES_URL = constructUrl(`movie/${movieId}/similar`);
  fetch(RELATED_MOVIES_URL)
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data.results)) {
        const relatedMovies = data.results.slice(0, 5).map((movie) => {
          const movieDiv = document.createElement("div");
          // Set the inner HTML of the div to display the movie's poster and title
          movieDiv.innerHTML = `<div class="col-sm-6 col-md-4 col-lg-3 my-3">
    <div class="card">
    <img src="${BACKDROP_BASE_URL + movie.poster_path}" alt="${
            movie.title
          } poster" class="card-img-top">  
    <div class="card-body">
    <h3 class="card-title">${movie.title}</h3>
    </div>
               </div>
            </div>`;
          // Add a click event listener to the div to display the movie's details when clicked
          movieDiv.addEventListener("click", () => {
            movieDetails(movie);
          });
          // Append the movie div to the container element
          CONTAINER.appendChild(movieDiv);
        });
        document.querySelector("#related-movies").innerHTML =
          relatedMovies.join("");
      } else {
        console.error("The 'data.results' property is not an array");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

// Add an event listener to the DOM to call the autoRun function when the DOM is loaded
document.addEventListener("DOMContentLoaded", autoRun);