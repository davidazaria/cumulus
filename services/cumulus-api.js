/**
 * @author Jason Seminara & David Azaria :)
 */
require('dotenv').config();
const express = require('express');

const router = express.Router();
const axios = require('axios');
const natural = require('natural');

const tokenizer = new natural.WordTokenizer();

const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();

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
      const tfidfMatrix = articles.slice(1, 5)
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
  res.locals.allTokenized = allTokenized;
  next();
  debugger;
}

function stemData(req, res, next) {
  const allStemmed = res.locals.allTokenized.reduce((acc, val) => {
    return acc.concat(natural.PorterStemmer.stem(val));
  }, []);
  res.locals.allStemmed = allStemmed;
  // res.json(allStemmed);
  next();
  debugger;
}

function tfidfData(req, res, next) {
  const allTFIDF = res.locals.allStemmed.reduce((acc, val) => {
    return acc.concat(tfidf.addDocument(val));
  }, []);
  res.locals.allTFIDF = allTFIDF;
  console.log(tfidf.tfidf(allTFIDF, 1));
  res.json(res.locals.allTFIDF);
  next();
}

//   .reduce((t, doc) => {
//     t.addDocument(doc);
//     return t;
//   }, natural.tfidf);
// }

router.get('/', hitAxios, tokenizeData, stemData, tfidfData);

module.exports = router;
