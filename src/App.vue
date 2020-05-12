<template>
  <div>
    <Header />
    <Sidebar />
    <div id="layout" :class="[{'collapsed' : collapsed}]">
      <div class="layout">
        <div class="container">
          <router-view/>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
  import Header from './components/layout/Header'
  import Sidebar from './components/layout/Sidebar'
  export default {
  name:"app",
  components: {
    Header,
    Sidebar
  },
  data() {
    return {
    }
  }
}
</script>

<style >
 #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

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

#layout.collapsed {
  padding-left: 10px;
}
.layout {
  padding: 50px;
}
.container {
  max-width: 1500px;
}

</style>