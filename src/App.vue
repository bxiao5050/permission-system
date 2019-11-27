<template>
  <div id="app">
    <router-view></router-view>
    <Prompt></Prompt>
    <LoadingBar></LoadingBar>
    <Loading></Loading>
  </div>
</template>

<script>
import './assets/scss/index.scss'
import Prompt from './components/prompt/prompt.vue'
import LoadingBar from './components/loadingbar/loadingbar.vue'
import Loading from './components/loading/loading.vue'
export default {
  name: 'app',
  components: {
    Prompt,LoadingBar,Loading
  }
}
</script>

<style>
html {
  position: relative;
}

html,
body,
#app {
  height: 100%;
  overflow: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
