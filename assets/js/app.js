// Get any parameters from the URL, if exist
var urlParams = new URLSearchParams(window.location.search);
var urlParamsGenre = urlParams.get("genre");
var urlParamsNetflixId = urlParams.get("netflixid");
if (urlParamsNetflixId) {
	getDetailsById(urlParamsNetflixId);
}
else if(urlParamsGenre){
	// Call the Netflix search with the URL parameter
	searchConverter(urlParamsGenre);
} else{
	document.getElementById("system-message").innerHTML="Error: Missing URL parameter with genre information";
}

//function to fetch titles by genre
function getFilteredResults(genre) {
	console.log(genre);
	var resultsUrl = "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get%3Anew2555-!1900%2C2020-!0%2C5-!7%2C10-!" + genre + "-!Any-!Any-!Any-!gt50-!%7Bdownloadable%7D&t=ns&cl=78&st=adv&ob=Relevance&p=1&sa=and";
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

//function to fetch title details by id
function getDetailsById(netflixId) {
	var detailsUrl = "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?t=loadvideo&q=" + netflixId;
	fetch(detailsUrl, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "0c425d1814msh0b34ce4efb75316p1d5409jsn5681f63cb68d",
		"x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com"
	}
})
.then(response => {
	response.json().then(function(data) {
		console.log(data);
		displayMovieDetails(data);
		});
})
.catch(err => {
	console.error(err);
});

}

//convert search input to genre id
function searchConverter(genre) {
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
        var movieTitleButton = document.createElement("button");
		movieTitleButton.textContent = randomResults[i].title;
		movieTitleButton.value = randomResults[i].netflixid; 
		movieTitleButton.addEventListener("click", function(event){
			var targetElement = event.target;
			btnMovieTitleClick(targetElement);
		})
        
		var movieRowEl = document.getElementById('movie-row');
		//console.log(movieRowEl);
		var movieColEl = document.createElement("div");
		movieColEl.className = "col-sm-2";

        movieRowEl.appendChild(movieColEl);
        movieColEl.appendChild(movieTitleButton);
		movieColEl.appendChild(movieImgEl);
	
	}
}

var btnMovieTitleClick = function(targetElement) {
	var netflixId = targetElement.value;
	getDetailsById(netflixId);
}

var displayMovieDetails = function(movie) {
	var titleDetailsEl = document.getElementById("modal-movie-details");
	titleDetailsEl.innerHTML = "";
	var movieTitleEl = document.createElement("h2");
	movieTitleEl.textContent = movie.RESULT.nfinfo.title;
	var movieImageEl = document.createElement("img");
	movieImageEl.src = movie.RESULT.nfinfo.image1;
	var movieSynopsisEl = document.createElement("p");
	movieSynopsisEl.textContent = movie.RESULT.nfinfo.synopsis;
	var movieLinkEl = document.createElement("a");
	var str1 = "https://www.netflix.com/browse?jbv=";
	var str2 = movie.RESULT.nfinfo.netflixid;
	movieLinkEl.href = str1.concat(str2);
	movieLinkEl.textContent = "Link to Netflix Page";



	titleDetailsEl.appendChild(movieTitleEl);
	titleDetailsEl.appendChild(movieImageEl);
	titleDetailsEl.appendChild(movieSynopsisEl);
	titleDetailsEl.appendChild(movieLinkEl);

	if (urlParamsNetflixId) {
		 // Add a link back to main page
        var linkToMainPage = document.createElement("a");
        var linkText = document.createTextNode("Return to Main Page");
        linkToMainPage.appendChild(linkText);
        linkToMainPage.title = "my title text";
        linkToMainPage.href = "index.html";
        titleDetailsEl.appendChild(linkToMainPage);
	} else {
		var button1 =document.createElement("button");
        button1.type = "button";
        button1.innerHTML = "Save this recipe";
        button1.addEventListener("click", function(){
            saveTitleDetails(movie);
        });
        var button2 = document.createElement("button");
        button2.type = "button";
        button2.innerHTML = "Return to options";
        button2.addEventListener("click", function(){
            clearTitleDetails();
        });
        titleDetailsEl.appendChild(button1);
        titleDetailsEl.appendChild(button2);
	}

	titleDetailsEl.style.display = "block";
}

//function to remove modal from page
function clearTitleDetails(){
	var titleDetailsEl = document.getElementById("modal-movie-details");
	titleDetailsEl.style.display = "none";
}

function saveTitledetails(movie){
	window.localStorage.setItem("saved-movie", JSON.stringify(movie));
	window.location.href = "index.html";
}

function movieBtnGoClick(){
	window.location.href = "movie-options.html?genre=drama";
}