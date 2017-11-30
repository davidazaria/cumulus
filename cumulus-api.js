/**
 * @author Jason Seminara!
 */
const express = require('express');

// we'll need either request or axis to make promise-based requests
const cumulusAPI = express.Router();
const axios = require('axios');
const APIKEY = process.env.APIKEY;

// hit the API and get back an array of results

axios.get(`https://newsapi.org/v2/top-headlines?language=en&apiKey=${APIKEY}`)
  /* grab the articles from the response data */
  .then(({ data: { articles } }) => {
    /* slice the articles into a manageable size  */
    const description = articles.slice(1, 10)
      /* map over and extract only the description from each article */
      .map(({ description }) => description);
    // map over the array of Urls, invoke axios.get for each,
    // wrap the whole thing in Promise.all
    // we'll get back an array of pending promises
    debugger;
    return Promise.all(description.map(description => axios.get(description)));
  })

  /* catch any errors from anything above */
  .catch(err => console.error(err));

module.exports = cumulusAPI;
