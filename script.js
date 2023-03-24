"use strict";

// Constants for the base URLs of The Movie Database API and images
const TMDB_BASE_URL = "https://api.themoviedb.org/3"; // API base URL
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185"; // Actor/Actress profile image URL
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w1280"; // Movie backdrop image URL
const POSTER_BASE_URL = "http://image.tmdb.org/t/p/w500/";
// const CONTAINER = document.querySelector(".container"); // Container for displaying movie data
const CONTAINER = document.querySelector(".movies-container"); // Container for displaying movie data
const ACTORS_CONTAINER = document.querySelector(".container");

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

const fetchFilteredMovies = async (filterOption) => {
  const url = constructUrl(`movie/${filterOption}`);
  const res = await fetch(url);
  return res.json();
};

const fetchMovieReleaseDates = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/release_dates`);
  const res = await fetch(url);
  return res.json();
};

const sortMoviesByReleaseDate = (movies) => {
  return movies.sort((a, b) => {
    const releaseDateA = fetchMovieReleaseDates(a.id);
    const releaseDateB = fetchMovieReleaseDates(b.id);
    return new Date(releaseDateA) - new Date(releaseDateB);
  });
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

// // movieDiv.className = "movie-item w-full md:w-1/3 p-4";
//         movieDiv.innerHTML = `<img src="${
//             BACKDROP_BASE_URL + movie.backdrop_path
//         }" alt="${movie.title} poster"> <div class="mt-2">
//     <h3 class="text-gray-400 text-lg font-semibold">
//     ${movie.title}
//     </h3>
//     <div class="text-gray-600 text-sm">
//         <span>${movie.top_rated}</span>
//         <span class="ml-2"
//             >Genres: Action, Adventure, Sci-Fi</span
//         >
//     </div>
// </div>

