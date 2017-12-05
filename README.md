# cumulus - David Azaria / December 2017

## What is cumulus?

Our world is a rather interconnected place these days - probably more so than we sometimes acknowledge or like to. And certainly more than it ever has been. But throughought this figurative web of a modern, largely shared, singular global culture, there are moments and scenarios that speak to some of our own idiosyncracies and relative isolation. For example, whether it be as micro as an personal experience you yourself have that not many people can relate to, or as macro as a disagreement leading to a revelation of some culutral faux pas, those moments and scenarios remind us that we are not just one species on one planet, but also an independent world of seven billion people, living in 195 countries, across twenty-four timezones, and on seven different continents. 

And in examining this binning of a world made up of different experiences, the news - and more specifically what even makes the news to begin with - is something that best accentuates the notion that we do continue to remain isolated in what we deem important to consume. Of course there are moments of tragic or, more hopefully, joyous world events which bring the world together; however, it is often the case what makes for news in Germany might not be the case in India; South Korea and not South Africa; and, an extreme example perhaps, is something reported as a big deal in North Carolina, while emitting the faintest of blips in neighboring South Carolina.  

The aim of this application, in its current form, is to present a user a word cloud - referencing the name, cumulus - of news headlines around the world, and the importance of certain words in which they appear in those English-only (for now) headlines. With a sprinkle of data science, one third-party API call, and a healthy dose of JavaScript and its far-extending remit of libraries, I hope to provide a user an interesting, and, more importantly, an easy-to-digest example of what we deem important globally, and how they themselves relate to the weighted display of those words. Do you agree with the importance of those words? If no, why not? Those are the kinds of questions I look to answer. 

## My wireframe

Wireframe can be found in the project repo, file labeled "cumulus-wireframe.pdf".

## My initial thoughts on app structure

Currently the way I think about this is a user will provide some details to log-in to the app, allowing them to store their searches in our cumulus search database. It might not (yet) be appropriately stored in the cloud - maybe one day it will be - but for now I do want to offer the user the ability to store what they learned is important, and where and when.  

By running a TFIDF (https://en.wikipedia.org/wiki/Tf%E2%80%93idf) on all English-language news headlines supported by News API (https://newsapi.org/), specifically in our current form the titles and descriptions of those articles, which number around a thousand, the word cloud will display to the user the weighted importance of those words given the title/description link it was found in. 

On the back-end, I am envisaging the user session being logged. More work TK there.  

## How it works

In terms how this works, in the project's current iteration I unfortunately needed to scrap the use of the data-science heavy TFIDF due to time and skill constraints given the priorities I had set for my project timeline. In its place I was able to successfully use my JavaScript skills to sum words and display them in count order to mimic what a TFIDF would more appropriately and more sophisticatedly accomplish. 

Wordcloud packages were not particularly helpful in this instance. In a future iteration, I am planning on having a standing Python server where I can use some of their data viz packages to render a word cloud on my locally stored data. From there, write an API call to my JS server to render it on my browser.

Currently, I am not storing the counts in the database; however, I believe once I get the TFIDF running, then storing the counts of words is superfluous. 

A Postgres feature I did not fully invest much time into from a storage perspective is storing the top words from each result, utilizing the following SQL query which will help me split my comma-separated string (hence the ',' delimiter) and returning back the first items before the comma is found.

To show first word before a comma is found:
`SELECT split_part(result, ',', 1) FROM searches`

## Technologies used

* 3rd party API call
* Axios (npm package for API calls)
* Body-Parser
* Cheerio (npm package for parsing HTML - ended up deprecating)
* Command Line
* Debug 
* Dotenv
* EJS 
* ESLint 
* Express
* Github
* Heroku
* HTML/CSS
* JavaScript
* Method-Override
* Morgan Logger
* MVC architecture
* Natural (npm package for data manipulation, including tokenizations and stemming)
* Node.JS
* Nodemon
* Path
* pg-promise
* Postgres/SQL
* Postman
* stopword (npm package for adding stopwords)
* Vue Wordcloud (npm package for word cloud - ended up deprecating)
* Wordcloud (npm package for word cloud - ended up deprecating)


## Phases to completion

Phase 1: Wireframming and story writing. **Due Wednesday November 29** **COMPLETED**

Phase 2: Minimum viable product, which will consist of: basic API calls, Heroku Deployment, Routes, SQL table creations, and progress on the word cloud technolocy **Due Friday December 1** **COMPLETED**

Phase 3: Feature writing. **Due Saturday December 2** **COMPLETED**

Phase 4: Feature writing. **Due Sunday December 3** **COMPLETED**

Phase 5: Feature writing and issues/bugs. **Due Monday December 4** **COMPLETED**

**Presentation** **Tuesday December 5**

## Links and Resources

Heroku app can be found here https://wdicumulus.herokuapp.com/

Local host PORT would be here http://localhost:3000/

Used this API for my news sources https://newsapi.org/

Used the axios npm package for my API calls https://www.npmjs.com/package/axios

Used the natural npm package to help with some of my data cleansing/sanitization, including tokenization https://www.npmjs.com/package/natural 

Used the stopword npm package to help with implementing stopwords https://www.npmjs.com/package/stopword  

Used the MDN documentation to help better implement the `reduce` function https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/reduce

Used the MDN documentation to help with a `for...in` function in my cumulus-api.js file. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in

Used the MDN documentation to help with a `.join()` method on stringifying words.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

Referenced the `quotes-api` repo for some of the MVC infrastructure https://git.generalassemb.ly/wdi-nyc-hamilton/quotes-api

Further attribution to Jason Seminara, Kate Shishkina, J Silverstein, John Master, and my classmates for their help debugging/inspiring the app.
