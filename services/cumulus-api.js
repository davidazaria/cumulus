/**
 * @author Jason Seminara!
 */
require('dotenv').config();
const express = require('express');

// we'll need either request or axis to make promise-based requests
const router = express.Router();
const axios = require('axios');
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

const apikey = process.env.APIKEY;
// hit the API and get back an array of results

function hitAxios(req, res, next) {
  axios.get('https://newsapi.org/v2/top-headlines', {
    params: {
      language: 'en',
      apikey,
    },
  })
  /* grab the articles from the response data */
    .then(({ data: { articles } }) => {
    /* slice the articles into a manageable size  */
      const tfidfMatrix = articles.slice(1, 3)
      /* map over and extract only the description from each article */
        .map(({ description, title }) => title + description);
      //   /* TODO []: tokenize, stem, and then rejoining as a new document */

      //   .reduce((t, doc) => {
      //     t.addDocument(doc);
      //     return t;
      //   }, natural.tfidf);
      // // return ()
      res.json(tfidfMatrix);
      console.log(tfidfMatrix);
    })
    .catch(err => res.send(err));
  /* catch any errors from anything above */
}
router.get('/', hitAxios);

module.exports = router;
