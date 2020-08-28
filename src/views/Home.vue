<template>
  <div id="app">
    <div style="margin: 10px 10px 10px 10px;">
      <h1>Hello Automation Web Page!</h1>
      <p>Let's get start Automation with Ansible.</p>
    </div>
    <h3>Input Server IP</h3>
    <div style="vertical-align: middle; ">
      <input style="margin: 12px 0px 0px 0px; float: left; line-height:100px;" class="w-50 form-control" ref="serverIP" id="serverIP" placeholder="http(s)://">
    <button type="button" class="btn btn-primary" @click="registerServer()"
        style="float: left; margin: 10px; font-size: 20px; ">Register</button>
    </div>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {

  },
  data: function() {
    return {
      
    }
  },
  methods: {
    registerServer: function() {

    }
  }
}
</script>

<style>
 * {
   box-sizing: border-box;
   margin: 0;
   padding: 0;
 }

 body {
   font-family: Arial, Helvetica, sans-serif;
   line-height: 1.4;
 }

 .btn {
   display: inline-block;
   border: none;
   background: #555;
   color: #fff;
   padding: 7px 20px;
   cursor: pointer;
 }

 .btn:hover {
   background: #666;
 }
</style>
