<template>
  <div class="profile">
    <div class="profile-avatar">
      <img :src="user.avatar_url" alt="Foto do usuário" />
      <p class="user-name">{{ user.name }}</p>
    </div>
    <div class="profile-details">
      <ul class="profile-details-list">
        <li>
          Repositórios:
          <span class="chip repo-chip">{{ user.public_repos }}</span>
        </li>
        <li>
          Seguidores:
          <span class="chip followers-chip">{{ user.followers }}</span>
        </li>
        <li>
          Seguindo:
          <span class="chip followeing-chip">{{ user.following }}</span>
        </li>
        <li v-if="user.location">
          Localização:
          <br />
          <br />
          <span class="chip location-chip">{{ user.location }}</span>
        </li>
      </ul>
    </div>
    <a class="btn-go-to-profile" :href="user.html_url">Ver perfil</a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
})
</script>

<style scoped>
.profile {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding-top: 0.95rem;
  display: grid;
  grid-gap: 1rem;
}
.profile-avatar {
  display: grid;
  justify-content: center;
  align-items: center;
  grid-gap: 1rem;
}
.profile-avatar img {
  width: 160px;
  border-radius: 50%;
}
.profile-avatar .user-name {
  text-align: center;
}

.profile-details-list li:not(:last-of-type) {
  padding: 0.5rem;
  border: 1px solid #e9e8e8;
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
}
.profile-details-list li:last-of-type {
  padding: 0.5rem;
  border: 1px solid #e9e8e8;
  display: block;
}
/* chip */
.chip {
  padding: 0.2rem 0.3rem;
  color: white;
  border-radius: 0.25rem;
}
.repo-chip {
  background: #198754;
}
.followers-chip {
  background: #0d6efd;
}
.followeing-chip {
  background: #0dcaf0;
}
.location-chip {
  background: #0dcaf0;
  width: 100%;
  display: block;
}

.btn-go-to-profile {
  background: #069;
  text-align: center;
  padding: 10px 0 10px 0;
  color: white;
  cursor: pointer;
}
</style>
