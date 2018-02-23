<template>
  <div>
    <h1>Search</h1>

    <div class="search-query">
      <input type="text" ref="query" v-model="query"/>
    </div>

    <div class="row" v-if="results.length > 0">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doc in results" v-bind:key="doc">
            <td>
              {{doc.objectID}}
            </td>
            <td>
              {{doc.title}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Search from '@/services/search'

export default {
  data () {
    return {
      query: '',
      results: []
    }
  },
  mounted() {
    this.$refs.query.focus();
    console.log('watching query', this.query)
    this.$watch('query', () => {
      console.log('pm debug computing results with query', this.query)
      Search.search(this.query).then((data) => {
       console.log('pm debug search results', data)
        this.results = data.hits
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
