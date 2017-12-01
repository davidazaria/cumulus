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
      const tfidfMatrix = articles.slice(1, 100)
      /* map over and extract only the description from each article */
        .map(({ description, title }) => title + description);
      res.locals.tfidfMatrix = tfidfMatrix;
      next();
    })
    .catch(err => res.send(err));
  /* catch any errors from anything above */
}

function tokenizeData(req, res, next) {
  const allTokenized = res.locals.tfidfMatrix.reduce((acc, val) => {
    return acc.concat(tokenizer.tokenize(val));
  }, []);
  console.log(allTokenized);
  res.locals.allTokenized = allTokenized;
  // res.json(allTokenized);
  next();
}

function stemData(req, res, next) {
  const allStemmed = res.locals.allTokenized.reduce((acc, val) => {
    return acc.concat(natural.PorterStemmer.stem(val));
  }, []);
  console.log(allStemmed);
  res.locals.allStemmed = allStemmed;
  res.json(allStemmed);
  next();
}


//   /* TODO []: tokenize, stem, and then rejoining as a new document */

//   .reduce((t, doc) => {
//     t.addDocument(doc);
//     return t;
//   }, natural.tfidf);
// // return ()
// console.log(tokenizer.tokenize(tfidfMatrix));
// res.json(tfidfMatrix);

router.get('/', hitAxios, tokenizeData, stemData);

module.exports = router;
