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
    //Aqui é um hack. Ele checa em tempo real se o input está vazio. Serve para quando apagarmos todo o valor do input. Aí quando tiver vazio, ele vai emitir um evento com o user vazio e os repositórios também. Já que se o input estiver vazio, nao estaríamos pesquisando nada.
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
      //Aqui ele checa se o texto a ser pesquisado está vazio, se tiver, emite um evento passando o usuário e repositórios como vazio, já que não tem nada para pesquisar.
      if (this.searchText === '') {
        this.user = {}
        this.repos = []
        this.$emit('dispatch', { user: {}, repos: [] })
        return
      }

      //A partir de agora, começa a ler de baixo pra cima

      //Aqui checa se tem um timer definido, se tiver, ele vai parar esse timer
      if (this.timer) {
        clearTimeout(<any>this.timer)
        this.timer = null
      }

      this.user = {}
      //Aqui estou atribuindo a propriedade "timer" um setTimeout, que ao mesmo tempo é disparado e demora 1 segundo para executar tudo que tem dentro dele. Ou seja, enquanto o usuário estiver digitando, esse método vai ser chamado, e se tiver um tempo setado, ele vai limpar esse tempo no código acima e começar outro no código abaixo, beleza?
      this.timer = <any>setTimeout(async () => {
        //Estamos chamando as requisições aqui. Elas foram definidas em métodos separados
        await this.getUserInfo()
        await this.getUserRepos()
        // Com Object.keys() você consegue saber se dentro do objeto há propriedades. Nesse caso estou chegando se foram definidas propriedades no objeto "user" do data(), se tiver propriedades, significa que colocam um usuário lá dentro. Aí então emitimos esse usuário, junto com o repositório
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
      //Aqui estamos retornando uma Promise fazendo a requisição do usuário
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
      //Aqui estamos retornando uma Promise fazendo a requisição dos repositórios
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
  .search-form {
    width: 100%;
  }
}
</style>
