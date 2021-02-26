<template>
  <Container>
    <div class="home-template">
      <MainTitle bold="Github" italic="Search" />
      <SearchField @onKeyupEvent="getUser" v-model="searchText" />
      <UserInfo :repos="repos" :user="user" v-if="foundUser" />
      <ErrorMessage
        v-if="showErrorMessage"
        text="Não foi possível encontrar o usuário"
      />
    </div>
  </Container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      showErrorMessage: false,
      searchText: '',
      user: [],
      repos: [],
      timer: null,
      github: {
        client_id: '101887',
        client_secret: 'Iv1.747e0c9d0a904650',
        count: 7,
        sort: 'created: asc',
      },
    }
  },
  computed: {
    foundUser(): boolean {
      return this.user.length !== 0
    },
  },
  watch: {
    searchText(value) {
      if (value === '') {
        this.showErrorMessage = false
      }
    },
  },
  methods: {
    async getUser() {
      if (this.searchText.trim() === '') {
        this.user = []
        this.repos = []
        return
      }

      if (this.timer) {
        clearTimeout(<any>this.timer)
        this.timer = null
      }

      this.user = []
      this.timer = <any>setTimeout(() => {
        this.getUserInfo()
        this.getUserRepos()
      }, 1000)
    },
    getUserInfo() {
      this.$axios
        .get(
          `/${this.searchText}?client_id=${this.github.client_id}&client_secret=${this.github.client_secret}`
        )
        .then(({ data }) => (this.user = data))
        .catch(() => {
          this.showErrorMessage = !this.showErrorMessage
        })
    },
    getUserRepos() {
      this.$axios
        .get(
          `/${this.searchText}/repos?per_page=${this.github.count}&sort=${this.github.sort}&client_id=${this.github.client_id}&
      client_secret=${this.github.client_secret}`
        )
        .then(({ data }) => (this.repos = data))
    },
  },
})
</script>

<style scoped>
.home-template {
  background: white;
  padding: 2rem;
  display: grid;
  grid-gap: 2rem;
  margin: 0.625rem 0;
}
</style>
