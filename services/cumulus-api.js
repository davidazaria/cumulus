/**
 * @author Jason Seminara & David Azaria :)
 */
require('dotenv').config();
const express = require('express');

const cumulusRouter = express.Router();
const axios = require('axios');
const natural = require('natural');

const tokenizer = new natural.WordTokenizer();

const views = require('../controllers/viewController.js');

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
      const matrix = articles.slice(1, 901)
      /* map over and extract only the description from each article */
        .map(({ description, title }) => title + description);
      res.locals.matrix = matrix;
      next();
    })
    .catch(err => res.send(err));
  /* catch any errors from anything above */
}

function tokenizeData(req, res, next) {
  const allTokenized = res.locals.matrix.reduce((acc, val) => {
    return acc.concat(tokenizer.tokenize(val));
  }, []);
  res.locals.allTokenized = allTokenized;
  next();
  debugger;
}

function stopWords(req, res, next) {
  const sw = require('stopword');
  const oldTokenized = res.locals.allTokenized;
  const newTokenized = sw.removeStopwords(oldTokenized);
  res.locals.newTokenized = newTokenized;
  const allStemmed = res.locals.newTokenized.reduce((acc, val) => {
    return acc.concat(natural.PorterStemmer.stem(val));
  }, []);
  res.locals.allStemmed = allStemmed;
  next();
  debugger;
}

function sumWords(req, res, next) {
  const wordArray = res.locals.allStemmed;
  const newObject = {};
  for (let i = 0, j = wordArray.length; i < j; i++) {
    if (newObject[wordArray[i]]) {
      newObject[wordArray[i]]++;
    } else {
      newObject[wordArray[i]] = 1;
    }
  }
  res.locals.sumWords = newObject;
  next();
  debugger;
}

function sortWords(req, res, next) {
  function sortObject(object) {
    const sortingArray = [];
    let property;
    for (property in object) {
      if (object.hasOwnProperty(property)) {
        sortingArray.push({
          word: property,
          count: object[property],
        });
      }
    }
    sortingArray.sort((first, second) => {
      return second.count - first.count;
    });
    return sortingArray;
  }
  const list = res.locals.sumWords;
  const newarr = sortObject(list);
  const slicedArr = newarr.slice(1, 31);
  slicedArr.toString();
  res.locals.sortedWords = slicedArr;
  // res.send(slicedArr);
  next();
  debugger;
}

function stringifyWords(req, res, next) {
  const toDisplay = res.locals.sortedWords;
  const words = toDisplay.map((stringify) => {
    return stringify.word;
  });
  words.toString();
  res.locals.words = words;
  res.send(words);
  next();
  debugger;
}

cumulusRouter.get('/', hitAxios, tokenizeData, stopWords, sumWords, sortWords, stringifyWords, views.showResults);

module.exports = cumulusRouter;
