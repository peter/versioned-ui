import algoliaClient from 'algoliasearch'

const client = algoliaClient(process.env.VUE_APP_ALGOLIASEARCH_APPLICATION_ID, process.env.VUE_APP_ALGOLIASEARCH_API_KEY_SEARCH)
const index = client.initIndex(process.env.VUE_APP_ALGOLIASEARCH_INDEX)

// See: https://www.algolia.com/doc/api-reference/api-methods/search/
function search(query) {
  return index.search({query})
}

export default {
  search
}
