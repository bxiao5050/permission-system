<template>
  <li>
    <div class="item-content" :title="data.name">
      <input type="checkbox" @change="changeIsOwner(data.isowner)" v-model="data.isowner" :data-id="data.length">
      <i  @click="toggleTree()" :class="{'icon-folder':data.children&&data.length>0,'icon-file':!data.children||data.length==0}"></i>
      <span  @click="toggleTree()">{{data.name}}</span>
      <!--<input type="checkbox" ng-model="data.isOwner">-->
    </div>
    <ul class="item-ul" v-show="open" v-if="data.children && data.length > 0">
      <cirzonetree class="item-li" @changeParentState="changeParentState" v-for="(item,index) in data.children" :key="index" :data="item" ></cirzonetree>
    </ul>
  </li>
</template>
<script>
export default {
  name: "cirzonetree",
  props: ["data"],
  data() {
    return {
      open: false,
      changeZoneChild: false,
      isChangeParent:false
    }
  },
  methods: {
    toggleTree() {
        this.open = !this.open;
    },
    changeIsOwner(newVal) {
      if (!this.isChangeParent && this.changeZoneChild == false) {
        this.changeChildrenState(this.data, newVal)
        this.$emit("changeParentState")
      }
    },
    changeChildrenState(dt, newVal) {
      if (dt.children && dt.length > 0) {
        for (var i in dt.children) {
          dt.children[i].isowner = newVal;
          this.changeChildrenState(dt.children[i], newVal)
        }
      }
    },
    changeParentState() {
      this.isChangeParent = true;
      this.changeParentByChild(this.data);
      this.$emit("changeParentState")
      this.isChangeParent = false;
    },
    changeParentByChild(dt) {
      if (dt.children && dt.length > 0) {
        var count = 0;
        for (var i in dt.children) {
          if (dt.children[i].isowner) {
            count++;
          }
        }
        if (count == dt.length) {
          dt.isowner = true;
        } else {
          dt.isowner = false;
        }
      }
    }

  }
}
</script>
