
// Get any parameters from the URL, if exist
var urlParams = new URLSearchParams(window.location.search);
//console.log(window.location.search );    
var urlParamCuisine = urlParams.get("cuisine")
if(urlParamCuisine){
    //console.log(urlParamCuisine);
    // Call the recipes search with the URL parameter
    getTopRecipesByCuisine(urlParamCuisine);
}else{
    document.getElementById("system-message").innerHTML="Error: Missing URL parameter with cuisine information";
}

//Function to fetch for recipes by cuisine
function getTopRecipesByCuisine(cuisine)
{
    var offset = 20; //random number between 1 and 200
    fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?limitLicense=false&offset="+offset+"&number=5&cuisine="+cuisine, {
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
            bttnEventHandler(targetElement);
        });
        foodDataEl.appendChild(recipeImg);
        foodDataEl.appendChild(recipeTitleButton);
    }
}

// Handles the click events for all the buttons 
// added dynamically for each deach found in the search
function bttnEventHandler(targetElement){
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


function bttnGoClick(){
    window.location.href = "food-options.html?cuisine=italian";
}
