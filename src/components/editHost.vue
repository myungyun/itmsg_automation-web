<template>
    <div style="top: 100px;">
        <h1>Host Add Page</h1>
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
                <td>Domain</td>
                <td colspan="2">
                    <input type="domain" class="form-control" id="domain" ref="domain" 
                    placeholder="Enter Server Domain">
                </td>
            </tr>
            <tr>
                <td>IP</td>
                    <td colspan="2">
                        <input type="IP" class="form-control" id="ip" ref="ip" placeholder="Enter Server IP">
                    </td>
            </tr>
            <tr>
                <td>OS</td>
                <td colspan="2">
                    <select class="form-control" v-model="selected">
                        <option v-for="option in options" v-bind:value="option.value" ref="os">
                            {{ option.value }}
                        </option>
                    </select>       
                </td>
            </tr>
            <tr>
                <td>Use</td>
                <td colspan="2">
                    <b-form-radio-group v-model="use_selected" :options="use" class="mb-3"
                    value-field="item" text-field="use_yn" disabled-field="notEnabled" ref="ynChk"
                    ></b-form-radio-group>
                </td>
            </tr>
        </tbody>
        </table>
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
        name:"editHost",
        components: {
            JqxForm,
            JqxButton
        },
        data: function () {
            return {
                options: [
                    { value: 'undefined' },
                    { value: 'Microsoft Windows Server 2012(64bit)' },
                    { value: 'Microsoft Windows Server 2012 R2 Standard' },
                    { value: 'Microsoft Windows Server 2003 Standard (32-bit)' },
                    { value: 'Microsoft Windows 2000 Server' },
                    { value: 'Microsoft Windows Server 2008(64bit)' },
                    { value: 'Microsoft Windows Server 2008 R2(64bit)' },
                    { value: 'Red Hat Enterprise Linux 7 (64-bit)' },
                    { value: 'Red Hat Enterprise Linux 6 (64-bit)' },
                    { value: 'CentOS 4/5/6/7(64bit)' },
                    { value: 'SUSE Linux Enterprise 11 (64-bit)' }
                ],
                use_selected: 'Yes',
                use: [ 'Yes', 'No' ]
            }
        },
        beforeCreate: function () {
            const hid = this.$route.params.id
            let params = ''
            params += '?seq=' + hid
            axios.get(vurl + '/host/o' + params)
                .then(res => {
                    const resData = res.data.data;
                    if (res.data.code === '200') {
                        this.$refs.name.value = resData.name
                        this.$refs.domain.value = resData.domain;
                        this.$refs.ip.value = resData.ip
                        this.selected = resData.os
                        if (resData.use_yn === 'Y') {
                            this.use_selected = 'Yes';
                        } else {
                            this.use_selected = 'No';
                        }
                    } else if (res.data.code === '820') {
                        alert('There is no host id');
                    } else {
                        alert('Random Error Occur!')
                    }
                })
                .catch(err => console.log(err))
        },
        methods: {
            backListBtnOnClick: function(e) {
                this.$router.push({name: 'Host'})
            },
            duplChkBtnOnClick: function(e) {
                console.log(this.$refs.name.value);
                
                axios.get(vurl + '/chkHstDupl', {
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
            saveBtnOnClick: function(e) {
                const param = '?seq=' + this.$route.params.id
                console.log(param);
                let vuse_yn = '';
                if (this.use_selected === 'Yes') {
                    vuse_yn = 'Y';
                } else {
                    vuse_yn = 'N'
                }
                axios.put(vurl + '/host'+ param, {
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
                        this.$router.push({name: 'Host'})
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