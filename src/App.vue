<template>
  <div>
    <Header id="header"/>
    <Sidebar id="sidebar" />
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
 html, body {
        padding: 3px;
        box-sizing: border-box;
        margin: 0;
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
    
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
 #header {
   position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 8%;
 }
 #sidebar{
    position:fixed;
    top: 8%; 
    left:0px; 
    width:15%; 
    height:1000px; 
    background:#333; 
    padding:10px 0;
    font-size:20px;
    overflow: hidden;
 }
#layout.collapsed {
  padding-left: 10px;
}
.layout {
  padding: 10px;
}
.container {
  position: fixed;
  top: 10%;
  left: 16%;
  max-width: 80%;
}

</style>