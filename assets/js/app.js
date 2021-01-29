document.addEventListener('DOMContentLoaded', function() {
    var select = document.querySelectorAll('select');
    M.FormSelect.init(select, {});
    var sideNav = document.querySelectorAll('.sidenav');
    var sideNavInstances = M.Sidenav.init(sideNav, {});

    document.querySelector('.sidenav-trigger').addEventListener('click', () => {
        sideNavInstances.open();
    });

    const submit = document.querySelector('button');
    submit.addEventListener('click', () => {
        const cuisine = document.querySelector('.cuisine .select-dropdown').value;
        const genreInput = document.querySelector('.movie .select-dropdown').value;
        const genre = getGenreId(genreInput);
        if(cuisine != "Choose Your Cuisine"){
            getTopRecipesByCuisine(cuisine);
        }
        if(genreInput != "Choose Your Movie Genre"){
            getTopMovies(genre);
        }  
    });

    function getGenreId(genre) {
        switch(genre) {
            case "Action": return "801362";
            case "Comedy": return "6548";
            case "Drama": return "5763";
            case "Horror": return "8711";
            case "Romantic": return "8883";
        }
    }

    function getTopMovies(genre) {
        var resultsUrl = "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get%3Anew2555-!1900%2C2020-!0%2C5-!7%2C10-!" + genre + "-!Any-!Any-!Any-!gt50-!%7Bdownloadable%7D&t=ns&cl=78&st=adv&ob=Relevance&p=1&sa=and";
        fetch(resultsUrl, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "0c425d1814msh0b34ce4efb75316p1d5409jsn5681f63cb68d",
                "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com"
            },
            // "Content-Type": "application/json",
        })
        .then(response => {
            return response.json();
        }).then(function(data) {
            displayMovieSearchResult(data);
        }).catch(err => {
            console.error(err);
        });
    }


        //function to fetch movie details by id
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
            return response.json()
        }).then(function(data) {
            console.log(data);
            movieModal(data);
            })
        .catch(err => {
            console.error(err);
        });

        }


    // Function to fetch for recipes by cuisine
    function getTopRecipesByCuisine(cuisine) {
        const offset = Math.floor(Math.random() * 200);
        //Fetch will return 5 random recipes based on cuisine
        fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?limitLicense=false&offset="+offset+"&addRecipeInformation=true&number=5&cuisine="+cuisine, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "3f77afb5bdmshe64d26f6b558b5ep18167cjsnf240e41e44d4",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }
        })
        .then(response => {
            return response.json();
        }).then(function(data) {
            console.log(">>> getTopRecipesByCuisine ");
            console.log(data);
            displayRecipesSearchResult(data);
        }).catch(err => {
            console.error(err);
        });
    }

    //Function to fetch recipe info by Id
    function getRecipeInfoById(recipeid)
    {
        fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/"+recipeid+"/information", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "3f77afb5bdmshe64d26f6b558b5ep18167cjsnf240e41e44d4",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }
        })
        .then(response => {
                response.json().then(function(data) {
                console.log(">>> getRecipeById " + recipeid);
                console.log(data);
                displayRecipeInformation(data);
            })
        })
        .catch(err => {
            console.error(err);
        });  
    } 

    function displayMovieSearchResult(searchResults){
        const moviesArray = [];
        const count = parseInt(searchResults.COUNT) > 100 ? 100 : parseInt(searchResults.COUNT);
        (searchResults.ITEMS).forEach(result => {
            const random = (searchResults.ITEMS)[Math.floor(Math.random() * count)];
            if(moviesArray.indexOf(random) === -1) {
                moviesArray.push(random);
            }
        });
        const movies = moviesArray.slice(0, 5);

        const resultsList = document.querySelector('.movie-results');
        resultsList.innerHTML = "";

        movies.forEach(movie => {
            const resultItem = document.createElement('DIV');
            resultItem.classList.add('movie');
            resultItem.innerHTML = `
                <div class="row">
                    <div class="card-container">
                        <div class="card">
                            <div class="card-image">
                                <img src=` + movie.image + `>
                            </div>
                            <div class="card-content">
                                <p class="movie-title">` + movie.title + `</p>
                                <p class="synopsis">` + movie.synopsis + `</p>
                            </div>
                            <button class="card-action more-details" id="more-details-` + movie.netflixid + `">View Details</button>
                            
                        </div>
                    </div>
                </div>
            `;
            resultsList.appendChild(resultItem);
            
            var moreDetails = document.getElementById("more-details-" + movie.netflixid);
            moreDetails.value = movie.netflixid;
            console.log(moreDetails);
            moreDetails.addEventListener("click", function(event){
                var targetElement = event.target;
                console.log(targetElement);
                btnMoreDetailsClick (targetElement);
            })
   
        });

       

        const save = document.querySelectorAll('.save-movie');
        save.forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.parentElement;
                const titleElem = card.querySelector('.movie-title');
                const title = titleElem.innerHTML;
                const image = card.querySelector('.card-image img');
                const synopsis = card.querySelector('.synopsis').innerHTML;
                const netflixURL = card.querySelector('.view-movie').href;
                const savedMovie = {
                    title: title,
                    image: image.currentSrc,
                    synopsis: synopsis,
                    type: 'movie',
                    url: netflixURL
                }
                localStorage.setItem('movie-' + title, JSON.stringify(savedMovie));
            });
        });
        


        
    }

    var btnMoreDetailsClick = function(targetElement) {
        var netflixId = targetElement.value;
        console.log(netflixId);
        getDetailsById(netflixId);
    }

    function movieModal(movie) {
        var movieModalEl = document.getElementById("modal-movie-details");
            movieModalEl.innerHTML ="";
            var movieImg = document.createElement("img");
            movieImg.src = movie.RESULT.nfinfo.image1;
            movieImg.style.height="200px"
            var movieSynopsis = document.createElement("p");
            movieSynopsis.innerHTML = movie.RESULT.nfinfo.synopsis;
            var movieTitle = document.createElement ("p");
            movieTitle.innerHTML = movie.RESULT.nfinfo.title;
            var movieRunTime = document.createElement ("p");
            movieRunTime.innerHTML = "Run Time: " + movie.RESULT.nfinfo.runtime;
            var movieRelease = document.createElement ("p");
            movieRelease.innerHTML = "Release Date: " + movie.RESULT.nfinfo.released;
            var movieRating = document.createElement ("p");
            movieRating.innerHTML = "Netflix Rating: " + movie.RESULT.imdbinfo.rating;

            movieModalEl.appendChild(movieTitle);
            movieModalEl.appendChild(movieImg);
            movieModalEl.appendChild(movieSynopsis);
            movieModalEl.appendChild(movieRunTime);
            movieModalEl.appendChild(movieRelease);
            movieModalEl.appendChild(movieRating);

            var button1 =document.createElement("button");
            button1.type = "button";
            button1.innerHTML = "Save this title";
            button1.addEventListener("click", function(){
            saveTitleDetails(movie);
            });

            var button2 = document.createElement("button");
            button2.type = "button";
            button2.innerHTML = "Return to options";
            button2.addEventListener("click", function(){
            clearTitleDetails();
            });

            var button3 = document.createElement("button");
            button3.type = "button";
            button3.innerHTML = "Go to Netflix Page"
            button3.addEventListener("click", function(){
            window.open('https://www.netflix.com/browse?jbv=' + movie.RESULT.nfinfo.netflixid, '_blank')
            });
    movieModalEl.appendChild(button1);
    movieModalEl.appendChild(button2);
    movieModalEl.appendChild(button3);
    movieModalEl.style.display = "block";
    };

    function saveTitleDetails(movie){
        const savedMovie = {
            title: movie.RESULT.nfinfo.title,
            image: movie.RESULT.nfinfo.image1, //.currentSrc
            synopsis: movie.RESULT.nfinfo.synopsis,
            type: 'movie',
            url: 'https://www.netflix.com/browse?jbv=' + movie.RESULT.nfinfo.netflixid
        }
        console.log(savedMovie);
        var title = movie.RESULT.nfinfo.title;
        localStorage.setItem('movie-' + title, JSON.stringify(savedMovie));
        clearTitleDetails();
    }


    function clearTitleDetails(){
        var movieModalEl = document.getElementById("modal-movie-details");
        movieModalEl.style.display = "none";
    };

