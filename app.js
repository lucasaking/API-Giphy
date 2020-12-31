const $gifArea = $("#gif-area");
const $colors = $("#color-change");
const $colors2 = $("#color-change2");
const $searchInput = $("#search");

/**
 * 
 * Giphy API
 * 
 * API - https://giphy.com/explore/party
 * 
 * Insert your API KEY from Giphy below.  
 * Add your API key into the empty double quotes below.
 * 
 * (This APP will not function without an API KEY!!)
 */

const API_KEY = "";


/** Use ajax result to add a gif */

function addRandomResultFromList(results) {
  let numResults = results.length;
  if (numResults) {
    let randomIdx = Math.floor(Math.random() * numResults);
    let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
    let $newGif = $("<img>", { style: "border: 3px solid white",
      src: results[randomIdx].images.original.url,
      class: "w-100"
    });
    $newCol.append($newGif);
    $gifArea.append($newCol);
  }
}

/** Get results from API. Returns list of results. */

async function getResults(evt) {
  let searchTerm = $searchInput.val();
  $searchInput.val("");

  const response = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}q=${searchTerm}`);
  return response.data.data;
}

/* Remove gif */

function removeGif() {
  $gifArea.empty();
}

/* Change Canvas background color */

function random_bg_color() {
  var x = Math.floor(Math.random() * 256);
  var y = Math.floor(Math.random() * 256);
  var z = Math.floor(Math.random() * 256);
  var bgColor = "rgb(" + x + "," + y + "," + z + ")";
  var bgColor2 = "rgb(" + z + "," + x + "," + y + ")";
  var bgColor3 = "rgb(" + y + "," + z + "," + x + ")";

  $colors.css({ 'color': `${bgColor}`});
  $colors2.css({ 'color': `${bgColor2}` });

  $gifArea.css({
    'background': `-webkit-linear-gradient(top,${bgColor2}, ${bgColor}, ${bgColor3})`,
  });
  return "Canvas Color updated!";
}


$("form").on("submit", async function (evt) {
  evt.preventDefault();
  const results = await getResults();
  addRandomResultFromList(results);
});

$("#remove").on("click", removeGif);
$("#change-color").on("click", random_bg_color);
