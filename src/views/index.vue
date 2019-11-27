<template>
  <div class="home-page">
    <admin-header @setCollapse="setCollapse"></admin-header>
    <div class="content-body" :class="{'sidebar-collapse':isCollapse}">
      <admin-sidebar></admin-sidebar>
      <admin-content></admin-content>
    </div>
  </div>
</template>
<script>
import adminHeader from '@/components/adminHeader.vue'
import adminSidebar from '@/components/adminSidebar.vue'
import adminContent from '@/components/adminContent.vue'
export default {
  name: 'index',
  components: {
    'admin-header': adminHeader,
    'admin-sidebar': adminSidebar,
    'admin-content': adminContent
  },
  data: function () {
    return {
      isCollapse: false
    }
  },
  mounted() {
    let userInfo = this.$store.state.powerUser;
    if (!userInfo.userName) {
      showPrompt({
        content: "用户信息过期，请重新登录!",
        confirm: () => {
          this.$router.push({ name: "login" });
        }
      })

    }
  },
  methods: {
    setCollapse: function () {
      this.isCollapse = !this.isCollapse;
    }
  }
}
</script>