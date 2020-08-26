<template>
    <div style="top: 100px;">
        <h1>Playbook Template Edit Page</h1>
        <button type="button" class="btn btn-info" @click="executeTemplate()"
            style="margin: 5px 5px 5px 5px; float: right; font-size: 20px;">Execute</button>
        <table class="table table-striped">
            <tbody>
                <tr>
                    <td>Name</td>
                    <td>
                        <input class="form-control" ref="name" id="name" placeholder="Enter Template name">
                    </td>
                    <td>Playbook</td>
                    <td>
                        <select class="form-control" v-model="playbookSelected">
                            <option v-for="playbook in playbooks" v-bind:value="playbook" ref="playbook">
                                {{ playbook }}
                            </option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Description</td>
                    <td>
                        <input class="form-control" id="description" ref="description" placeholder="Enter Description">
                    </td>
                    <td>Limit</td>
                    <td>
                        <input class="form-control" id="limit" ref="limit" placeholder="Enter Limit">
                    </td>
                </tr>
                <tr>
                </tr>
                <tr>
                    <td>Forks</td>
                    <td>
                        <input class="form-control" id="forks" ref="forks" placeholder="Enter Fork Number">
                    </td>
                    <td>Verbosity</td>
                    <td>
                        <select class="form-control" v-model="verbSelected">
                            <option v-for="verb in verbs" v-bind:value="verb" ref="verbs">
                                {{ verb }}
                            </option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Inventory</td>
                    <td>
                        <b-input-group class="mb-3">
                            <input type="hidden" name="iid" id="iid" ref="iid">
                            <b-form-input id="inventory" ref="inventory" placeholder="Select Inventory" disabled="true">
                            </b-form-input>
                            <b-input-group-append>
                                <b-button size="sm" text="Button" variant="success" @click="inventoryShowModal">Search
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </td>

                    <td>Credential</td>
                    <td>
                        <b-input-group class="mb-3">
                            <b-form-input id="credential" ref="credential" placeholder="Select Credential"
                                disabled="true">
                            </b-form-input>
                            <b-input-group-append>
                                <b-button size="sm" text="Button" variant="success" @click="credentialShowModal">Search
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </td>
                </tr>
                <tr>
                    <td>Use</td>
                    <td>
                        <b-form-radio-group v-model="use_selected" :options="use" class="mb-3" value-field="item"
                            text-field="use_yn" disabled-field="notEnabled" ref="ynChk"></b-form-radio-group>
                    </td>
                </tr>
                <tr>
                    <td>Variables</td>
                    <td colspan="3">
                        <b-form-textarea v-model="variables" id="variables" ref="variables"
                            placeholder="Enter Variables" rows="7" max-rows="100">
                        </b-form-textarea>
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
        <b-modal ref="inventoryModal" size="xl" hide-footer title="Select Inventory">
            <div class="d-block text-center">
            </div>
            <Inventory v-model="selectedInventoryRow" />
            <b-button class="mt-3" variant="outline-primary" block @click="selectInventory">Select</b-button>
            <b-button class="mt-2" variant="outline-danger" block @click="inventoryHideModal">Close</b-button>
        </b-modal>
        <b-modal ref="credentialModal" size="xl" hide-footer title="Select Credential">
            <div class="d-block text-center">
            </div>
            <Credential v-model="selectedCredentialRow" />
            <b-button class="mt-3" variant="outline-primary" block @click="selectCredential">Select</b-button>
            <b-button class="mt-2" variant="outline-danger" block @click="credentialHideModal">Close</b-button>
        </b-modal>
    </div>
