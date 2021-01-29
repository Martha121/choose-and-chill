document.addEventListener('DOMContentLoaded', function() {
    var select = document.querySelectorAll('select');
    var formInstances = M.FormSelect.init(select, {});
    var sideNav = document.querySelectorAll('.sidenav');
    var sideNavInstances = M.Sidenav.init(sideNav, {});

    document.querySelector('.sidenav-trigger').addEventListener('click', () => {
        sideNavInstances.open();
    });

    const searches = [];
    const keys = Object.keys(localStorage);
    let i = keys.length;

    while (i--) {
        searches.push(localStorage.getItem(keys[i]));
    }

    searches.forEach(search => {
        const result = JSON.parse(search);
        if (result.type === 'movie') {
            const movies = document.querySelector('.saved-movies');
            const resultItem = document.createElement('DIV');
            resultItem.classList.add('movie');
            resultItem.innerHTML = `
                <div class="row">
                    <div id="`+ result.netflixId + `">
                        <div class="card" id="`+ result.title + `"">
                            <div class="card-image">
                                <img src="`+ result.image + `" />
                            </div>
                            <div class="card-content">
                                <p class="recipe-title">` + result.title + `</p>
                                <p>` + result.synopsis + `</p>
                            </div>
                            <button class="remove card-action" id="remove-` + result.netflixid + `">Remove From Saved Searches</button>
                            <a class="view-movie card-action" href="` + result.url + `" target="_blank">View Netflix Page</a>
                        </div>
                    </div>
                </div>
            `;
            
            movies.appendChild(resultItem);
            var remove = document.getElementById("remove-" + result.netflixid);
            remove.value = result.netflixid;
            removeValue = remove.value;
            netflixID= result.netflixid;
            title = result.title;
            remove.addEventListener("click", function(event) {
                var targetElement = event.target;
                //console.log(targetElement);
                btnRemoveMovie(targetElement, removeValue, title);
            })
            

        } else if (result.type === 'food') {
            const food = document.querySelector('.saved-food');
            const resultItem = document.createElement('DIV');
            resultItem.classList.add('food');
            resultItem.innerHTML = `
                <div class="row">
                    <div>
                        <div class="card">
                            <div class="card-image">
                                <img src="`+ result.image + `" />
                            </div>
                            <p class="recipe-title">` + result.title + `</p>
                            <div class="card-action">
                                <a class="view-recipe" href="` + result.url + `" target="_blank">View Recipe</a>
                            </div>
                        </div>
                    </div>
                </div>
            `
            food.appendChild(resultItem);
        }
        var btnRemoveMovie = function(targetElement, removeValue, title) {
            var netflixId= targetElement.value;
            console.log(netflixId);
            if (netflixId) {  
               var card = targetElement.closest('.card');
               card.innerHTML= "";
               localStorage.removeItem('movie-' + card.id);
            }
        };
    });
});