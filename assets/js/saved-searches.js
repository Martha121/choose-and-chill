document.addEventListener('DOMContentLoaded', function() {
    const searches = [];
    const keys = Object.keys(localStorage);
    console.log(searches);
    let i = keys.length;
    console.log(i);

    while (i--) {
        searches.push(localStorage.getItem(keys[i]));
    }

    searches.forEach(search => {
        console.log(JSON.parse(search));
        const results = document.querySelector('.results');
        const resultItem = document.createElement('DIV');
        resultItem.innerHTML = `
            <div class="row">
                <div class="col s12 m7">
                <div class="card">
                    <div class="card-image">
                        <img src="`+ JSON.parse(search).image + `" />
                        <span class="card-title">` + JSON.parse(search).title + `</span>
                    </div>
                    <div class="card-action">
                        <a href="#">View Recipe</a>
                    </div>
                </div>
                </div>
            </div>
        `
        results.appendChild(resultItem);
    });
});