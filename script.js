"use strict";

const API_KEY = "api_key=b96be90fb5eb89b775dfd1f4c66779f1";
const BASE_URL = "https://api.themoviedb.org/3";

const IMG_URL = "https://image.tmdb.org/t/p/w500";
// discover url არის რეალურად: https://api.themoviedb.org/3 + discover/movie? + api_key=b96be90fb5eb89b775dfd1f4c66779f1
const discoverURL = `${BASE_URL}/discover/movie?${API_KEY}`;

// `https://api.themoviedb.org/3/search/movie?api_key=b96be90fb5eb89b775dfd1f4c66779f1&query=${საძიებო სიტყვა}`

// Ეს არის search-ის api, რადგან URL-ებს ცალ-ცალკე ვაწყობთ, როგორც სლეკში განახეთ მაგ შემთხვევაში ეს იქნება search url

const searchURL = `${BASE_URL}/search/movie?${API_KEY}`;

const main = document.getElementById("main");

// საჭიროა იმისთვის, რომ აპიდან წამოვიღოთ ფილმების სია
const getMovies = async (url) => {
  await axios
    .get(url)
    .then((res) => {
      const data = res.data.results;
      console.log(data);
      if (data && data.length > 0) {
        showMovies(data);
      } else {
        main.innerHTML = `<h1 class="no-results">No Results Found</h1>`;
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

// საჭიროა იმისთვის, რომ "main" parent ელემენტში შექმნას/დაამატოს ყველა ფილმების card-ები
  // main ელემენტი არის html-ში თუ ჩავხედავთ "<main id="main"></main>" ეს ელემენტი
  // innerHTML-ის გამოყენებით მასში ვწერთ, ვამატებთ
  // movie არის სათითაო item-ი დაბრუნებულ api result array-დან
      const showMovies = (data) => {
         main.innerHTML = data.map((gio) => {
          return `<div class="movie">
                       <img src="${gio.poster_path
                                      ? IMG_URL + gio.poster_path
                                      : "http://via.placeholder.com/1080x1580"}">

                    <div class="movie-info"> 
                        <h3> ${gio.title} </h3> 
                    

                      <span class="movie-rating"> 
                          ${gio.vote_average} 
                      </span>
                    </div>
        
                          <div class="overview">
                                <h3>Overview</h3>
                                 ${gio.overview}
                          </div>
                   </div>`;
  });
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();
  await getMovies(
    searchTerm ? `${searchURL}&query=${searchTerm}` : discoverURL
  );
});

// ეს ასინქრონული ფუნქცია საჭიროა იმისთვის, რომ თავიდანვე page-ის ჩატვირთვის თანავე წამოიღოს ფილმების სია.
(async () => {
  await getMovies(discoverURL);
})();
