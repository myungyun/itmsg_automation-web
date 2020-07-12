<template>
  <div>
    <h3>Job Detail Page</h3>
    <div>
      
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import vurl from './url.js'

  export default {
    name: "detailJob",
    components: {
    },
    model: {
      prop: 'sendData',
      event: 'event-data'
    },
    props: ['sendData'],
    data: function () {
      return {
        
      }
    },
    beforeCreate: function () {
      //let data = {"rowCount":7,"totalCount":"7","list":[{"iid":44,"name":"0925test","content":"","total_hosts":0,"use_yn":"Y","create_dt":"2019-09-25 17:23:04","create_id":"admin","update_dt":null},{"iid":39,"name":"","content":"0904ss1","total_hosts":0,"use_yn":"Y","create_dt":"2019-09-04 14:33:31","create_id":"admin","update_dt":null},{"iid":21,"name":"localhost","content":"","total_hosts":1,"use_yn":"Y","create_dt":"2019-06-19 16:45:03","create_id":"admin","update_dt":null},{"iid":9,"name":"Linux_ssh_inv","content":"","total_hosts":2,"use_yn":"Y","create_dt":"2019-03-18 17:02:56","create_id":"admin","update_dt":"2019-04-29 17:58:02"},{"iid":5,"name":"local_test","content":"","total_hosts":3,"use_yn":"Y","create_dt":"2019-03-05 14:48:09","create_id":"admin","update_dt":"2019-04-25 13:59:42"},{"iid":3,"name":"itmsg_test","content":"","total_hosts":1,"use_yn":"Y","create_dt":"2019-02-22 11:11:53","create_id":"admin","update_dt":"2019-09-04 13:57:03"},{"iid":1,"name":"TEST","content":"","total_hosts":971,"use_yn":"N","create_dt":"2019-02-13 14:34:28","create_id":"admin","update_dt":"2019-03-27 17:07:18"}]}
    },
    methods: {
      
    }
  }
</script>
<style scoped>
  
</style>