//-------------------------------------------------------------------------------

    function displayRecipesSearchResult(searchResults){
            const resultsList = document.querySelector('.food-results');
            resultsList.innerHTML = "";
        (searchResults.results).forEach(result => {
            const resultItem = document.createElement('DIV');
            resultItem.classList.add('food');
            resultItem.innerHTML = `
                <div class="row">
                    <div class="card-container">
                        <div class="card">
                            <div class="card-image">
                                <img src=` + result.image + `>
                            </div>
                            <div class="card-content">
                                <p class="recipe-title">` + result.title + `</p>
                                <p class="recipe-summary">` + result.summary.substring(0,400) + ` . . .` + `</p>
                            </div>
                            
                            <div id=` + result.id + ` class="card-action view-recipe">View Recipe</div>
                        </div>
                    </div>
                </div>
            `;
            resultsList.appendChild(resultItem);
        });
        
        const view = document.querySelectorAll('.view-recipe');
        view.forEach(button => {
            button.addEventListener('click', (e) => {
                getRecipeInfoById(e.target.id);
            });
        });

        const save = document.querySelectorAll('.save-recipe');
        save.forEach(button => {
            button.addEventListener('click', (e) => {
                
                const card = e.target.parentElement;
                const titleElem = card.querySelector('.recipe-title');
                const title = titleElem.innerHTML;
                const image = card.querySelector('.card-image img');
                const recipeUrl = card.querySelector('.view-recipe').href;
                const savedFood = {
                    title: title,
                    image: image.currentSrc,
                    url: recipeUrl,
                    type: 'food'
                }
                localStorage.setItem('food-' + title, JSON.stringify(savedFood));
                
            });
        });
        
    }
});




