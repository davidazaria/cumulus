/**
 * @author Jason Seminara!
 */
const express = require('express');

// we'll need either request or axis to make promise-based requests
const cumulusAPI = express.Router();
const axios = require('axios');

require('dotenv').config();

const apikey = process.env.APIKEY;
// hit the API and get back an array of results

axios.get(`https://newsapi.org/v2/top-headlines?language=en&apiKey=${apikey}`)
  /* grab the articles from the response data */
  .then(({ data: { articles } }) => {
    /* slice the articles into a manageable size  */
    const description = articles.slice(1,2)
      /* map over and extract only the description from each article */
      .map(({ description }) => description);
    debugger;
    return Promise.all(description.map(description => axios.get(description)));
  });

  /* catch any errors from anything above */
// .catch(err => console.error(err));

module.exports = cumulusAPI;
