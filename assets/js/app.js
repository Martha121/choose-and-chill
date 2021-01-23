
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
        console.log(">>> getRecipeById Success <<<");
        response.json().then(function(data) {
            console.log(data);
            displayRecipeInformation(data);
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
        var foodDataEl = document.getElementById("food-options");
        var recipeImg = document.createElement("img");
        recipeImg.src=searchResults.results[i].image;
        var recipeTitleButton = document.createElement("button");
        recipeTitleButton.innerHTML = searchResults.results[i].title;
        recipeTitleButton.value = searchResults.results[i].id;
        recipeTitleButton.addEventListener("click", function(event){
            var targetElement = event.target;
            bttnEvenHandler(targetElement);
        });
        foodDataEl.appendChild(recipeImg);
        foodDataEl.appendChild(recipeTitleButton);
    }
}

function bttnEvenHandler(targetElement){
    var recipeId = targetElement.value;
    console.log("Clicked for recipe Id: "+recipeId);
    getRecipeInfoById(recipeId);
}

// Function to display the recipe information
function displayRecipeInformation(recipe){
    
    console.log("Display Recipe Information Has Been Called");
    console.log(recipe);
    // Add code here to display the recipe info
    var recipeDataEl = document.getElementById("recipe-description");
    recipeDataEl.innerHTML="";
    var recipeImg = document.createElement("img");
    var recipeInstructions = document.createElement("p");
    //var recipeIngredientes = document.createElement ("p");
    recipeImg.src=recipe.image;
    recipeInstructions.innerHTML=recipe.instructions;
    recipeDataEl.appendChild(recipeImg);
    recipeDataEl.appendChild(recipeInstructions);
}

// [TEST FUNCTION CALL]
// Call to pull recipe results. This is for testing 
// and should be removed once the call form an event is set up
getTopRecipesByCuisine("italian");
//getRecipeInfoById("547899");
