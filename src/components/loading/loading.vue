<template>
  <div class="loading-group" v-show="isShow">
    <div class="loading"></div>
  </div>
</template>
<script>
export default {
  data:function(){
    return{
      type:"",
      isShow:false,
    }
  },
  mounted:function(){
    window.showLoading=this.showLoading;
    window.hideLoading=this.hideLoading;
  },
  methods:{
    showLoading:function(){
      this.isShow=true;
    },
    hideLoading:function(){
      this.isShow=false;
    }
  }
}
</script>
<style lang="scss" scoped>
.loading-group {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(255,255,255, 0.2);
  .loading {
    width:80px;
    height:60px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: url('../../assets/loading.svg')no-repeat;
    background-size: 100% 100%;
  }
}
</style>
