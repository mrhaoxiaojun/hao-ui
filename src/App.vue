<template>
  <div id="app">
    <Header v-if="!isShowHome"></Header>
    <div class="app-main" v-if="!isShowHome">
      <div class="app-main-left">
        <Menu></Menu>
      </div>
      <div class="app-main-right">
        <router-view/>
      </div>
    </div>
    <div v-if="isShowHome">
       <router-view/>
    </div>
  </div>
</template>

<script>
  import Menu from './components/menu.vue';
  import Header from './components/header.vue';
import { constants } from 'crypto';
export default {
  name: 'App',
  data(){
    return{
      isShowHome:false
    }
  },
  components:{
    Menu,Header
  },
  watch: {
    '$route' (to, from) {
      this.isShowHome = window.location.hash === '#/' ? true : false
    }
  },
  created(){
   console.log(122)
   this.isShowHome = window.location.hash === '#/' ? true : false
  }
}
</script>

<style lang="stylus">
#app
  .app-main
    display: flex;
    min-width: 1101px;
    margin: 0 auto 50px auto;
    width: 85%;
    .app-main-left
      min-width 230px
      position relative
    .app-main-right
      position relative
      padding-top 15px
      flex 1
</style>