// * You'll need to play with this function in order to add features and enhance the style.
// Function to render the list of currently playing movies on the page
const renderMovies = (movies) => {
  if (!movies || !Array.isArray(movies)) {
    return;
  }
  // Loop through each movie in the list
  movies.map((movie) => {
    // Create a div for the movie
    const movieDiv = document.createElement("a");
    // Set the inner HTML of the div to display the movie's poster and title
    movieDiv.innerHTML = `
                <div
                    class="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
                    <img class="object-cover"
                        src="${BACKDROP_BASE_URL + movie.backdrop_path}"
                        alt="${
                          movie.title
                        }" style="width:380px; height:520px;"/>
                    <div
                        class="absolute inset-0 px-6 py-4 transition-opacity duration-200 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
                        <p class="mb-4 text-lg font-bold text-gray-100">
                            ${movie.title}
                        </p>
                        <p class="text-sm tracking-wide text-gray-300">
                            ${movie.overview}
                        </p>
                    </div>
                </div>
`;
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

//________________________________________________________________________________________
//   Renders the movie details in the DOM

const renderMovie = (movie) => {
  const backdropBaseUrl = "https://image.tmdb.org/t/p/w1280";
  const moviesContainer = document.querySelector(".grid");
  moviesContainer.classList.remove("grid");

  CONTAINER.innerHTML = `
  <section class="text-gray-400 bg-gray-900 body-font overflow-hidden ">
  <div class="container px-5 py-5 mx-auto ">
    <div class="lg:w-4/3 mx-auto flex flex-wrap items-center">
    <img id="movie-backdrop" class="lg:h-48 md:h-36 w-full object-cover object-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:grayscale hover:opacity-75" src="${
      backdropBaseUrl + movie.backdrop_path
    }">
      <div class="lg:w-1/1 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 mx-auto">
        <h2 class="text-sm title-font text-gray-500 tracking-widest text-center">Movie NAME</h2>
        <h1 class="text-white text-3xl title-font font-medium mb-1 text-center items-center">${
          movie.title
        }</h1>
        <div class="flex flex-col space-y-2">
        <div>${movie.release_date}</div>
        <div class="flex space-x-2">
  
        ${movie.genres
          .map(
            (genre) => `
        <button style="padding-top: 0.1em; padding-bottom: 0.1rem" class="text-sm px-3 bg-orange-200 text-orange-800 rounded-full"> ${genre.name}</button>
      `
          )
          .join("")}
  
        </div>
    </div>
        <div class="flex mb-4">
          <span class="flex items-center "style="color: ${
            movie.vote_average > 7
              ? "yellow"
              : movie.vote_average > 5
              ? "orange"
              : "red"
          };>
            <span class="ml-3">${movie.vote_average}</span>
          </span>
          <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-800 text-gray-500 space-x-2">
          Vote_Average
          </span>
        </div>
        <p class="leading-relaxed">${movie.overview}</p>
        <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-800 mb-5">
          <div class="flex">
            <span class="mr-3" id="movie-director">Director:</span>
          </div>
          <div class="flex ml-6 items-center">
            <span class="mr-3">Language:</span>${movie.original_language}
            <div class="relative">
            </div>
          </div>
        </div>
        <div class="flex">
          <span class="title-font font-medium text text-white">${
            movie.runtime
          } Minutes</span>
          <button class="flex ml-auto text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">Trailer</button>
          <button class="rounded-full w-10 h-10 bg-gray-800 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  </section>
  <section class="text-gray-400 bg-gray-900 body-font">
  <div class="px-4 py-3 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
  <h1 class="text-2xl font-bold font mb-4 text-white">Company production </h1>
  <div class="grid gap-10 mx-auto sm:grid-cols-5 lg:grid-cols-5 lg:max-w-screen-lg">
    <div>
      <div class="relative pb-5 mb-4 rounded shadow lg:pb-5">
      ${movie.production_companies.slice(0, 2).map(
        (productionCompany) =>
          `
                 <img class="lg:h-48 md:h-36 w-36 object-cover object-center" src="${
                   backdropBaseUrl + productionCompany.logo_path
                 } "
                   alt="company" />` +
          ` </div>
                 <div class="flex flex-col sm:text-center">
                   <p class="title-font text-lg font-medium text-white mb-3"> ${productionCompany.name}</p>
                 </div>
               </div> `
      )}
           <div>
         </div>
  </div>
  </div>
  </section>
   <section id="actorss" class=" list-unstyled text-gray-400 bg-gray-900 body-font">
   <div class="container px-5 py-5 mx-auto">
     </div>
   </section>
  <section  id="trailer-container" class="text-gray-400 bg-gray-900 body-font">
  <div class="container px-2 py-10 mx-auto">
  
  </div>
  </section>
  <section id="related-movies" class="text-gray-400 bg-gray-900 body-font">
  
  </section>`;

  directorRun(movie.id);

  RelatedMoviesRun(movie.id);
  trailerRun(movie.id);
  actorsRun(movie.id);
};

// Renders the Actor details in the DOM

const fetchActors = async (movieId) => {
  // Construct the URL for the API endpoint
  const url = constructUrl(`movie/${movieId}/credits`);
  // Fetch the response from the API
  const res = await fetch(url);
  // Return the JSON data from the response
  return res.json();
};

const actorsRun = async (movieId) => {
  const actors = await fetchActors(movieId);

  renderActores(actors);
};

const renderActores = (data) => {
  if (Array.isArray(data.cast)) {
    const actors = data.cast.slice(0, 5).map((actor, index) => {
      console.log(actor);
      return `
        <div class="p-2 md:w-1/5">
          <div class="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
            <img class="lg:h-48 md:h-36 w-full object-cover object-center transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" src="${
              PROFILE_BASE_URL + actor.profile_path
            }" alt="blog">
            <div class="p-6">
              <h1 class="title-font text-lg font-medium text-white mb-3">${
                actor.character
              }</h1>
            </div>    
          </div>
        </div> `;
    });

    const actorsList = document.querySelector("#actorss");
    actorsList.innerHTML = `
        <h1 class="text-2xl font-bold font mb-4 text-white">Actors</h1>
        <div class="flex flex-wrap">${actors.join("")}</div>
      `;
  } else {
    console.error("The 'data.cast' property is not an array");
  }
};

//--------------------------------------------------------------------------------------
// Renders the Director job in the DOM

const fetchDirector = async (movieId) => {
  // Construct the URL for the API endpoint
  const url = constructUrl(`movie/${movieId}/credits`);
  // Fetch the response from the API
  const res = await fetch(url);
  // Return the JSON data from the response
  return res.json();
};

const directorRun = async (movieId) => {
  const director = await fetchActors(movieId);

  renderDirector(director);
};

const renderDirector = (data) => {
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
};
// Renders the Trailer viedio in the DOM

const fetchTrailer = async (movieId) => {
  // Construct the URL for the API endpoint
  const url = constructUrl(`movie/${movieId}/videos`);
  // Fetch the response from the API
  const res = await fetch(url);
  // Return the JSON data from the response
  return res.json();
};

const trailerRun = async (movieId) => {
  const trailer = await fetchTrailer(movieId);

  renderTrailer(trailer);
};

const renderTrailer = (data) => {
  if (data.results.length) {
    const trailerKey = data.results[0].key;
    const trailerEmbedUrl = `https://www.youtube.com/embed/${trailerKey}`;
    const trailerContainer = document.querySelector("#trailer-container");
    trailerContainer.innerHTML = `
      <h1 class="text-2xl font-bold font mb-4 text-white">Trailer viedio</h1>
      <div class="p-2 md:w-1/2 mx-auto">
  <div class="embed-responsive embed-responsive-16by9 relative w-full overflow-hidden" style="padding-top: 56.25%">
  <iframe class="embed-responsive-item absolute top-0 right-0 bottom-0 left-0 w-full h-full" src="${trailerEmbedUrl}"
  allowfullscreen=""
  data-gtm-yt-inspected-2340190_699="true"
  id="240632615"
  ></iframe>
  
  </div>
  </div>
  
  
  <h1 class="text-2xl font-bold font my-10 text-white">Related Movies</h1>`;
  } else {
    console.error("No trailer found");
  }
};
//Renders the Get a list of similar movies. This is not the same as the "Recommendation" system you see on the website. in the DOM
const fetchRelatedMovies = async (movieId) => {
  // Construct the URL for the API endpoint
  const url = constructUrl(`movie/${movieId}/similar`);
  // Fetch the response from the API
  const res = await fetch(url);
  // Return the JSON data from the response
  return res.json();
};

const RelatedMoviesRun = async (movieId) => {
  const trailer = await fetchRelatedMovies(movieId);

  renderRelatedMovies(trailer);
};
const renderRelatedMovies = (data) => {
  if (Array.isArray(data.results)) {
    const relatedMovies = data.results.slice(0, 5);
    let movieDiv = document.createElement("div");
    movieDiv.classList.add(
      "container",
      "px-5",
      "py-10",
      "mx-auto",
      "flex",
      "flex-wrap"
    );
    movieDiv.innerHTML = `
       
        ${relatedMovies
          .map(
            (movie) => `
              <div class="lg:w-1/5 sm:w-1/3 p-2 mx-auto "> 
                <div class="relative pb-30 mb-10  rounded shadow lg:pb-64">
                  <img alt="gallery" class="absolute object-cover w-full h-full rounded transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:grayscale hover:opacity-75" src="${
                    BACKDROP_BASE_URL + movie.poster_path
                  }"> 
                </div> 
                <div class="flex flex-col sm:text-center text-center"> 
                  <h2 class="text-xl text-white font-medium title-font text-center  mb-20">${
                    movie.title
                  }</h2>
                </div>
              </div>
            `
          )
          .join("")}
      `;
    document.querySelector("#related-movies").innerHTML = "";
    document.querySelector("#related-movies").appendChild(movieDiv);
  } else {
    console.error("The 'data.results' property is not an array");
  }
};

//-------------------------------------------------------------------------------------- rawan

//---- actors List :
function renderActors(actors) {
  actors.map((actor) => {
    const div = document.createElement("div");
    div.className = "flex flex-wrap mx-auto";
    div.innerHTML = `<div class="col-lg-4 col-md-12 col-sm-12">
    <img src="${PROFILE_BASE_URL + actor.profile_path}" alt="${
      actor.name
    } poster"/>
<div class="bg-zinc-50 border-solid border-2"><h3 class="text-black-400 text-lg font-semibold text-center"> 
${actor.name} </h3></div></div>`;
    div.addEventListener("click", () => {
      actorDetails(actor);
    });
    CONTAINER.appendChild(div);
  });
}
const fetchActorsList = async () => {
  // Construct the URL for the API endpoint
  const url = constructUrl(`person/popular`);
  // Fetch the response from the API
  const res = await fetch(url);
  // Return the JSON data from the response
  return res.json();
};

const actorRun = async () => {
  const actors = await fetchActorsList();

  renderActors(actors.results);
};

const actorItem = document.getElementById("actors");
actorItem.addEventListener("click", () => {
  CONTAINER.innerHTML = "";
  actorRun();
});

//--- single actor :

const actorDetails = async (actor) => {
  // Fetch the details of the movie
  const actorItem = await fetchactor(actor.id);
  // Render the details of the movie on the page
  renderActor(actorItem);
};

const fetchactor = async (actorId) => {
  // Construct the URL for the API endpoint using the movie's ID
  const url = constructUrl(`person/${actorId}`);
  // Fetch the response from the API
  const res = await fetch(url);
  // Return the JSON data from the response
  return res.json();
};
/**
 *
 * @param {Object} actor
 */

const form = document.getElementById("form");
const search = document.getElementById("search");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const searchTerm = search.value;
  console.log(searchTerm);
  if (searchTerm && searchTerm !== "") {
    const searchResults =
      constructUrl(`search/movie/`) + `&query=${searchTerm}`;
    CONTAINER.innerHTML = "";

    try {
      const response = await fetch(searchResults);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const movies = data.results;
      console.log(movies);
      renderMovies(movies);
    } catch (error) {
      console.error(error);
      alert(
        "An error occurred while searching for movies. Please try again later."
      );
    }
  }
});

