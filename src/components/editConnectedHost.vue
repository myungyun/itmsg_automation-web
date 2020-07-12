<template>
    <div>
        <h3>Edit Connected Host Page</h3>
        <div style="text-align: right;">
            <button type="button" @click="backListBtnOnClick()" class="btn btn-primary"
                style="margin: 10px; font-size: 20px; text-align: right;">Back to List</button>
        </div>
        <div id="body">
            <!-- Tabs with card integration -->
            <b-card no-body cen>
                <b-tabs v-model="tabIndex" card>
                    <b-tab title="Create Inventory" :title-link-class="linkClass(0)">
                        <h1>This Page will be updated</h1>
                        <div style="float: right">
                            <b-button variant="primary" @click="saveBtnOnclick()" style="margin: 5px 5px 5px 5px">Save
                            </b-button>
                            <b-button variant="danger" @click="cancelBtnOnclick()">Cancel</b-button>
                        </div>
                    </b-tab>
                    <b-tab title="Select Host" :title-link-class="linkClass(1)" :disabled="disabledTab">
                        <hostTable v-model="selectedRows"/>
                        <div style="float: right">
                            <b-button variant="primary" @click="finishBtnOnclick()" style="margin: 5px 5px 5px 5px">
                                Finish</b-button>
                            <b-button variant="danger" @click="cancelBtnOnclick()">Cancel</b-button>
                        </div>
                    </b-tab>
                </b-tabs>
            </b-card>

            <!-- Control buttons-->
            <div class="text-center">
                <b-button-group class="mt-2">
                    <b-button @click="tabIndex--">Previous</b-button>
                    <b-button @click="tabIndex++">Next</b-button>
                </b-button-group>
            </div>
        </div>
    </div>
</template>
<script>
    import JqxForm from "jqwidgets-scripts/jqwidgets-vue/vue_jqxform.vue";
    import JqxButton from "jqwidgets-scripts/jqwidgets-vue/vue_jqxbuttons.vue";
    import hostTable from "./Host.vue"
    import axios from 'axios';
    import vurl from './url.js'

    export default {
        name: "editConnectedHost",
        components: {
            JqxForm,
            JqxButton,
            hostTable
        },
        data: function () {
            return {
                tabIndex: 0,
                disabledTab: true,
                vname: '',
                vcontent: '',
                vuse: '',
                use_selected: 'Yes',
                use: ['Yes', 'No'],
                selectedRows: ''
            }
        },
        methods: {
            backListBtnOnClick: function (event) {
                this.$router.push({
                    name: 'Inventory'
                })
            },
            linkClass: function (idx) {
                if (this.tabIndex === idx) {
                    return ['bg-primary', 'text-light']
                } else {
                    return ['bg-light', 'text-info']
                }
            },
            duplChkBtnOnClick: function(e) {
                console.log(this.$refs.name.value);
                
                axios.get(vurl + '/chkIvnDupl', {
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
            saveBtnOnclick: function () {
                this.name = this.$refs.name.value
                this.content = this.$refs.content.value
                let vuse_yn = '';
                console.log(this.$refs.ynChk.value);
                if (this.$refs.ynChk.value === 'Yes') {
                    vuse_yn = 'Y';
                } else {
                    vuse_yn = 'N'
                }
                this.vuse=vuse_yn
                // if (this.name === '') {
                //     alert('Check Inventory name!')
                // }else if(this.name !== '') {
                //     this.disabledTab = false
                // }
                this.disabledTab = false
            },
            finishBtnOnclick: function () {
                let vuse_yn = '';
                console.log(this.$refs.ynChk.value);
                if (this.$refs.ynChk.value === 'Yes') {
                    vuse_yn = 'Y';
                } else {
                    vuse_yn = 'N'
                }
                // console.log('Selected List',this.selectedRows);
                console.log(vuse_yn);            
                axios.post(vurl + '/inventory', {
                        name: this.$refs.name.value,
                        content: this.$refs.content.value,
                        use_yn: vuse_yn,
                        hid: this.selectedRows
                    })
                    .then(res => {
                        // console.log(res);
                        const resData = res.data.data;
                        if (res.data.code === '200') {
                            this.$router.push({
                                name: 'Inventory'
                            })
                        } else if (res.data.code === '820') {
                            alert('There is no Inventory ID');
                        } else {
                            alert('Random Error Occur!')
                        }
                    })
                    .catch(err => console.log(err))
            },
            cancelBtnOnclick: function () {
                this.$router.push({
                    name: 'Inventory'
                })
            }
        }
    }
</script>
<style scoped>
    #btn-group {
        border-color: rgb(0, 204, 255);
        float: right;
    }

    #body {
        width: 1550px;
    }
</style>