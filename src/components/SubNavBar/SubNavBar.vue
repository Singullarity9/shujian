<template>
  <div class="subNav">
    <div id="container">
      <router-link to="/">
        <img :src="$imgLogo" alt="" height="80" style="margin:10px 0">
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubNavBar',
  data() {
    return {}
  },

  components: {},

  computed: {},

  mounted() { },

  methods: {},
}
</script>
<style lang='less' scoped>
.subNav {
  height: 100px;
}
</style>