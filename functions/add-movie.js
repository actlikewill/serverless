const { query } = require('./utils/hasura');

exports.handler = async (event) => {
    const { id, tagline, poster, title} = JSON.parse(event.body);
  
    const result = await query({
        query: `
        mutation($poster: String!, $tagline: String!, $title: String!, $id: String!) {
            insert_movies_one(object: {poster: $poster, tagline: $tagline, title: $title, id: $id}) {
              id
              poster
              tagline
              title
            }
        }
        `,
        variables: {
            id, tagline, poster, title
        }
    });
    console.log({result})

    return {
        statusCode: 200,
        body: JSON.stringify(result)
    }
}