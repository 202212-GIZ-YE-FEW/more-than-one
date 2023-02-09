"use strict";

// Constants for the base URLs of The Movie Database API and images
const TMDB_BASE_URL = "https://api.themoviedb.org/3"; // API base URL
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185"; // Actor/Actress profile image URL
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780"; // Movie backdrop image URL
const POSTER_BASE_URL = "http://image.tmdb.org/t/p/w500/";
// const CONTAINER = document.querySelector(".container"); // Container for displaying movie data
const CONTAINER = document.querySelector(".movies-container"); // Container for displaying movie data

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
    movieDiv.className = "movie-item w-full md:w-1/3 p-4";
    movieDiv.innerHTML = `<img src="${
      BACKDROP_BASE_URL + movie.backdrop_path
    }" alt="${movie.title} poster"> <div class="mt-2">
    <h3 class="text-gray-400 text-lg font-semibold">
    ${movie.title}
    </h3>
    <div class="text-gray-600 text-sm">
        <span>${movie.top_rated}</span>
        <span class="ml-2"
            >Genres: Action, Adventure, Sci-Fi</span
        >
    </div>
</div>`;
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
  <section class="text-gray-400 bg-gray-900 body-font overflow-hidden">
  <div class="container px-5 py-24 mx-auto">
    <div class="lg:w-4/3 mx-auto flex flex-wrap">
    <img id="movie-backdrop" class="lg:h-48 md:h-36 w-full object-cover object-center" src="${
      backdropBaseUrl + movie.backdrop_path
    }"> 
      <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 class="text-sm title-font text-gray-500 tracking-widest">Movie NAME</h2>
        <h1 class="text-white text-3xl title-font font-medium mb-1">${
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

<div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
  <div class="mx-auto mb-10 lg:max-w-xl sm:text-center">
    <p class="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider  uppercase rounded-full bg-teal-accent-400">
 Company production
    </p>

  </div>
  <div class="grid gap-10 mx-auto sm:grid-cols-2 lg:grid-cols-4 lg:max-w-screen-lg">
    <div>
      <div class="relative pb-30 mb-4 rounded shadow lg:pb-64">
      ${movie.production_companies.map(
        (productionCompany) =>
          `
                 <img class="absolute object-cover w-full h-full rounded" src="${
                   backdropBaseUrl + productionCompany.logo_path
                 } "
                   alt="company" />` +
          `
                 </div>
                 <div class="flex flex-col sm:text-center">
                   <p class="text-lg font-bold"> ${productionCompany.name}</p>
                 
                  
                 </div>
               </div> `
      )}
           <div>
         
         </div>
      
</div>
</div>
</section>
<section id="actors" class=" list-unstyled text-gray-400 bg-gray-900 body-font">

</section>
<section  id="trailer-container" class="text-gray-400 bg-gray-900 body-font">
<div class="container px-2 py-10 mx-auto">
<div class="p-2 md:w-1/2 mx-auto">
<div class="embed-responsive embed-responsive-16by9 relative w-full overflow-hidden" style="padding-top: 56.25%">

</div>
</div>
</div>
</section>
<section id="related-movies" class="text-gray-400 bg-gray-900 body-font">  
</section>`
      
  //   CONTAINER.innerHTML = `
  //       <div class="row">
  //         <div class="col-md-4">
  //           <img id="movie-backdrop" src="${
  //             backdropBaseUrl + movie.backdrop_path
  //           }">
  //         </div>
  //         <div class="col-md-8">
  //           <h2 id="movie-title">${movie.title}</h2>
  //           <p id="movie-release-date"><b>Release Date:</b> ${
  //             movie.release_date
  //           }</p>
  //           <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
  //           <h3>Overview:</h3>
  //           <p id="movie-overview">${movie.overview}</p>
  //           <p id="movie-language"><b>Language:</b> ${
  //             movie.original_language
  //           }</p>
  //           <p id="movie-production">
  //           <b>Production Companies:</b>
  //
  //         </p>

  //           <p id="movie-director"><b>Director:
  //           <p id="vote_average" style="color: ${
  //             movie.vote_average > 7
  //               ? "yellow"
  //               : movie.vote_average > 5
  //               ? "orange"
  //               : "red"
  //           };">${movie.vote_average}</p>

  //           }<b>vote_average:
  //           <p id="movie-vote_count"><b>vote_count:</b> ${movie.vote_count} </p>
  //           <p id="movie-genres">
  //   <b>Genres:</b>
  //   ${movie.genres.map((genre) => genre.name).join(", ")}
  // </p>
  // <b>vote_average:
  //         </div>
  //       </div>
  //       <h3>Actors:</h3>
  //       <ul id="actors" class="list-unstyled"></ul>
  //       <div id="trailer-container">
  //       </div>
  //       <div id="related-movies">
  //       </div>
  //     `;
  // console.log(movie);
  actorsRun(movie.id);
  directorRun(movie.id);
  trailerRun(movie.id);
  RelatedMoviesRun(movie.id);
};

