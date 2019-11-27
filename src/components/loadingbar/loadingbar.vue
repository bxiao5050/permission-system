<template>
  <div class="loading-bar" :class="type" v-show="isShow">
    <div class="loading-bar-inner" :style="{'width':value+'%'}"></div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      isShow:false,
      type: 'normal',
      value: 0,
      loadingInterval: null,
      
    }
  },
  mounted: function () {
    window.loadingBar = {
      start: this.start,
      finish: this.finish,
      error: this.error
    }
  },
  methods: {
    start: function () {
      this.isShow=true;
      this.value=0;
      this.type = "normal";
      this.loadingInterval = setInterval(() => {
        if (this.value >= 95) {
          clearInterval(this.loadingInterval);
        }
        else {
          this.value++;
        }
      }, 50)
    },
    finish: function () {
      this.value = 100;
      clearInterval(this.loadingInterval);
      setTimeout(() => {
        this.isShow=false;
      }, 1000)
    },
    error: function () {
      this.type = "error";
      this.value = 100;
      clearInterval(this.loadingInterval);
      setTimeout(() => {
        this.isShow=false;
      }, 10000)
    }
  }
}
</script>
<style lang="scss" scoped>
.loading-bar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 3px;
  .loading-bar-inner {
    transition: width .1s ease-in-out;
    height: 2px;
    background-color: blueviolet;//#2d8cf0;
  }
  // &.normal {
  //   .loading-bar-inner {
  //     background-color: #2d8cf0;
  //   }
  // }
  &.error {
    .loading-bar-inner {
      background-color: #ed3f14;
    }
  }
}
</style>
