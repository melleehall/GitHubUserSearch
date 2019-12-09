'use strict';

// Personal Access Token
const authToken = "341eb0459026c2b8df073ee7a2726b2d489022a8";

// Base URL
const searchURL = 'https://api.github.com';

function displayResults(responseJson) {
    // if there are previous results displayed and/or an error message, remove them
    $('#results-list').empty();
    $('#js-error-message').empty();
    // Add a list item for each Repo and associated url
    for (let i = 0; i < responseJson.length; i++) {
        $('#results-list').append(
          `<li><h3> ${responseJson[i].full_name} </h3>
          <p>
            <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
          </p>        
          </li>`
        )};
      //display the results section  
      $('#results').removeClass('hidden');
}

function getRepos(query) {
    const url = `${searchURL}/users/${query}/repos`;
  
    const options = {
        headers: new Headers({
            "Accept": "application/vnd.github.v3+json",
            "Authorization": authToken,
        })
    };
  
    fetch(url, options)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }

// listen for submit events, then store value (user name) entered and pass it as an argument to the function that will retrieve the repos
function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const userName = $('#js-search-term').val();
      getRepos(userName);
    });
  }
  
  // when the browser loads, call the watchForm function to listen for user events
  $(watchForm);