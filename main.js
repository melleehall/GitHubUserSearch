'use strict';

const apiKey = "0c087c7858c54834abe4ba522e17b108";

const searchURL = 'https://api.github.com';







function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const userName = $('#js-search-term').val();
      getRepos (userName);
    });
  }
  
  $(watchForm);