<template>
  <div>
    <div class='left'>
      <b-nav vertical class="w-25">
        <b-nav-item card-list active :to="{ path: '/'}">Home</b-nav-item>
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
  name: 'Sidebar'
}
</script>
<style>
  .left{
    position:fixed; 
    top:0px; 
    left:0px; 
    width:15%; 
    height:1000px; 
    background:#333; 
    padding:70px 0;
    font-size:20px; 
    overflow: hidden
  }

</style>


 <!-- <b-nav-item active @click="hide">Active</b-nav-item>
                