// Get all parameters from the URL, if they exist
var urlParams = new URLSearchParams(window.location.search);
var urlParamCuisine = urlParams.get("cuisine");
var urlParamRecipeId = urlParams.get("recipeid");

if(urlParamRecipeId){ // If true, this call is only to see the recipe info
    getRecipeInfoById(urlParamRecipeId);
}else if(urlParamCuisine){ // If true, this call is to show search results
    // Call the recipes search with the URL parameter
    getTopRecipesByCuisine(urlParamCuisine);
}else{
    document.getElementById("system-message").innerHTML="Error: Missing URL parameter with cuisine information";
}

// Function to fetch for recipes by cuisine
function getTopRecipesByCuisine(cuisine)
{
    //random number between 1 and 200
    var offset = Math.floor(Math.random() * 200);

    //Fetch will return 5 random recipes based on cuisine 
    fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?limitLicense=false&offset="+offset+"&number=5&cuisine="+cuisine, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "3f77afb5bdmshe64d26f6b558b5ep18167cjsnf240e41e44d4",
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
        }
    })
    .then(response => {
        response.json().then(function(data) {
            if(data.results.length == 0){
                document.getElementById("system-message").innerHTML="No results from current query";
            }else{
                //displayRecipesSearchResult(data);
            }
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
            response.json().then(function(data) {
            displayRecipeInformation(data);
        })
    })
    .catch(err => {
        console.error(err);
    });  
} 

// Function to display the list of 
// recipes returned by the fetch

function displayRecipesSearchResult(searchResults){
    for(var i=0; i<searchResults.results.length; i++){
        console.log(searchResults.results[i]);

        //This code displays  search results
        var foodDataEl = document.getElementById("food-options");
        var recipeImg = document.createElement("img");
        recipeImg.src=searchResults.results[i].image;
        var recipeTitleButton = document.createElement("button");
        recipeTitleButton.innerHTML = searchResults.results[i].title;
        recipeTitleButton.value = searchResults.results[i].id;
        recipeTitleButton.addEventListener("click", function(event){
            var targetElement = event.target;
            bttnFoodTittleClick(targetElement);
        });
        foodDataEl.appendChild(recipeImg);
        foodDataEl.appendChild(recipeTitleButton);
    }
}

// Handles the click events for all the buttons 
// added dynamically for each dish found in the search
function bttnFoodTittleClick(targetElement){
    var recipeId = targetElement.value;
    console.log("Clicked for recipe Id: "+recipeId);
    getRecipeInfoById(recipeId);
}

// Function to display the recipe information
function displayRecipeInformation(recipe){
    
    console.log("Display Recipe Information Has Been Called");
    console.log(recipe);
    // Add code here to display the recipe info
    var recipeDataEl = document.getElementById("modal-recipe");
    recipeDataEl.innerHTML="";
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

    if(urlParamRecipeId){// This means is here only to see recipe
        // Add a link back to main page
        var linkToMainPage = document.createElement("a");
        var linkText = document.createTextNode("Return to Main Page");
        linkToMainPage.appendChild(linkText);
        linkToMainPage.title = "my title text";
        linkToMainPage.href = "index.html";
        recipeDataEl.appendChild(linkToMainPage);
    }else{
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
            clearRecipeInformation();
        });
        recipeDataEl.appendChild(button1);
        recipeDataEl.appendChild(button2);
    }


    recipeDataEl.style.display = "block";
}

// Function to remove modal from page
function clearRecipeInformation(){
    var recipeDataEl = document.getElementById("modal-recipe");
    recipeDataEl.style.display = "none";
}

function saveRecipeInformation(recipe){
    window.localStorage.setItem("saved-recipe", JSON.stringify(recipe));
    window.location.href = "index.html";
}


function bttnGoClick(){
    window.location.href = "food-options.html?cuisine=italian";
}
