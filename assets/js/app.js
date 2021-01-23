//function to fetch titles by genre
var getFilteredResults = function(genre) {
	console.log(genre);
	var resultsUrl = "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=-!1900%2C2018-!0%2C5-!0%2C10-!" + genre + "-!Any-!Any-!Any-!gt100-!%7Bdownloadable%7D&t=ns&cl=78&st=adv&ob=Relevance&p=1&sa=and";
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

//Function to create and access an array of 5 random titles in the selected genre
var displayNetflixResults = function(searchResults) {
	var randomResults = [];
	for(var i=0; i < 5; i++) {
		var num = Math.floor(Math.random()*searchResults.ITEMS.length)
		randomResults.push(searchResults.ITEMS[num])
		console.log(num);
	}

	for(var i=0; i < randomResults.length; i++) {
		var resultsContainer = $("#movie-container");
		var movieImage = randomResults[i].image;
		var movieTitle = randomResults[i].title;
		var movieSynopsis = randomResults[i].synopsis;
		var resultsCol = $("<div>")
		console.log(movieTitle);
		console.log(movieImage);
		console.log(movieSynopsis);
	}
}

// TEST FUNCTION CALL
searchConverter("romance");