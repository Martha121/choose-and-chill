document.addEventListener('DOMContentLoaded', function() {
    var select = document.querySelectorAll('select');
    var sideNav = document.querySelectorAll('.sidenav');
    var instances = M.FormSelect.init(select, sideNav, {});

    const submit = document.querySelector('button');
    submit.addEventListener('click', () => {
        const cuisine = document.querySelector('.cuisine .select-dropdown').value;
        getTopRecipesByCuisine(cuisine);
    });

    // Function to fetch for recipes by cuisine
    function getTopRecipesByCuisine(cuisine) {
        //Fetch will return 5 random recipes based on cuisine
        fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?limitLicense=false&addRecipeInformation=true&number=5&cuisine="+cuisine, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "3f77afb5bdmshe64d26f6b558b5ep18167cjsnf240e41e44d4",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
            }
        })
        .then(response => {
            response.json().then(function(data) {
                console.log(data);
                displayRecipesSearchResult(data);
            });
        })
        .catch(err => {
            console.error(err);
        });
    }

    function displayRecipesSearchResult(searchResults){
        (searchResults.results).forEach(result => {
            console.log(result);
            const resultsList = document.querySelector('.food-results');
            const resultItem = document.createElement('DIV');
            resultItem.innerHTML = `
                <div class="row">
                    <div class="card-container">
                        <div class="card">
                            <div class="card-image">
                                <img src=` + result.image + `>
                                <span class="card-title">` + result.title + `</span>
                            </div>
                            <div class="card-content">
                                <p>` + result.summary + `</p>
                            </div>
                            <div class="card-action view-recipe">View Recipe</div>
                            <div class="card-action save">Save</div>
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
            console.log(titleElem);
            const title = titleElem.innerHTML;
            window.location.href = '../../recipe.html';
        });

        const save = document.querySelectorAll('.save');
        save.forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.target.parentElement;
                const titleElem = card.querySelector('.card-title');
                const title = titleElem.innerHTML;
                const image = card.querySelector('.card-image img');
                const savedFood = {
                    title: title,
                    image: image.currentSrc
                }
                localStorage.setItem('result-' + title, JSON.stringify(savedFood));
            });
        });
    }
});