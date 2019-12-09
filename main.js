'use strict';

const apiKey = "0c087c7858c54834abe4ba522e17b108";

//base URL
const searchURL = 'https://api.github.com';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}


function displayResults(responseJson) {
    // if there are previous results, remove them
    console.log(responseJson);
}

function getRepos(query) {
    console.log(`getRepos function is running with ${query} as an argument`)
    const params = {
      q: query,
      language: "en",
    };

    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;
  
    console.log(url);
  
    // const options = {
    //   headers: new Headers({
    //     "X-Api-Key": apiKey})
    // };
  
    fetch(url)
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
      console.log(`watchForm ran and passed ${userName} as an argument to getRepos`)
    });
  }
  
  $(watchForm);