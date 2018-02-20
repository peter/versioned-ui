<template>
  <div>
    <h1>History</h1>

    <div class="row">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Document</th>
            <th>Action</th>
            <th>User</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in changelog" v-bind:key="item.id">
            <td>
              <span v-if="item.action == 'delete'">
                {{ objectName(item) }}
              </span>
              <router-link v-else :to="editUrl(item)">
                {{ objectName(item) }}
              </router-link>
            </td>
            <td>{{ item.action }}</td>
            <td>{{ item.created_by }}</td>
            <td>{{ item.created_at | date('YYYY-MM-DD hh:mm') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Changelog from '@/services/changelog'

export default {
  data () {
    return {
      changelog: []
    }
  },
  created() {
    this.fetchChangelog()
  },
  methods: {
    fetchChangelog() {
      const params = {'per-page': 100}
      Changelog.list({params})
        .then(changelog => {
          this.changelog = changelog
        })
    },
    objectName(item) {
      return `${item.doc.type}:${item.doc.id}`
    },
    editUrl(item) {
      return `/docs/${item.doc.type}/${item.doc.id}/edit`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  td {
    text-align: left;
  }
</style>
