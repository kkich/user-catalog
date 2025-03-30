import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    users: JSON.parse(localStorage.getItem('users')) || [],
    searchQuery: '',
    searchType: 'name',
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
      localStorage.setItem('users', JSON.stringify(users));
    },
    addUser(state, newUser) {
      state.users.push(newUser); 
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    deleteUser(state, userId) {
      state.users = state.users.filter(user => user.id !== userId);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
    setSearchType(state, type) {  
        state.searchType = type;
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const savedUsers = localStorage.getItem('users');
        
        if (savedUsers) {
          commit('setUsers', JSON.parse(savedUsers));
        } else {
          const response = await axios.get('https://jsonplaceholder.typicode.com/users');
          commit('setUsers', response.data);
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

