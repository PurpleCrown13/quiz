<script>
import 'vue-material-design-icons/styles.css'
import IconHome from 'vue-material-design-icons/Home.vue'
import PlusBox from 'vue-material-design-icons/PlusOutline.vue'
import Main from './components/Main.vue'
export default {
  data() {
    return {
      items: [
        { title: 'Tests', icon: IconHome },
        { title: 'Add', icon: PlusBox }
      ]
    }
  },
  components: {
    IconHome,
    PlusBox,
    Main
  }
}
</script>
<template>
  <div class="page" v-auto-animate>
    <div class="sidebar-container" v-auto-animate>
      <VaSidebar hoverable minimized-width="80px" class="sidebar" color="warning" gradient>
        <router-link to="/">
          <VaSidebarItem active-color="#1D1C21" :active="$route.path === '/'">
            <VaSidebarItemContent class="text-center">
              <IconHome class="iconka" />
              <VaSidebarItemTitle class="title"> Tests </VaSidebarItemTitle>
            </VaSidebarItemContent>
          </VaSidebarItem>
        </router-link>
        <router-link to="/add">
          <VaSidebarItem active-color="#1D1C21" :active="$route.path === '/add'">
            <VaSidebarItemContent class="text-center">
              <PlusBox class="iconka" />
              <VaSidebarItemTitle class="title"> Add </VaSidebarItemTitle>
            </VaSidebarItemContent>
          </VaSidebarItem>
        </router-link>
      </VaSidebar>
    </div>
    <div class="header-container">
      <router-link to="/" class="router-link"> Tests </router-link>
      <router-link to="/add" class="router-link"> Add </router-link>
    </div>
    <div class="container" v-auto-animate>
      <router-view></router-view>
    </div>
  </div>
</template>
<style>
body {
  background-color: #3a454b !important;
}
@import 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap';
@import 'https://fonts.googleapis.com/icon?family=Material+Icons';

.page {
  display: flex;
  flex-direction: row;
  width: 95%;
  margin: 0 auto;
}

.sidebar-container {
  height: fit-content;
  /* width: 0px ; */
}
.sidebar {
  margin: 50px 0px;
  font-size: 22px;
}
.text-center {
  display: flex;
  justify-content: center;
  align-content: center;
}
.container {
  margin: 50px auto;
  height: 100px;
  display: flex;
  justify-content: left;
  align-items: center;
  width: 80%;
  flex-direction: row;
  flex-wrap: wrap;
  color: #fff;
  height: fit-content;
}
.header-container {
  display: none;
}
@media (max-width: 1000px) {
  .sidebar-container {
    display: none;
  }
  .page {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .header-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    color: #000;
    padding: 10px;
    background-color: #ffd43a;
  }
  .router-link {
    color: #000;
    text-decoration: none;
  }
  .router-link:hover {
    color: #666;
  }
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
