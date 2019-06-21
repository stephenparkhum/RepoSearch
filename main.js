'use strict'

// GITHUB REPO SEARCH
/*
1. Gather user name data (form input)
2. Search github for the repos for that user 
3. Display search results in the DOM
4. Every time the search runs, erase the previous data from the DOM and replace it
with the new search

*/

let url = `https://api.github.com/users/:username/repos`;


// REPO PARAMS
/*
GET /users/:username/repos

1. type (string) = all, owner, member - default: owner
2. sort (string) = created, updated, pushed, full_name - default: full_name
3. direction (string) = asc, desc - default asc (when using full_name)

*/

const getRepos = (search) => {
    fetch(`https://api.github.com/users/${search}/repos`)
        .then(response => response.json())
        .then(responseJson => {
            displayResults(responseJson);
        });

};

const displayResults = (responseJson) => {
    $('main').append(`<div class="results"</div>`);
    $('.results').append(`<p>Count: ${responseJson.length}</p>`);
    for (let i = 0; i < responseJson.length; i++) {
        // $('.results').removeClass('hidden');
        $('.results').append(
            `<div class="results-card">
                <h2>${responseJson[i].name}</h2>
                <p>${responseJson[i].description}</p>    
                <a href=${responseJson[i].html_url} target="_blank">Repo Link</a>
                <p>User: <a href="https://github.com/${responseJson[i].owner.login}" target="_blank">${responseJson[i].owner.login}</a>
            </div>`
        )
    }
};

function mainApp() {
    $(document).on('click', 'input[type=submit]', function (event) {
        event.preventDefault();
        $('.results').remove();
        let userInput = $('input[type=text]').val();
        getRepos(userInput);
    });
}

mainApp();