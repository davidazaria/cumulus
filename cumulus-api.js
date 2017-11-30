/**
 * @author Jason Seminara!
 */
const express = require('express');

// we'll need either request or axis to make promise-based requests
const cumulusAPI = express.Router();
const axios = require('axios');

// hit the API and get back an array of results

axios.get('https://newsapi.org/v2/top-headlines', {
  params: {
    language: 'en',
    apiKey: 'dff425d1b8754d858c7751c7331e3e0f',
  },
})
  /* grab the articles from the response data */
  .then(({ data: { articles } }) => {
    /* slice the articles into a manageable size  */
    const descriptions = articles.slice(1, 100)
      /* map over and extract only the description from each article */
      .map(({ descriptions }) => descriptions);
    // map over the array of Urls, invoke axios.get for each,
    // wrap the whole thing in Promise.all
    // we'll get back an array of pending promises
    debugger;
    return Promise.all(descriptions.map(descriptions => axios.get(descriptions)));
  })

  /* catch any errors from anything above */
  .catch(err => console.error(err))

module.exports = cumulusAPI
