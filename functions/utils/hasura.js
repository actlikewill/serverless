require('dotenv').config()
const fetch = require('node-fetch');

async function query ({ query, variables={}}) {
    const result = await fetch(process.env.HASURA_GRAPHQL_DATABASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Hasura-Admin-Secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET
        },
        body: JSON.stringify({ query, variables})
    })
    .then(r => r.json())
    .catch(e => console.log(e))
    // TODO: Error Handling using result.errors

    console.log(result.errors);
    return result.data;
}

exports.query = query;