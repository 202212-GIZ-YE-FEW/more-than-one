"use strict";

// Constants for the base URLs of The Movie Database API and images
const TMDB_BASE_URL = "https://api.themoviedb.org/3"; // API base URL
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185"; // Actor/Actress profile image URL
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780"; // Movie backdrop image URL
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

// const renderMovies_s = (movies) => {
//     // Loop through each movie in the list
//     movies.map((movie) => {
//         // Create a div for the movie
//         const movieDiv = document.createElement("div");
//         // Set the inner HTML of the div to display the movie's poster and title
//         movieDiv.innerHTML = `<img src="${
//             BACKDROP_BASE_URL + movie.backdrop_path
//         }" alt="${movie.title} poster"> <h3>${movie.title}</h3>`;
//         // Add a click event listener to the div to display the movie's details when clicked
//         movieDiv.addEventListener("click", () => {
//             movieDetails(movie);
//         });
//         // Append the movie div to the container element
//         CONTAINER.appendChild(movieDiv);
//     });
// };

// * You'll need to play with this function in order to add features and enhance the style.
/**
 * Renders the movie details in the DOM
 * @param {Object} movie - The movie object that contains the movie details
 */
const renderMovie = (movie) => {
    // Set the inner HTML of the container element to display the movie's details
    CONTAINER.innerHTML = `
    <div class="row">
        <div class="col-md-4">
            <img id="movie-backdrop" src=${
                BACKDROP_BASE_URL + movie.backdrop_path
            }>
        </div>
        <div class="col-md-8">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${
                movie.release_date
            }</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div>
            <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled"></ul>
    </div>`;
};

// Add an event listener to the DOM to call the autoRun function when the DOM is loaded
document.addEventListener("DOMContentLoaded", autoRun);
