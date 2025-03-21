<template>
  <div class="user-list">
    <h1 class="user-list__title">Каталог пользователей</h1>
    <button @click="openModal" class="user-list__add-user">+ Добавить пользователя</button>
    <div class="user-list__filter">
     <label for="searchType">Искать по:</label>
     <select v-model="searchType" @change="updateSearchType" id="searchType" class="user-list__select">
     <option value="name">Имени</option>
      <option value="email">Email</option>
      <option value="phone">Телефону</option>
     </select>
    </div>
    <input
      type="text"
      v-model="searchQuery"
      @input="updateSearch"
      placeholder="Поиск..."
      class="user-list__search"
    />
    <ul class="user-list__items">
      <li v-for="user in users" :key="user.id" class="user-list__item">
        <router-link :to="'/users/' + user.id" class="user-list__link">
          {{ user.name }}
        </router-link>
        <button @click="deleteUser(user.id)" class="user-list__delete">×</button>
      </li>
    </ul>
    <div v-if="isModalOpen" class="modal">
      <div class="modal__content">
        <h2 class="modal__title">Добавить пользователя</h2>
        <input type="text" v-model="newUserName" placeholder="Имя" class="modal__input" />
        <input type="email" v-model="newUserEmail" placeholder="Email" class="modal__input" />
        <input type="text" v-model="newUserPhone" placeholder="Телефон" class="modal__input" />
        <div class="modal__buttons">
          <button @click="addUser" class="modal__save">Сохранить</button>
          <button @click="closeModal" class="modal__cancel">Отмена</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
  data() {
    return {
      searchType: 'name',
      isModalOpen: false,  
      newUserName: '',
      newUserEmail: '',
      newUserPhone: ''
    };
  },
  computed: {
    ...mapState(['searchQuery', 'searchType']),
    ...mapGetters(['filteredUsers']), 
    users() {
      return this.filteredUsers;
  }
  },
  methods: {
    updateSearchType(event) {
      this.$store.commit('SET_SEARCH_TYPE', event.target.value);
    },
    deleteUser(id) {
      this.$store.commit('DELETE_USER', id);
    },
    updateSearch(event) {
      this.$store.commit('SET_SEARCH_QUERY', event.target.value);
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.newUserName = '';
      this.newUserEmail = '';
      this.newUserPhone = '';
    },
    addUser() {
      if (!this.newUserName.trim() || !this.newUserEmail.trim() || !this.newUserPhone.trim()) {
        alert("Заполните все поля!");
        return;
      }
      const newUser = {
        id: Date.now(),
        name: this.newUserName,
        email: this.newUserEmail,
        phone: this.newUserPhone,
      };

      this.$store.commit('ADD_USER', newUser);
      this.closeModal();
    },
  },
  mounted() {
    this.$store.dispatch('fetchUsers');
  },
};
</script>
<style>
.user-list {
  max-width: 500px;
  margin: 40px auto;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
.user-list__title {
  text-align: center;
  color: #2d9173;
}
.user-list__filter {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.user-list__select {
  padding: 8px;
  border: 2px solid #2d9173;
  border-radius: 5px;
  background: white;
  cursor: pointer;
}
.user-list__search {
  width: 100%;
  padding: 10px;
  border: 2px solid #2d9173;
  border-radius: 5px;
  margin-bottom: 10px;
  outline: none;
  box-sizing: border-box;
}
.user-list__add-user {
  width: 100%;
  background: #2d9173;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 10px;
}
.user-list__add-user:hover {
  background: #257e62;
}
.user-list__item {
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}
.user-list__item {
  font-family: 'Poppins', sans-serif; 
  font-size: 18px;
  font-weight: 600; 
  color: #333;
  display: flex;
  justify-content: space-between; 
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.user-list__delete {
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s;
}
.user-list__delete:hover {
  background: darkred;
}
/* --- модальное--- */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 90%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  padding: 20px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  word-wrap: break-word;
}
.modal__content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 350px;
  text-align: center;
}
.modal__title {
  margin-bottom: 15px;
  color: #2d9173;
}
.modal__input {
  width: 100%;
  padding: 10px;
  border: 2px solid #2d9173;
  border-radius: 5px;
  margin-bottom: 10px;
  outline: none;
  box-sizing: border-box;
}
.modal__buttons {
  display: flex;
  justify-content: space-between;
}
.modal__save, .modal__cancel {
  padding: 10px;
  width: 48%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}
.modal__save {
  background: #2d9173;
  color: white;
}
.modal__cancel {
  background: #ccc;
  color: black;
}
.modal__save:hover {
  background: #257e62;
}
.modal__cancel:hover {
  background: #aaa;
}
</style>
