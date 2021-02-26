<template>
  <form @submit.prevent="getUser" class="search-form">
    <input
      class="search-input"
      v-model.trim="searchText"
      @keyup="getUser"
      placeholder="Digite o nome do usuário"
    />
    <button class="btn-search">
      <img src="@/assets/img/search-icon.png" alt="ícone de pesquisa" />
    </button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'

import { Repo, User } from '@/types'

export default Vue.extend({
  data() {
    return {
      searchText: '',
      user: {} as User,
      repos: [] as Repo[],
      timer: null,
      github: {
        client_id: '101887',
        client_secret: 'Iv1.747e0c9d0a904650',
        count: 7,
        sort: 'created: asc'
      }
    }
  },
  watch: {
    searchText(value) {
      if (value === '') {
        this.$emit('dispatch', {
          error: false,
          user: {},
          repos: []
        })
      }
    }
  },
  methods: {
    getUser() {
      if (this.searchText === '') {
        this.user = {}
        this.repos = []
        this.$emit('dispatch', { user: {}, repos: [] })
        return
      }

      if (this.timer) {
        clearTimeout(<any>this.timer)
        this.timer = null
      }

      this.user = {}
      this.timer = <any>setTimeout(async () => {
        await this.getUserInfo()
        await this.getUserRepos()

        if (Object.keys(this.user).length > 0) {
          this.$emit('dispatch', {
            user: this.user,
            repos: this.repos,
            error: false
          })
        }
      }, 1000)
    },
    getUserInfo(): Promise<void> {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(
            `/${this.searchText}?client_id=${this.github.client_id}&client_secret=${this.github.client_secret}`
          )
          .then(({ data }) => {
            this.user = data as User
            resolve()
          })
          .catch((err) => {
            console.error(err)
            reject(err)
            this.$emit('dispatch', {
              error: true
            })
          })
      })
    },
    getUserRepos(): Promise<void> {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(
            `/${this.searchText}/repos?per_page=${this.github.count}&sort=${this.github.sort}&client_id=${this.github.client_id}&
      client_secret=${this.github.client_secret}`
          )
          .then(({ data }) => {
            this.repos = data.sort(
              (a: Repo, b: Repo) => b.stargazers_count - a.stargazers_count
            )
            resolve()
          })
      })
    }
  }
})
</script>

<style scoped>
.search-input {
  border: 1px solid black;
  padding: 1rem;
}

.search-form {
  width: 70%;
  margin: 0 auto;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 4.938rem;
  grid-template-rows: 2.563rem;
}

.btn-search {
  display: grid;
  justify-content: center;
  align-items: center;
  background: #000;
}

.btn-search img {
  width: 1.75rem;
}

@media (max-width: 714px) {
  .search-field {
    width: 100%;
  }
}
</style>
