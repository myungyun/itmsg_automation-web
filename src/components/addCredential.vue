<template>
    <div style="top: 100px;">
        <h1>Credential Add Page</h1>
        <div style="text-align: right;">
            <button type="button" @click="backListBtnOnClick()" class="btn btn-primary" 
            style="margin: 10px; font-size: 20px; text-align: right;">Back to List</button>
        </div>
        <div>
            <b-tabs content-class="mt-3">
                <b-tab title="Machine" active>
                    <table class="table table-striped">
        <tbody>
            <tr>
                <td>Name</td>
                <td>
                    <input type="host" class="form-control" ref="name"
                    id="name" :state="true" placeholder="Enter Host name">
                    <div ref="nameChk" style="display: none;"></div>
                </td>
                <td>
                    <button type="button" @click="duplChkBtnOnClick()" class="btn btn-primary" 
                    style="margin: 10px; font-size: 20px; text-align: right;">Name Check</button>
                </td>
            </tr>
            <tr>
                <td>Machine ID</td>
                <td colspan="2">
                    <input type="domain" class="form-control" id="domain" ref="domain" 
                    placeholder="Enter Machine ID">
                </td>
            </tr>
            <tr>
                <td>Password</td>
                    <td colspan="2">
                        <input type="password" class="form-control" id="password" ref="password" placeholder="Enter password ">
                    </td>
            </tr>
            <tr>
                <td>Description</td>
                <td colspan="2">
                    <input type="description" class="form-control" id="description" ref="description" placeholder="Enter description ">
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
                    <input type="host" class="form-control" ref="name"
                    id="name" :state="true" placeholder="Enter Host name">
                    <div ref="nameChk" style="display: none;"></div>
                </td>
                <td>
                    <button type="button" @click="duplChkBtnOnClick()" class="btn btn-primary" 
                    style="margin: 10px; font-size: 20px; text-align: right;">Name Check</button>
                </td>
            </tr>
            <tr>
                <td>Machine ID</td>
                <td colspan="2">
                    <input type="domain" class="form-control" id="domain" ref="domain" 
                    placeholder="Enter Machine ID">
                </td>
            </tr>
            <tr>
                <td>Password</td>
                    <td colspan="2">
                        <input type="password" class="form-control" id="password" ref="password" placeholder="Enter password ">
                    </td>
            </tr>
            <tr>
                <td>Description</td>
                <td colspan="2">
                    <input type="description" class="form-control" id="description" ref="description" placeholder="Enter description ">
                </td>
            </tr>
            <tr>
                <td>Certificate</td>
                <td colspan="2">
                    <b-form-textarea id="privateKey" placeholder="Enter Private Key"  rows="10"  max-rows="100">
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
    import vurl from './url.js'

    export default {
        name:"addCredential",
        components: {
            JqxForm,
            JqxButton
        },
        data: function () {
            return {
                
            }
        },
        methods: {
            backListBtnOnClick: function(e) {
                this.$router.push({name: 'Host'})
            },
            duplChkBtnOnClick: function(e) {
                console.log(this.$refs.name.value);
                
                axios.get(vurl + '/chkCredDupl', {
                    params: {
                        name: this.$refs.name.value
                    }
                })
                .then(res => {
                    const target = this.$refs.nameChk;
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
            machineTypeOnClick: function(e) {

            },
            vmwareTypeOnClick: function(e) {
                const target = this.$refs.privateKey;
                target.innerHTML = '<tr><td>Description</td><td colspan="2"><input type="description" class="form-control" id="description" ref="description" placeholder="Enter description "></td></tr>';
            },
            saveBtnOnClick: function(e) {
                const start = Date.now();
                const curDate = Date(start);
                let vuse_yn = '';
                console.log(this.$refs.ynChk.value);
                if (this.$refs.ynChk.value === 'Yes') {
                    vuse_yn = 'Y';
                } else {
                    vuse_yn = 'N'
                }
                //console.log(vuse_yn);            
                axios.post(vurl + '/cred', {
                    name: this.$refs.name.value,
                    domain: this.$refs.domain.value,
                    ip: this.$refs.ip.value,
                    os: this.selected,
                    use_yn: vuse_yn
                })
                .then(res => {
                    // console.log(res);
                    const resData = res.data.data;
                    if (res.data.code === '200') {
                        this.$router.push({name: 'Credential'})
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