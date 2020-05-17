<template>
  <div>
    <div class='left'>
      <b-nav vertical class="w-25">
        <b-nav-item @mouseover="mouseOver" active :to="{ path: '/'}">Home</b-nav-item>
        <b-nav-item active :to="{ path: '/inventory'}">Inventory</b-nav-item>
        <b-nav-item :to="{ path: '/host'}">Host</b-nav-item>
        <b-nav-item active :to="{ path: '/template'}">Playbook Template</b-nav-item>
        <b-nav-item :to="{ path: '/ahtemplate'}">ADHOC Template</b-nav-item>
        <b-nav-item :to="{ path: '/credential'}">Credential</b-nav-item>
        <b-nav-item active :to="{ path: '/job'}">Job</b-nav-item>
        <!-- <b-nav-item disabled>Disabled</b-nav-item> -->
      </b-nav>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Sidebar',
  data: {
        active: false
    },
    methods: {
        mouseOver: function(){
            this.active = !this.active;   
        }
    }
}
</script>
<style scoped>
    .b-nav-item{
      color:black!important;
      color: #fff;
        text-align: center;
    }
</style>
