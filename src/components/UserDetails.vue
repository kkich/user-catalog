<template>
  <div class="user-details">
    <router-link to="/users" class="user-details__back">
    <svg
        class="back-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#2d9173"
        stroke="none"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>Назад</router-link>
    <h2 class="user-details__name">{{ user.name }}</h2>
    <p class="user-details__info">Email: {{ user.email }}</p>
    <p class="user-details__info">Телефон: {{ user.phone }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: ['id'],
  computed: {
    user() {
      return this.$store.state.users.find(user => user.id == this.id) || {};
    },
  },
};
</script>

<style>
.user-details {
  max-width: 400px;
  margin: 40px auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.user-details__back {
  display: inline-block;
  margin-bottom: 15px;
  text-decoration: none;
  color: #2d9173;
  font-weight: bold;
}
.user-details__name {
  font-size: 24px;
  color: #2d9173;
}
.user-details__info {
  font-size: 18px;
  color: #555;
}
</style>
