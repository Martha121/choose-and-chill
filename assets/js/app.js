// Get any parameters from the URL, if exist
var urlParams = new URLSearchParams(window.location.search);
var urlParamsGenre = urlParams.get("genre")
if(urlParamsGenre){
	// Call the Netflix search with the URL parameter
	searchConverter(urlParamsGenre);
} else{
	document.getElementById("system-message").innerHTML="Error: Missing URL parameter with genre information";
}

//function to fetch titles by genre
var getFilteredResults = function(genre) {
	console.log(genre);
	var resultsUrl = "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=-!1900%2C2018-!0%2C5-!7%2C10-!" + genre + "-!Any-!Any-!Any-!gt100-!%7Bdownloadable%7D&t=ns&cl=78&st=adv&ob=Relevance&p=1&sa=and";
	fetch(resultsUrl, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "0c425d1814msh0b34ce4efb75316p1d5409jsn5681f63cb68d",
		"x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com"
	}
})
.then(response => {
	response.json().then(function(data) {
		console.log(data);
		displayNetflixResults(data);
		});
})
.catch(err => {
	console.error(err);
});

}

//convert search input to genre id
var searchConverter = function(genre) {
	genre = genre.toLowerCase();
	console.log(genre);
	if(genre == "action") {
		genre = "801362";
		getFilteredResults(genre)
	} else if(genre == "comedy") {
		genre = "6548";
		getFilteredResults(genre)
	} else if(genre == "drama") {
		genre = "5763";
		getFilteredResults(genre)
	} else if(genre == "foreign") {
		genre = "2150";
		getFilteredResults(genre)
	} else if (genre == "horror") {
		genre = "8711";
		getFilteredResults(genre)
	} else if (genre == "romance") {
		genre = "8883";
		getFilteredResults(genre)
	}; 

}

//Function to display 5 random recipes returned by the fetch
var displayNetflixResults = function(searchResults) {
	var randomResults = [];
	for(var i=0; i < 5; i++) {
		var num = Math.floor(Math.random()*searchResults.ITEMS.length)
		randomResults.push(searchResults.ITEMS[num])
		console.log(num);
	}

	for(var i=0; i < randomResults.length; i++) {
		var movieImgEl = document.createElement("img");
		var movieImageSrc = randomResults[i].image;
		movieImgEl.src = movieImageSrc;
		var movieSynopsis = randomResults[i].synopsis;
		var movieTitle = randomResults[i].title;
        var movieTitleButton = document.createElement("button");
		movieTitleButton.textContent = randomResults[i].title;
		movieTitleButton.value = 
		movieTitleButton.addEventListener("click", function(event){
			var targetElement = event.target;
			movieTitleButtonClick(targetElement, movieTitle, movieImageSrc, movieSynopsis);
		})
        

		var movieRowEl = document.getElementById('movie-row');
		console.log(movieRowEl);
		var movieColEl = document.createElement("div");
		movieColEl.className = "col-sm-2";

        movieRowEl.appendChild(movieColEl);
        movieColEl.appendChild(movieTitleButton);
        movieColEl.appendChild(movieImgEl);
	}
}

var movieTitleButtonClick = function () {
	
}

var displayTitleDetails = function() {

}

// TEST FUNCTION CALL
searchConverter("comedy");