// Renders the Actor details in the DOM
//--------------------------------------------------------------------------------------

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
    const actors = data.cast.slice(0, 5).map((actor) => {
      console.log(actor);
      return `
      <div class="container px-5 py-5 mx-auto">
      <div class="flex flex-nowrap -m-4">
        <div class="p-2 md:w-1/4">
          <div class="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
            <img class="lg:h-48 md:h-36 w-full object-cover object-center" src="${
              PROFILE_BASE_URL + actor.profile_path
            }" alt="blog">
            <div class="p-6">
             
              <h1 class="title-font text-lg font-medium text-white mb-3">${
                actor.character
              }</h1>
             
            </div>
          </div>
        </div>    
      </div>
    </div> `;

      // return `
      //       <li class=" list-unstyled media my-3">
      //         <img src="${
      //           PROFILE_BASE_URL + actor.profile_path
      //         }" alt="" class="mr-3" width="120">
      //         <div class="media-body">
      //           <h5 class="mt-0 mb-1">${actor.name}</h5>
      //           <p>Character: ${actor.character}</p>

      //         </div>
      //       </li>

      //     `;
    });

    const actorsList = document.querySelector("#actors");

    actorsList.innerHTML = actors.join("");
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
//--------------------------------------------------------------------------------------
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
<iframe class="embed-responsive-item absolute top-0 right-0 bottom-0 left-0 w-full h-full" src="${trailerEmbedUrl}"
allowfullscreen=""
data-gtm-yt-inspected-2340190_699="true"
id="240632615"
></iframe>`;

    // trailerContainer.innerHTML = `
    //       <iframe
    //         width="560"
    //         height="315"
    //         src="${trailerEmbedUrl}"
    //         frameborder="0"
    //         allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    //         allowfullscreen
    //       ></iframe>
    //     `;
  } else {
    console.error("No trailer found");
  }
};
//--------------------------------------------------------------------------------------
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
    const relatedMovies = data.results.slice(0, 5).map((movie) => {
      const movieDiv = document.createElement("div");
      // Set the inner HTML of the div to display the movie's poster and title


      movieDiv.innerHTML = `      
      <div class="container px-5 py-10 mx-auto flex flex-wrap">
      <div class="lg:w-2/3 mx-auto">
       
        <div class="flex flex-nowrap -mx-8">
            <div class="px-2">
                <div class="flex flex-wrap w-full bg-gray-800 sm:py-24 py-16 sm:px-10 px-6 relative">
                  <img alt="gallery" class="w-full object-cover h-full object-center block opacity-25 absolute inset-0" src="${BACKDROP_BASE_URL + movie.poster_path}">
                  <div class="text-center relative z-10 w-full">
                    <h2 class="text-xl text-white font-medium title-font mb-2">${movie.title}</h2>
                   
                
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
         
        </div>
      </div>
    </div>`;


    //   movieDiv.innerHTML = `<div class="col-sm-6 col-md-4 col-lg-3 my-3">
    // <div class="card">
    // <img src="${BACKDROP_BASE_URL + movie.poster_path}" alt="${
    //     movie.title
    //   } poster" class="card-img-top">  
    // <div class="card-body">
    // <h3 class="card-title">${movie.title}</h3>
    // </div>
    //            </div>
    //         </div>`;
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
};
//-------------------------------------------------------------------------------------- rawan

//---- actors List :
function renderActors(actors) {
  actors.map((actor) => {
    const div = document.createElement("div");
    div.className = "md:w-1/4 p-4";
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
const renderActor = (actor) => {
  CONTAINER.innerHTML = `
    <div class="row " id="single-actor-page">
           <div class="col-lg-4 col-md-12 col-sm-12">
             <img id="actor-backdrop" src=${
               PROFILE_BASE_URL + actor.profile_path
             }> 
           </div>
           <div class="col-lg-8 col-md-12 col-sm-12">
             <h2 id="actor-name"><span>${actor.name}</span></h2>
             <h4>Gender:</h4>
             <p id="gender">${actor.gender}</p>
             <h4>Popularity:</h4>
             <p id="popularity">${actor.popularity}</p>
             <h4>Birthday:</h4>
             <p id="birthday">${actor.birthday}</p>
             ${actor.deathday}
             <h4>Biography:</h4>
              <p id="biography" style="color:#BDBDBD; font-size: .8rem;">${
                actor.biography
              }</p>
           </div>
        
         </div>  
       `;
};
//--------------------------------------------------------------------------------------
// Add an event listener to the DOM to call the autoRun function when the DOM is loaded
document.addEventListener("DOMContentLoaded", autoRun);
