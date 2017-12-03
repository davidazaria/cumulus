/**
 * @author Jason Seminara & David Azaria :)
 */
require('dotenv').config();
const express = require('express');

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
      const tfidfMatrix = articles.slice(1, 500)
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
  const sw = require('stopword');
  const oldTokenized = res.locals.allTokenized;
  const newTokenized = sw.removeStopwords(oldTokenized);
  res.locals.newTokenized = newTokenized;
  const allStemmed = res.locals.newTokenized.reduce((acc, val) => {
    return acc.concat(natural.PorterStemmer.stem(val));
  }, []);
  res.locals.allStemmed = allStemmed;
  // res.json(allStemmed);
  next();
  debugger;
}

function sumWords(req, res, next) {
  const wordArr = res.locals.allStemmed;
  const newObj = {};
  for (let i = 0, j = wordArr.length; i < j; i++) {
    if (newObj[wordArr[i]]) {
      newObj[wordArr[i]]++;
    } else {
      newObj[wordArr[i]] = 1;
    }
  }
  res.json(newObj);
  next();
  debugger;
}

router.get('/', hitAxios, tokenizeData, stemData, sumWords);

module.exports = router;
