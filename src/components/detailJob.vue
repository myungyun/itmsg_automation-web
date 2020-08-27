<template>
  <div>
      <h3>Job Detail Page</h3>
      <button type="button" class="btn btn-danger" @click="cancelJob()"
      style="margin: 0px 30px 5px 5px; float: right; font-size: 20px;">Cancel Job</button>
    <div style="margin: 50px 5px 5px 0px; float: left; width: 30%;">
      <table class="table table-striped">
        <tbody>
          <tr>
            <td>Status</td>
            <td>
              <input class="form-control" ref="status" id="status" v-model="vstatus" readonly>
            </td>
          </tr>
          <tr>
            <td>Started</td>
            <td>
              <input class="form-control" ref="started" id="started" readonly>
            </td>

          <tr>
            <td>Finished</td>
            <td>
              <input class="form-control" id="finished" ref="finished" readonly>
            </td>
          </tr>
          <tr>
            <td>Inventory</td>
            <td>
              <input class="form-control" id="inventory" ref="inventory" readonly>
            </td>
          </tr>
          <tr>
            <!-- <td>Credential</td>
            <td>
              <input class="form-control" id="credential" ref="credential" readonly>
            </td> -->
            <td>Template</td>
            <td>
              <input class="form-control" id="template" ref="template" readonly>
            </td>
          </tr>
          <tr>
            <td>Limit</td>
            <td>
              <input class="form-control" id="limit" ref="limit" readonly>
            </td>
          </tr>
          <tr>
            <td>Fork</td>
            <td>
              <input class="form-control" id="fork" ref="fork" readonly>
            </td>
          </tr>
          <tr>
            <td>Variable</td>

          </tr>
          <tr>
            <td colspan="2">
              <b-form-textarea id="variable" ref="variable" rows="7" readonly>
              </b-form-textarea>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="margin: 5px 5px 5px 5px; float: left; width: 68%;">
      <table class="table table-striped">
        <tbody>
          <tr>

            <td>
              Job Log
            </td>
          </tr>
          <tr>
            <td>
              <b-form-textarea id="jobLog" ref="jobLog" rows="16" v-model="vjoblog" readonly>
              </b-form-textarea>
            </td>
          </tr>
          <tr>
            <td>
              Result
            </td>
          </tr>
          <tr>
            <td>
              <b-form-textarea id="recap" ref="recap" rows="6" readonly>
              </b-form-textarea>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import vurl from './url.js'

  export default {
    name: "detailJob",
    components: {},
    data: function () {
      return {
        pid: '',
        vstatus: '',
        vjoblog: ''
      }
    },
    beforeCreate() {
      const params = '?seq=' + this.$route.params.id
      axios.get(vurl + '/job/o' + params)
        .then(res => {
          // console.log(res);
          const resData = res.data.data;

          if (res.data.code === '200') {
            if (resData.status === 'F') {
              this.vstatus = 'Fail';
            } else if (resData.status === 'S') {
              this.vstatus = 'Success';
            } else if (resData.status === 'P') {
              this.vstatus = 'Proceeding';
            } else {
              this.vstatus = 'Unknown Status';
            }
            this.$refs.started.value = resData.start_dt;
            this.$refs.finished.value = resData.end_dt;
            this.$refs.inventory.value = resData.iname;
            this.$refs.template.value = resData.tname;
            if (resData.limits === null) {
              this.$refs.limit.value = 'NO DATA';
            } else {
              this.$refs.limit.value = resData.limits;
            }
            this.$refs.fork.value = resData.forks;

            let vvariable = resData.variables;
            this.$refs.variable.value = vvariable.replace(/\\n/g, '\r\n');
          } else if (res.data.code === '820') {
            alert('There is no Inventory ID');
          } else {
            alert('Random Error Occur!')
          }
        })
        .catch(err => console.log(err))
    },
    created() {
      const params = '?seq=' + this.$route.params.id
      this.getJoblog(params)
      this.analyzedResult(params)
    },
    methods: {
      getJoblog: function (params) {
        axios.get(vurl + '/jobevent/o' + params)
          .then(res => {
            // console.log(res);
            const resData = res.data;

            if (res.data.code === '200') {
              let jobLog = ''
              this.pid = resData.data[0].pid;
              resData.data.forEach((log) => {
                jobLog += log.stdout;
              });
              jobLog = jobLog.replace(/\\n/g, '\r\n');
              jobLog = jobLog.replace(/\\x3E/gim, '>');
              jobLog = jobLog.replace(/\\x22/gim, '"');
              jobLog = jobLog.replace(/\\x27/gim, '\'');
              this.vjoblog = jobLog;
            } else if (res.data.code === '820') {
              alert('There is no Job ID');
            } else {
              alert('Random Error Occur!')
            }
          })
          .catch(err => console.log(err))
      },
      analyzedResult: function (params) {
        axios.get(vurl + '/analyzedResult' + params)
          .then(res => {
            // console.log(res);
            const resData = res.data.data;

            if (res.data.code === '200') {
              this.$refs.recap.value = resData.replace(/\\n/g, '\r\n');
            } else if (res.data.code === '820') {
              alert('There is no Job ID');
            } else {
              alert('Random Error Occur!')
            }
          })
          .catch(err => console.log(err))
      },
      cancelJob: function () {
        const params = '?pid=' + this.pid
        if (confirm("Are you sure you want to cancel this Job?")) {
          axios.get(vurl + '/terminateOneJob' + params)
          .then(res => {
            if (res.data.code === '880') {
              alert('Successfully Cancel job : '+res.data.statusMsg)
            } else if (res.data.code === '820') {
              alert('There is no Proccess ID');
            } else {
              alert('Random Error Occur!')
            }
          })
          .catch(err => console.log(err))
        } else {
          alert('Unexpected Error!')
        }
      }
    }
  }
</script>
<style scoped>

</style>