</template>
<script>
    import axios from 'axios';
    import vurl from './url.js'
    import Inventory from './Inventory'
    import Credential from './Credential'

    export default {
        name: "addTemplate",
        components: {
            Inventory,
            Credential
        },
        data: function () {
            return {
                playbooks: [],
                playbookSelected: '',
                verbs: [1, 2, 3, 4, 5, 6],
                verbSelected: '',
                use_selected: 'Yes',
                use: ['Yes', 'No'],
                selectedInventoryRow: '',
                selectedCredentialRow: '',
            }
        },
        beforeCreate: function () {
            axios.get(vurl + '/playbook', {})
                .then(res => {
                    const resData = res.data.data;
                    // console.log(resData);
                    if (res.data.code === '200') {
                        this.playbooks = resData
                    } else if (res.data.code === '820') {

                    } else {
                        console.log('unexpected error..');
                    }
                })
                .catch(err => console.log(err))

            const tid = this.$route.params.id
            let params = ''
            params += '?seq=' + tid
            axios.get(vurl + '/jobtemp/o' + params)
                .then(res => {
                    // console.log(res);
                    const resData = res.data.data;
                    if (res.data.code === '200') {
                        this.$refs.name.value = resData.name
                        this.$refs.description.value = resData.content
                        this.$refs.iid.value = resData.iid
                        this.$refs.inventory.value = resData.iname;
                        this.$refs.credential.value = resData.cname;
                        this.playbookSelected = resData.playbook
                        this.$refs.forks.value = resData.forks
                        this.verbSelected = resData.verb
                        if (resData.limits === null) {
                            this.$refs.limit.value = 'NO DATA';
                        } else {
                            this.$refs.limit.value = resData.limits;
                        }
                        let vvariable = resData.variables;
                        if (resData.use_yn === 'Y') {
                            this.use_selected = 'Yes';
                        } else {
                            this.use_selected = 'No';
                        }
                        this.$refs.variables.value = vvariable.replace(/\\n/g, '\r\n');
                    } else if (res.data.code === '820') {
                        alert('There is no Inventory ID');
                    } else {
                        alert('Random Error Occur!')
                    }
                })
                .catch(err => console.log(err))
        },
        methods: {
            backListBtnOnClick: function () {
                this.$router.push({
                    name: 'Template'
                })
            },
            saveBtnOnClick: function (e) {
                let vuse_yn = '';
                // console.log(this.use_selected);
                if (this.use_selected === 'Yes') {
                    vuse_yn = 'Y';
                } else {
                    vuse_yn = 'N'
                }
                const param = '?seq=' + this.$route.params.id
                axios.put(vurl + '/jobtemp' + param, {
                        name: this.$refs.name.value,
                        content: this.$refs.description.value,
                        iid: this.$refs.iid.value,
                        iname: this.$refs.inventory.value,
                        cname: this.$refs.credential.value,
                        playbook: this.playbookSelected,
                        forks: this.$refs.forks.value,
                        limits: this.$refs.limit.value,
                        verb: this.verbSelected,
                        variables: this.variables,
                        use_yn: vuse_yn
                    })
                    .then(res => {
                        // console.log(res);
                        const resData = res.data.data;
                        if (res.data.code === '200') {
                            this.$router.push({
                                name: 'Template'
                            })
                        } else if (res.data.code === '820') {
                            alert('There is no Inventory ID');
                        } else {
                            alert('Random Error Occur!')
                        }
                    })
                    .catch(err => console.log(err))
            },
            inventoryShowModal() {
                this.$refs['inventoryModal'].show()
            },
            inventoryHideModal() {
                this.$refs['inventoryModal'].hide()
            },
            credentialShowModal() {
                this.$refs['credentialModal'].show()
            },
            credentialHideModal() {
                this.$refs['credentialModal'].hide()
            },
            selectInventory() {
                let invInfo = this.selectedInventoryRow.split(',')
                this.$refs.iid.value = invInfo[0]
                this.$refs.inventory.value = invInfo[1]
                this.inventoryHideModal()
            },
            selectCredential() {
                this.$refs.credential.value = this.selectedCredentialRow
                this.credentialHideModal()
            },
            executeTemplate() {
                if (confirm("Are you sure you want to execute this Adhoc Template?")) {
                    let vuse_yn = '';
                    // console.log(this.use_selected);
                    if (this.use_selected === 'Yes') {
                        vuse_yn = 'Y';
                    } else {
                        vuse_yn = 'N'
                    }
                    const params = '?seq=' + this.$route.params.id
                    axios.put(vurl + '/jobtemp' + params, {
                            name: this.$refs.name.value,
                            content: this.$refs.description.value,
                            iid: this.$refs.iid.value,
                            iname: this.$refs.inventory.value,
                            cname: this.$refs.credential.value,
                            playbook: this.playbookSelected,
                            forks: this.$refs.forks.value,
                            limits: this.$refs.limit.value,
                            verb: this.verbSelected,
                            variables: this.variables,
                            use_yn: vuse_yn
                        })
                        .then(res => {
                            // console.log(res);
                            const resData = res.data.data;
                            if (res.data.code === '200') {
                                axios.post(vurl + '/jobevent', {
                                        tid: this.$route.params.id,
                                        chk_temp: 'AP'
                                    })
                                    .then(res => {
                                        // console.log(res);
                                        const resData = res.data.data;
                                        if (res.data.code === '200') {
                                            this.$router.push({
                                                name: 'Job'
                                            })
                                        } else if (res.data.code === '820') {
                                            alert('There is no Template ID');
                                        } else {
                                            alert('Random Error Occur!')
                                        }
                                    })
                                    .catch(err => console.log(err))
                            } else if (res.data.code === '820') {
                                alert('There is no Template ID');
                            } else {
                                alert('Random Error Occur!')
                            }
                        })
                        .catch(err => console.log(err))
                } else {
                    return false;
                }
            }
        }
    }
</script>
<style>
</style>