document
  .querySelector("#filter-movies")
  .addEventListener("change", async function handleFilterOptionChange(event) {
    const selectedOption = event.target.value;
    if (selectedOption === "") return;
    CONTAINER.innerHTML = "";
    try {
      const movies = await fetchFilteredMovies(selectedOption);
      if (selectedOption === "upcoming") {
        movies.results.sort(
          (a, b) => new Date(b.upcoming) - new Date(a.upcoming)
        );
      }
      renderMovies(movies.results);
    } catch (error) {
      console.error(error);
    }
  });

const renderActor = (actor) => {
  ACTORS_CONTAINER.innerHTML = `
        <div class="m-8 grid grid-row-3 grid-flow-col gap-12">
            <div class="col-lg-4 col-md-12 col-sm-12">
                <img id="actor-backdrop" src=${
                  PROFILE_BASE_URL + actor.profile_path
                }> 
                <h1 id="actor-name" class="bg-zinc-50 border-solid border-2"><h3 class="text-gray-100 text-violet-300 text-lg font-semibold "><span>${
                  actor.name
                }</span></h2>
            </div>
            <div class="col-lg-8 col-md-12 col-sm-12">

                <h2 class="bg-gray-900 text-opacity-100 text-gray-100 ">Gender</h2>
                <p class="font-bold m-2 text-violet-300">${checkGender(actor.gender)}</p>
                <h2 class="bg-gray-900 text-opacity-100 text-gray-100 ">Popularity</h2>
                <p class="font-bold m-2 text-violet-300">${actor.popularity}</p>
                <h2 class="bg-gray-900 text-opacity-100 text-gray-100 ">Birthday</h2>
                <p class="font-bold m-2 text-violet-300">${actor.birthday}</p>
                
                <h2 class="bg-gray-900 text-opacity-100 text-gray-100 ">Biography</h2>
                
                <p class="font-bold m-2 text-violet-300" >${actor.biography}</p>
            </div>
        
        </div>
           `;
};
// About 


