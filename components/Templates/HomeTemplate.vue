<template>
  <Container>
    <div class="home-template">
      <MainTitle bold="Github" italic="Search" />
      <SearchForm @dispatch="updateUser($event)" />
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
      user: {},
      repos: []
    }
  },
  computed: {
    foundUser() {
      if (Object.keys(this.user).length > 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    updateUser(data: any) {
      if (!data.error) {
        this.showErrorMessage = false
        this.user = data.user
        this.repos = data.repos
        console.log(data)
      } else {
        this.showErrorMessage = true
        this.user = []
        this.repos = []
      }
    }
  }
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
