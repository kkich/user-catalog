import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    users: JSON.parse(localStorage.getItem('users')) || [],
    searchQuery: '',
    searchType: 'name',
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
      localStorage.setItem('users', JSON.stringify(users));
    },
    ADD_USER(state, newUser) {
      state.users.push(newUser); 
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    DELETE_USER(state, userId) {
      state.users = state.users.filter(user => user.id !== userId);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query;
    },
    SET_SEARCH_TYPE(state, type) {  
        state.searchType = type;
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const savedUsers = localStorage.getItem('users');
        
        if (savedUsers) {
          commit('SET_USERS', JSON.parse(savedUsers));
        } else {
          const response = await axios.get('https://jsonplaceholder.typicode.com/users');
          commit('SET_USERS', response.data);
        }
      } catch (error) {
        console.error('Ошибка загрузки пользователей:', error);
      }
    }
  },
  getters: {
    filteredUsers(state) {
        return state.users.filter(user => {
          return user[state.searchType]
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase());
        });
      }
  }
});

