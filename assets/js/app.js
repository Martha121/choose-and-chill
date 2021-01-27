document.addEventListener('DOMContentLoaded', function() {
    var select = document.querySelectorAll('select');
    var formInstances = M.FormSelect.init(select, {});
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
        getTopRecipesByCuisine(cuisine);
        getTopMovies(genre);
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
            displayRecipesSearchResult(data);
        }).catch(err => {
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
                            <a class="card-action view-movie" href="` + "https://www.netflix.com/browse?jbv=" + movie.netflixid + `" target="_blank">View Netflix Page</a>
                            
                            <div class="card-action save-movie">Save</div>
                        </div>
                    </div>
                </div>
            `;
            resultsList.appendChild(resultItem);
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
                            </div>
                            
                            <a class="card-action view-recipe" href="` + result.sourceUrl + `" target="_blank">View Recipe</a>
                            
                            <div class="card-action save-recipe">Save</div>
                        </div>
                    </div>
                </div>
            `;
            resultsList.appendChild(resultItem);
        });

        const view = document.querySelector('.view-recipe');
        view.addEventListener('click', (e) => {
            const target = e.target;
            const card = (target.parentElement);
            const titleElem = card.querySelector('.card-title');
            const title = titleElem.innerHTML;
            window.location.href = '../../recipe.html';
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