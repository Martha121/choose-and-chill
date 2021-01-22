//Function to fetch for recipes by cuisine
function getTopRecipesByCuisine(cuisine)
{
    fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?limitLicense=false&offset=0&number=5&cuisine="+cuisine, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "3f77afb5bdmshe64d26f6b558b5ep18167cjsnf240e41e44d4",
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
        }
    })
    .then(response => {
        console.log(response);
        response.json().then(function(data) {
            console.log(data);
            displayRecipesSearchResult(data);
        });
    })
    .catch(err => {
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
        console.log(response);
        response.json().then(function(data) {
            console.log(data);
            displayRecipeInformation();
        })
    })
    .catch(err => {
        console.error(err);
    });  
} 

// Function to display the list of 
// receipes returned by the fetch
function displayRecipesSearchResult(searchResults){
    for(var i=0; i<searchResults.results.length; i++){
        console.log(searchResults.results[i]);
        // Add code here to display search results
    }
}

// Function to display the the recipe information
function displayRecipeInformation(recipe){
    console.log(recipe);
    // Add code here to display the recipe info
}

// [TEST FUNCTION CALL]
// Call to pull recipe results. This is for testing 
// and should be removed once the call form an event is set up
getTopRecipesByCuisine("mexican");
getRecipeInfoById("547899");