// Function to display the recipe information
function displayRecipeInformation(recipe){
    
    console.log(">>>displayRecipeInformation Called");
    console.log(recipe);
    // Add code here to display the recipe info
    var recipeEl = document.getElementById("modal-all");
    var recipeDataEl = document.getElementById("modal-content");
    var modalHeaderEl = document.getElementById("modal-top");
    recipeDataEl.innerHTML="";
    modalHeaderEl.innerHTML="";
    var recipeImg = document.createElement("img");
    var recipeInstructions = document.createElement("p");
    var recipeTitle = document.createElement ("p");
    var recipeIngredient = document.createElement ("p");
    recipeIngredient.innerHTML = "Ingredients: ";
    for(var i=0; i<recipe.extendedIngredients.length; i++){
          recipeIngredient.innerHTML+=recipe.extendedIngredients[i].name+",";
    }
    recipeTitle.innerHTML = recipe.title;
    recipeImg.src=recipe.image;
    recipeImg.style.height="200px";
    recipeInstructions.innerHTML="Instructions: "+recipe.instructions;
    recipeDataEl.appendChild(recipeImg);
    recipeDataEl.appendChild(recipeTitle);
    recipeDataEl.appendChild(recipeIngredient);
    recipeDataEl.appendChild(recipeInstructions);

    var button1 =document.createElement("button");
    button1.type = "button";
    button1.innerHTML = "Save this recipe";
    button1.addEventListener("click", function(){
        saveRecipeInformation(recipe);
    });
    var button2 = document.createElement("button");
    button2.type = "button";
    button2.innerHTML = "Return to options";
    button2.addEventListener("click", function(){
        clearRecipeInfoModal();
    });
    modalHeaderEl.appendChild(button1);
    modalHeaderEl.appendChild(button2);

    recipeEl.style.display = "block";
    //modalHeaderEl.style.display = "block";
}


// Function to remove modal from page
function clearRecipeInfoModal(){
    var recipeDataEl = document.getElementById("modal-all");
    recipeDataEl.style.display = "none";
}

// Function to save the current selection shown in the modal window
function saveRecipeInformation(recipe){
    const savedFood = {
        title: recipe.title,
        image: recipe.image,
        url: recipe.sourceUrl,
        type: 'food'
    }
    localStorage.setItem('food-' + savedFood.title, JSON.stringify(savedFood));
    clearRecipeInfoModal();
}