const about = document.getElementById("about");

function aboutRun() {
  const moviesContainer = document.querySelector(".grid");
  moviesContainer.classList.remove("grid");
 
  const aboutSection = `
  <div class="md:bg-gray-900 bg-auto py-6 sm:py-8 lg:py-12 max-w-screen-2xl px-4 md:px-8 mx-auto">
  <div class="md:bg-gray-800 rounded-2xl px-4 py-6 md:py-8 lg:py-12 ">
    <h2 class="text-gray-300 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6  Abt">About us</h2>
    <p class="max-w-screen-md text-gray-400 capitalize md:text-lg text-center mx-auto fott">Our platform is one of the largest global platforms that collect international movies</p> 
    <p class="max-w-screen-md text-gray-500  md:text-lg text-center mx-auto fott"> This is a movie database project, where it shows movies, their casts, ratings, trailers, related movies, genres, and so on.

    This project uses The Movie DB API: https://api.themoviedb.org/3. It is up to you to use your Google and Postman skills to explore the API and understand the data.
    
    </p>
  </div>
  `;
  
  
  CONTAINER.innerHTML = aboutSection;
}

about.addEventListener("click", () => {
  aboutRun();
});

function checkGender(gender) {
  if (gender === 1) {
    return "Female";
  } else {
    return "Male";
  }
}

// document.addEventListener("click", function(event) {
//     if (event.target.tagName === "a" && event.target.getAttribute("href") === "#") {
//         CONTAINER.innerHTML='';
//       autoRun();
//     }
//   });
// document.querySelector(".home").addEventListener("click", autoRun);
var homeLinks = document.querySelectorAll(".home");

for (var i = 0; i < homeLinks.length; i++) {
  homeLinks[i].addEventListener("click", autoRun);
}

// Add an event listener to the DOM to call the autoRun function when the DOM is loaded
document.addEventListener("DOMContentLoaded", autoRun);
