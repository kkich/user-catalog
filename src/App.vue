<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<style>
body {
  font-family: 'Poppins', sans-serif;
  background: #f5f5f5;
  color: #333;
  margin: 0;
  padding: 0;
}
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.user-list__link {
  text-decoration: none;  
  color: #2d9173;        
  font-weight: 600;      
  transition: color 0.3s;
}
.user-list__link:visited {
  color: #2d9173;
}
.user-list__link:hover {
  color: #257e62;
}
</style>
