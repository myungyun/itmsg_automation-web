<template>
    <div>
        <h3>Inventory Add Page</h3>
        <JqxButton @click="backListBtnOnClick($event)" style="margin-left: 5px; float: right" ref="button" :width="120" :height="40" :textPosition="'center'">
        list
        </JqxButton>
        <JqxForm ref="myForm"
            style="width: 400px; height: auto;"  
            :template="template" :value="value">
        </JqxForm>
    </div>
</template>
<script>
    import JqxForm from "jqwidgets-scripts/jqwidgets-vue/vue_jqxform.vue";
    import JqxButton from "jqwidgets-scripts/jqwidgets-vue/vue_jqxbuttons.vue";
    export default {
        name:"addInventory",
        components: {
            JqxForm,
            JqxButton
        },
        data: function () {
            return {
                template: [
                    {
                        bind: 'name',
                        type: 'text',
                        label: 'Name',
                        required: true,
                        labelWidth: '85px',
                        width: '250px',
                        info: 'Enter Inventory Name',
                        infoPosition: 'right'
                    },
                    {
                        bind: 'description',
                        type: 'text',
                        label: 'Description',
                        required: true,
                        labelWidth: '85px',
                        width: '250px',
                        info: 'Enter Description',
                        infoPosition: 'right'
                    },
                    {
                        bind: 'company',
                        type: 'text',
                        label: 'Company',
                        required: false,
                        labelWidth: '85px',
                        width: '250px'
                    },
                    {
                        bind: 'address',
                        type: 'text',
                        label: 'Address',
                        required: true,
                        labelWidth: '85px',
                        width: '250px'
                    },
                    {
                        bind: 'city',
                        type: 'text',
                        label: 'City',
                        required: true,
                        labelWidth: '85px',
                        width: '250px'
                    },
                    {
                        bind: 'state',
                        type: 'option',
                        label: 'State',
                        required: true,
                        labelWidth: '85px',
                        width: '250px',
                        component: 'jqxDropDownList',
                        options: [
                            { value: 'California' },
                            { value: 'New York' },
                            { value: 'Oregon' },
                            { value: 'Illinois' },
                            { value: 'Texas' }
                        ]
                    },
                    {
                        bind: 'zip',
                        type: 'text',
                        label: 'Zip code',
                        required: true,
                        labelWidth: '85px',
                        width: '250px'
                    },
                    {
                        type: 'blank',
                        rowHeight: '10px'
                    },
                    {
                        columns: [
                            {
                                type: 'button',
                                text: 'Sign up',
                                width: '90px',
                                columnWidth: '50%',
                                align: 'right'
                            },
                            {
                                type: 'button',
                                text: 'Cancel',
                                width: '90px',
                                columnWidth: '50%'
                            }
                        ]
                    }
                ],
                value: {
                    firstName: 'John',
                    lastName: 'Scott',
                    address: '1st Ave SW',
                    city: 'San Antonio',
                    state: 'Texas',
                    zip: '78209'
                }
            }
        },
        methods: {
            backListBtnOnClick: function(event) {
                this.$router.push({name: 'Inventory'})
            }
        }
    }
</script>