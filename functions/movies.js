require('dotenv').config()
const { URL } = require('url');
const fetch = require('node-fetch');
const { query } = require('./utils/hasura');
// const movies = require('../data/movies.json');


exports.handler = async () => {
    const { movies } = await query({
        query: `
        query {
            movies {
              id
              poster
              tagline
              title
            }
          }
        `
    });
    const api = new URL('https://omdbapi.com')
    api.searchParams.set('apiKey', process.env.OMDBKEY)

    const promises = movies.map(movie => {
        api.searchParams.set('i', movie.id)

        return fetch(api)
                .then(r => r.json())
                .then(data => {
                    const scores = data.Ratings;
                    return {
                        ...movie,
                            scores
                    }
                })
    });

    const moviesWithRatings = await Promise.all(promises);

    return {
        statusCode: 200,
        body: JSON.stringify(moviesWithRatings) 
    }
}