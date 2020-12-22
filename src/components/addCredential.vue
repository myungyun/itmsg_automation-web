<template>
  <div style="top: 100px;">
    <h1>Credential Add Page</h1>
    <div>
      <b-tabs content-class="mt-3" v-model="tabIndex">
        <b-tab title="Machine" active>
          <table class="table table-striped">
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <input type="host" class="form-control" ref="machineName" id="machineName" :state="true"
                    placeholder="Enter Host name">
                  <div ref="machineNameChk" style="display: none;"></div>
                </td>
                <td>
                  <button type="button" @click="machineDuplChkBtnOnClick()" class="btn btn-primary"
                    style="margin: 10px; font-size: 20px; text-align: right;">Name Check</button>
                </td>
              </tr>
              <tr>
                <td>Machine ID</td>
                <td colspan="2">
                  <input type="domain" class="form-control" id="id" ref="id" placeholder="Enter Machine ID">
                </td>
              </tr>
              <tr>
                <td>Password</td>
                <td colspan="2">
                  <input type="password" class="form-control" id="pw" ref="pw" placeholder="Enter password ">
                </td>
              </tr>
              <tr>
                <td>Description</td>
                <td colspan="2">
                  <input type="description" class="form-control" id="content" ref="content"
                    placeholder="Enter description ">
                </td>
              </tr>
            </tbody>
          </table>
        </b-tab>
        <b-tab title="VMware">
          <table class="table table-striped">
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <input type="host" class="form-control" ref="vmwareName" id="vmwareName" :state="true"
                    placeholder="Enter Host name">
                  <div ref="vmwareNameChk" style="display: none;"></div>
                </td>
                <td>
                  <button type="button" @click="vmwareDuplChkBtnOnClick()" class="btn btn-primary"
                    style="margin: 10px; font-size: 20px; text-align: right;">Name Check</button>
                </td>
              </tr>
              <tr>
                <td>Machine ID</td>
                <td colspan="2">
                  <input type="domain" class="form-control" id="vmid" ref="vmid" placeholder="Enter Machine ID">
                </td>
              </tr>
              <tr>
                <td>Password</td>
                <td colspan="2">
                  <input type="password" class="form-control" id="vmpw" ref="vmpw" placeholder="Enter password ">
                </td>
              </tr>
              <tr>
                <td>Description</td>
                <td colspan="2">
                  <input type="description" class="form-control" id="vmcontent" ref="vmcontent"
                    placeholder="Enter description ">
                </td>
              </tr>
              <tr>
                <td>Certificate</td>
                <td colspan="2">
                  <b-form-textarea id="privateKey" ref="privateKey" placeholder="Enter Private Key" rows="10"
                    max-rows="100">
                  </b-form-textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </b-tab>
      </b-tabs>
    </div>

    <div style="text-align: center">
      <button type="button" class="btn btn-primary" @click="saveBtnOnClick()"
        style="margin: 10px; font-size: 20px;">Save</button>
      <button type="button" class="btn btn-danger" @click="backListBtnOnClick()"
        style="margin: 10px; font-size: 20px;">Cancel</button>
    </div>
  </div>
</template>
<script>
  import JqxForm from "jqwidgets-scripts/jqwidgets-vue/vue_jqxform.vue";
  import JqxButton from "jqwidgets-scripts/jqwidgets-vue/vue_jqxbuttons.vue";
  import axios from 'axios';
  const vurl = process.env.VUE_APP_BACKEND_URL

  export default {
    name: "addCredential",
    components: {
      JqxForm,
      JqxButton
    },
    data: function () {
      return {
        tabIndex: 1
      }
    },
    methods: {
      backListBtnOnClick: function (e) {
        this.$router.push({
          name: 'Credential'
        })
      },
      machineDuplChkBtnOnClick: function (e) {
        // console.log(this.$refs.machineName.value);

        axios.get(vurl + '/chkCredDupl', {
            params: {
              name: this.$refs.machineName.value
            }
          })
          .then(res => {
            const target = this.$refs.machineNameChk;
            if (res.data.code === '602') {
              target.innerHTML = 'This name is available';
              target.style.display = 'block';
              target.style.color = 'blue';
            } else if (res.data.code === '200') {
              target.innerHTML = 'This name is already used.';
              target.style.display = 'block';
              target.style.color = 'red';
            } else if (res.data.code === '820') {
              target.innerHTML = 'Empty Name is applied..';
              target.style.display = 'block';
              target.style.color = 'red';
            } else {
              target.innerHTML = 'unexpected error..';
              target.style.display = 'block';
              target.style.color = 'red';
            }
          })
          .catch(err => console.log(err))
      },
      vmwareDuplChkBtnOnClick: function (e) {
        // console.log(this.$refs.vmwareName.value);

        axios.get(vurl + '/chkCredDupl', {
            params: {
              name: this.$refs.vmwareName.value
            }
          })
          .then(res => {
            const target = this.$refs.vmwareNameChk;
            if (res.data.code === '602') {
              target.innerHTML = 'This name is available';
              target.style.display = 'block';
              target.style.color = 'blue';
            } else if (res.data.code === '200') {
              target.innerHTML = 'This name is already used.';
              target.style.display = 'block';
              target.style.color = 'red';
            } else if (res.data.code === '820') {
              target.innerHTML = 'Empty Name is applied..';
              target.style.display = 'block';
              target.style.color = 'red';
            } else {
              target.innerHTML = 'unexpected error..';
              target.style.display = 'block';
              target.style.color = 'red';
            }
          })
          .catch(err => console.log(err))
      },
      machineTypeOnClick: function (e) {

      },
      saveBtnOnClick: function (e) {
        // console.log(this.tabIndex);
        let body = (this.tabIndex === 0) ? {
          name: this.$refs.machineName.value,
          mid: this.$refs.id.value,
          mpw: this.$refs.pw.value,
          content: this.$refs.content.value,
          type: "machine"
        } : {
          name: this.$refs.vmwareName.value,
          mid: this.$refs.vmid.value,
          mpw: this.$refs.vmpw.value,
          content: this.$refs.vmcontent.value,
          private_key: this.$refs.privateKey.value,
          type: "vmware"
        }

        axios.post(vurl + '/cred', body)
          .then(res => {
            // console.log(res);
            const resData = res.data.data;
            if (res.data.code === '200') {
              this.$router.push({
                name: 'Credential'
              })
            } else if (res.data.code === '820') {
              alert('There is no Inventory ID');
            } else {
              alert('Random Error Occur!')
            }
          })
          .catch(err => console.log(err))
      }
    }
  }
</script>
<style>
</style>