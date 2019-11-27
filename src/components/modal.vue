<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" :style="{width: width+'px'||'auto' }">
          <div class="modal-header">
            <span class="modal-title">{{headerName}}</span>
            <button type="button" class="close" @click="$emit('close')">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body" :style="{height: mbHeight+'px'||'auto'}">
            <slot name="modal-body"></slot>
          </div>
          <div class="modal-footer">
            <slot name="modal-footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "Modal",
  props: ["headerName","width","mbHeight"],
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.modal-mask {
  font-size: 14px;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .1);
  display: block;
  text-align: left;
  transition: opacity .3s ease;
  .modal-wrapper {
    vertical-align: middle;
    .modal-container {
      margin: 0px auto;
      padding: 10px 10px;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      font-family: Helvetica, Arial, sans-serif;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .modal-header {
        padding: 10px;
      }
      .modal-body {
        margin: 0;
        position: relative;
      }
      .modal-footer {
        text-align: right;
      }
    }
  }
}

.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
