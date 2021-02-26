<template>
  <div class="search-field">
    <input
      class="search-input"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @keyup="$emit('onKeyupEvent')"
      placeholder="Digite o nome do usuário"
    />
    <button class="btn-search">
      <img src="~assets/img/search-icon.png" alt="ícone de pesquisa" />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
  },
})
</script>

<style scoped>
.search-input {
  border: 1px solid black;
  padding: 1rem;
}
.search-field {
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
