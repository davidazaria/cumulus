# cumulus - David Azaria / December 2017

## What is cumulus?

Our world is a rather interconnected place these days - probably more so than we sometimes acknowledge or like to. And certainly more than it ever has been. But throughought this figurative web of a modern, largely shared, singular global culture, there are moments and scenarios that speak to some of our own idiosyncracies and relative isolation. For example, whether it be as micro as an personal experience you yourself have that not many people can relate to, or as macro as a disagreement leading to a revelation of some culutral faux pas, those moments and scenarios remind us that we are not just one species on one planet, but also an independent world of seven billion people, living in 195 countries, across twenty-four timezones, and on seven different continents. 

And in examining this binning of a world made up of different experiences, the news - and more specifically what even makes the news to begin with - is something that best accentuates the notion that we do continue to remain isolated in what we deem important to consume. Of course there are moments of tragic or, more hopefully, joyous world events which bring the world together; however, it is often the case what makes for news in Germany might not be the case in India; South Korea and not South Africa; and, an extreme example perhaps, is something reported as a big deal in North Carolina, while emitting the faintest of blips in neighboring South Carolina.  

The aim of this application, in its current form, is to present a user a word cloud - referencing the name, cumulus - of news headlines around the world, and the importance of certain words in which they appear in those English-only (for now) headlines. With a sprinkle of data science, a few third party API calls, and a healthy dose of JavaScript and its far-extending remit of libraries, I hope to provide a user an interesting, and, more importantly, an easy-to-digest example of what we deem important globally, and how they themselves relate to the weighted display of those words. Do you agree with the importance of those words? If no, why not? Those are the kinds of questions I look to answer. 

## My wireframe

Wireframe can be found in the project repo, file labeled "cumulus-wireframe.pdf".

## My initial thoughts on app structure

Currently the way I think about this is a user will provide some details to log-in to the app, allowing them to store their searches in our cumulus search database. It might not (yet) be appropriately stored in the cloud - maybe one day it will be - but for now I do want to offer the user the ability to store what they learned is important, and where and when.  

By running a TFIDF (https://en.wikipedia.org/wiki/Tf%E2%80%93idf) on all English-language news headlines supported by News API (https://newsapi.org/), specifically in our current form the titles and descriptions of those articles, which number around a thousand, the word cloud will display to the user the weighted importance of those words given the title/description link it was found in. 

On the back-end, I am envisaging the user session being logged. More work TK there.  

## How it works

TKTK

## Phases to completion

Phase 1: Wireframming and story writing. **Due Wednesday November 29**

Phase 2: Minimum viable product, which will consist of: basic API calls, Heroku Deployment, Routes, SQL table creations, and progress on the word cloud technolocy **Due Friday December 1**

Phase 3: Feature writing. **Due Saturday December 2**

Phase 4: Feature writing. **Due Sunday December 3** 

Phase 5: Feature writing and issues/bugs. **Due Monday December 4**

**Presentation** **Tuesday December 5**

## Links and Resources

TKTK
