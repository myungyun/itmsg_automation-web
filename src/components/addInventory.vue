<template>
    <div>
        <h3>Inventory Add Page</h3>        
        <div id="body">
            <!-- Tabs with card integration -->
            <b-card no-body cen>
                <b-tabs v-model="tabIndex" card>
                    <b-tab title="Create Inventory" :title-link-class="linkClass(0)">
                        <table class="table table-striped">
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>
                                        <input type="host" class="form-control" ref="name" id="name" :state="true"
                                            placeholder="Enter Inventory name">
                                        <div ref="nameChk" style="display: none;"></div>
                                    </td>
                                    <td>
                                        <button type="button" @click="duplChkBtnOnClick()" class="btn btn-primary"
                                            style="margin: 10px; font-size: 20px; text-align: right;">Name
                                            Check</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Description</td>
                                    <td colspan="2">
                                        <input type="domain" class="form-control" id="content" ref="content"
                                            placeholder="Enter Server Domain">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Use</td>
                                    <td colspan="2">
                                        <b-form-radio-group v-model="use_selected" :options="use" class="mb-3"
                                            value-field="item" text-field="use_yn" disabled-field="notEnabled"
                                            ref="ynChk"></b-form-radio-group>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
    const vurl = process.env.VUE_APP_BACKEND_URL

    export default {
        name: "addInventory",
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
                console.log(this.use_selected);
                console.log(typeof this.use_selected);
                if (this.use_selected === 'Yes') {
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
                if (this.use_selected === 'Yes') {
                    vuse_yn = 'Y';
                } else {
                    vuse_yn = 'N'
                }          
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
        width: 1240px;
    }
</style>